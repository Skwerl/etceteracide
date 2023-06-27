import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand, ScanCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const DYNAMODB_ENDPOINT = "https://dynamodb.us-west-1.amazonaws.com";
const DYNAMODB_TABLE = "etceteracide-content";

export const handler = async (event, context) => {

    const client = new DynamoDBClient({ endpoint: DYNAMODB_ENDPOINT });
    const dynamo = DynamoDBDocumentClient.from(client);

    let query;
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case "PUT /items":
                let requestJSON = JSON.parse(event.body);
                await dynamo.send(new PutCommand({
                    TableName: DYNAMODB_TABLE,
                    Item: {
                        ...requestJSON
                    }
                }));
                body = `Put item ${requestJSON.id}`;
                break;
            case "GET /items":
                query = await dynamo.send(new ScanCommand({
                    TableName: DYNAMODB_TABLE
                }));
                body = query.Items;
                break;
            case "GET /items/{id}":
                query = await dynamo.send(new GetCommand({
                    TableName: DYNAMODB_TABLE,
                    Key: { id: event.pathParameters.id }
                }));
                body = query.Item;
                break;
            case "DELETE /items/{id}":
                await dynamo.send(new DeleteCommand({
                    TableName: DYNAMODB_TABLE,
                    Key: { id: event.pathParameters.id }
                }));
                body = `Deleted item ${event.pathParameters.id}`;
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
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