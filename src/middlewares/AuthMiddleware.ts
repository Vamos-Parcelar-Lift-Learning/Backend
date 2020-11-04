import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const secret = process.env.SECRET;
  const token = req.headers.authorization;

  if (token && secret) {
    try {
      const decoded = verify(token, secret);
      console.log(decoded);
      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token inválido!' });
    }
  } else if (!secret) {
    res.status(500).json({ msg: 'Internal server error' });
  } else {
    res.status(401).json({ msg: 'Token inválido!' });
  }
}

export default authMiddleware;
