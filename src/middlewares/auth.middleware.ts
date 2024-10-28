import { NextFunction, Request, Response } from "express";
import { User } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";

type AuthenticatedUser = User & {
  role?: string;
};

export const requireAuth = async (
  req: Request,
  res: any, //TODO: Response causing type error. couldnt figured it out
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"] as string | undefined;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "No authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Invalid authorization format",
      });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

// Global type declarations
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
