import { Request, Response } from "express";

export const authHandler = (req: Request, res: Response) => {
  const { method, url, baseUrl, path, headers, query, body } = req;
  console.log("Auth handler called", {
    method,
    url,
    baseUrl,
    path,
    headers,
    query,
    body,
  });

  const accessToken = req.query?.accessToken || req.headers?.authorization;
  let auth = "Deny"; // Default to Deny
  if (accessToken === "valid-token") {
    auth = "Allow";
  }
  const authResponse = {
    principalId: "abc123",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Resource: [
            "arn:aws:execute-api:ap-southeast-1:899098335740:t1q1jgp7fd/*/*",
          ],
          Effect: auth,
        },
      ],
    },
  };

  return res.json(authResponse);
};
