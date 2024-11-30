import type { Request } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = ({req}: {req: Request}) => {
  const authHeader = req.headers.authorization;
  console.log("Incoming Auth Header: ", authHeader)

  if (authHeader) {
    const token = authHeader.split(' ')[1].trim();
    console.log("Incoming Token: ", token)
    const secretKey = process.env.JWT_SECRET_KEY || '';
    console.log("Key: ", secretKey)

    jwt.verify(token, secretKey, { maxAge: '1hr' }, (err, user) => {
      if (err) {
        console.log("Verify Error: ", err);
        return req;
      }
      console.log("User Obj: ", user);
      return req.user = user as JwtPayload;
  
    });
  } else {
    return req;
  }
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
