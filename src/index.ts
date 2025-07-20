import ServerlessHttp from "serverless-http";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { app } from "./app";

const handlerFunc = ServerlessHttp(app);

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<any> => {
  const result = await handlerFunc(event, context) as APIGatewayProxyResult;
  if (result && result.body) {
    return result.body;
  }
  return result;
};
