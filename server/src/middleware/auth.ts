import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id: string;
}

console.log("process.env.JWT_SECRET: " + process.env.JWT_SECRET);

const secret = process.env.JWT_SECRET || 'yourSecretKey';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }
//asdfasdf
  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token not provided' });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;

    (req as any).user = {
      id: payload.id,
      username: payload.username,
    };

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};