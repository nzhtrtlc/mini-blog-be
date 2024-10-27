// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

class AuthController {
  signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const data = await authService.signUp(email, password);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

  signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const data = await authService.signIn(email, password);
      res.json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

  signOut = async (req: Request, res: Response): Promise<void> => {
    try {
      await authService.signOut();
      res.status(200).json({ message: 'Successfully signed out' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

  getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await authService.getCurrentUser();
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };
}

export const authController = new AuthController();
