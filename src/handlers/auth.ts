import { Request, Response } from "express";

export const authHandler = (req: Request, res: Response) => {
  const accessToken = req.query.accessToken;

  if (accessToken) {
    return res.status(200).json(true);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
