import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import authConfig from '../config/authConfig';

interface ITokenPayload {
  id: ObjectID;
  code: string;
  iat: number;
  exp: number;
}

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { secret } = authConfig.jwt;
  const token = req.headers.authorization;

  if (token && secret) {
    try {
      const decoded = verify(token, secret);
      const { code } = decoded as ITokenPayload;
      req.user = {
        code,
      };
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
