import { NextFunction, Request, Response } from 'express'
import { User } from '@supabase/supabase-js'
import { supabase } from '../config/supabase'

type AuthenticatedUser = User & {
  role?: string;
}

type AuthRequest = Request & {
  user?: AuthenticatedUser;
};

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'No bearer token provided'
        }
      })
    }

    const [scheme, token] = authHeader.split(' ')

    if (scheme !== 'Bearer') {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid authorization scheme. Expected "Bearer"'
        }
      })
    }

    if (!token || token.trim() === '') {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Token is missing'
        }
      })
    }

    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid or expired token'
        }
      })
    }

    req.user = user as AuthenticatedUser
    return next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication failed'
      }
    })
  }
}

// Global type declarations
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
