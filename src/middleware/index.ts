import { Request, Response, NextFunction } from 'express';

export const checkAccessToken = (req: Request, res: Response) => {
    const accessToken = req.query.accessToken;

    if (accessToken) {
        return res.json(true);
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};