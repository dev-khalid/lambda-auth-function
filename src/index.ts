import ServerlessHttp from "serverless-http";
import { app } from "./app";

const handlerFunc = ServerlessHttp(app);
const handler = async (event: any, context: any): Promise<any> => {
  const result = await handlerFunc(event, context);
  return result;
};

export default handler;
