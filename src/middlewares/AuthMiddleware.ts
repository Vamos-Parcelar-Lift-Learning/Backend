import { Request, Response, NextFunction } from 'express';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(`Nova requisição recebida: ${req.method}`);
  const token = process.env.TOKEN;
  if (token && req.headers.authorization === token) {
    next();
  } else {
    res.json({ erro: 'Token não encontrado!' });
  }
};

export default authMiddleware;
