import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.utils';
import prisma from '../models/prismaClient';

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    return res.status(201).json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).json({ message: 'Email and Password are required.' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user.id);

    return res.status(200).json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response): Response => {
  localStorage.removeItem("token");
  return res.status(200).json({ message: 'User logged out successfully' });
};
