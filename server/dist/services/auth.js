import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = ({ req }) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1].trim();
        const secretKey = process.env.JWT_SECRET_KEY || '';
        jwt.verify(token, secretKey, { maxAge: '1hr' }, (err, user) => {
            if (err) {
                console.error("Verify Error: ", err);
                return req;
            }
            return req.user = user;
        });
    }
    else {
        return req;
    }
    return req;
};
export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY || '';
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
