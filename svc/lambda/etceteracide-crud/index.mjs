import crypto from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ScanCommand, BatchGetCommand, GetCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { authenticator } from "otplib";

const { DYNAMODB_ENDPOINT, TABLE_CONTENT, TABLE_PAGES, TABLE_USERS, TABLE_SESSIONS, TABLE_AQ_ATTACHMENTS, CRYPTO_KEY_HEX } = process.env;
const CRYPTO_KEY = Buffer.from(CRYPTO_KEY_HEX, "hex");

// Used for Document Indexing
const pageSize = 50;
const splitFunction = (n, xs, y = []) => xs.length === 0 ? y : splitFunction(n, xs.slice(n), y.concat([xs.slice(0, n)]));

export const handler = async (event, context) => {

    const client = new DynamoDBClient({ endpoint: DYNAMODB_ENDPOINT });
    const dynamo = DynamoDBDocumentClient.from(client);

    let req;
    let query;
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case "POST /auth":
                req = JSON.parse(event.body);
                let { email, code } = req;
                let token = "";
                let sessionId = "";
                let authorized = false;
                query = await dynamo.send(new ScanCommand({
                    TableName: TABLE_USERS
                }));
                let found = query.Items.find(Item => Item.email === email);
                if (found && authenticator.check(code, found.secret)) {
                    let suid = crypto.randomBytes(16);
                    sessionId = suid.toString("hex");
                    const sessionObject = {
                        id: sessionId,
                        user_id: found.id,
                        exp: ""
                    }
                    await dynamo.send(new PutCommand({
                        TableName: TABLE_SESSIONS,
                        Item: sessionObject
                    }));
                    const cipher = crypto.createCipheriv("aes-256-cbc", CRYPTO_KEY, suid);
                    token = cipher.update(JSON.stringify(sessionObject), "utf-8", "hex");
                    token += cipher.final("hex");
                    authorized = true;
                }
                const user = {
                    id: found.id,
                    name: found.name,
                    email: found.email
                };
                body = { authorized, token, sessionId, user };
                break;
            case "PUT /items":
                req = JSON.parse(event.body);
                await dynamo.send(new PutCommand({
                    TableName: TABLE_CONTENT,
                    Item: {
                        ...req
                    }
                }));
                body = `Put item ${req.id}.`;
                break;
            case "GET /items":
                query = await dynamo.send(new ScanCommand({
                    TableName: TABLE_CONTENT
                }));
                body = query.Items;
                break;
            case "GET /items/page/{id}":
                query = await dynamo.send(new GetCommand({
                    TableName: TABLE_PAGES,
                    Key: { id: event.pathParameters.id }
                }));
                const pageDocs = query.Item['documents'];
                const itemRequest = {};
                itemRequest[TABLE_CONTENT] = {
                    Keys: pageDocs.map(doc => { return { id: doc } })
                };
                query = await dynamo.send(new BatchGetCommand({
                    RequestItems: { ...itemRequest }
                }));
                body = query['Responses'][TABLE_CONTENT];
                break;
            case "GET /items/{id}":
                query = await dynamo.send(new GetCommand({
                    TableName: TABLE_CONTENT,
                    Key: { id: event.pathParameters.id }
                }));
                body = query.Item;
                break;
            case "GET /items/index":
                query = await dynamo.send(new ScanCommand({
                    TableName: TABLE_CONTENT,
                    AttributesToGet: ['id', 'date']
                }));
                const sortedItems = query.Items.sort(function(a, b) {
                    return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
                }).reverse();
                const splitItems = splitFunction(pageSize, sortedItems);
                for (let i = 0; i < splitItems.length; i++) {
                    await dynamo.send(new PutCommand({
                        TableName: TABLE_PAGES,
                        Item: {
                            id: (i+1).toString(),
                            documents: splitItems[i].map(d => d.id)
                        }
                    }));
                }
                body = `Indexed ${splitItems.length} pages.`;
                break;
            case "DELETE /items/{id}":
                await dynamo.send(new DeleteCommand({
                    TableName: TABLE_CONTENT,
                    Key: { id: event.pathParameters.id }
                }));
                body = `Deleted item ${event.pathParameters.id}`;
                break;
            case "GET /images/{id}":
                query = await dynamo.send(new GetCommand({
                    TableName: TABLE_AQ_ATTACHMENTS,
                    Key: { id: event.pathParameters.id }
                }));
                body = query.Item;
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}".`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };

};