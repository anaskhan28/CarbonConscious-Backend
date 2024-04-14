import {Request, Response, NextFunction} from 'express'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.redirect("/auth/google");
    } else {
      next();
    }
  };