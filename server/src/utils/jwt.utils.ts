import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
