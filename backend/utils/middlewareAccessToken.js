import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN;


export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({ message: 'Access token not provided.' });
    }

    const token = authHeader.split(' ')[1]; 
    console.log('enetred acess token verification middleware');

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(401).json({ message: 'Access token expired or invalid.' });
        }

        req.user = user; 
        next(); 
    });
};
