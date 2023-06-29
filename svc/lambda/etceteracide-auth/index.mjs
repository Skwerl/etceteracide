import crypto from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const { DYNAMODB_ENDPOINT, TABLE_SESSIONS, CRYPTO_KEY_HEX } = process.env;
const CRYPTO_KEY = Buffer.from(CRYPTO_KEY_HEX, "hex");

export const handler = async (event) => {

    const client = new DynamoDBClient({ endpoint: DYNAMODB_ENDPOINT });
    const dynamo = DynamoDBDocumentClient.from(client);
    let { headers: { authorization, sessionid } } = event;

    let authed = false;
    try {
        const decipher = crypto.createDecipheriv("aes-256-cbc", CRYPTO_KEY, Buffer.from(sessionid, "hex"));
        let decrypted = decipher.update(authorization, "hex", "utf-8");
        decrypted += decipher.final("utf8");
        const sessionObject = JSON.parse(decrypted);
        query = await dynamo.send(new GetCommand({
            TableName: TABLE_SESSIONS,
            Key: { id: sessionObject.id }
        }));
        if (query.Item && (query.Item.user_id === sessionObject.user_id)) authed = true;
    } catch (error) {
        console.error(error);
        authed = false;
    }

    const response = { "isAuthorized": authed };
    return response;

};