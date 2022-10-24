import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import HttpError from '../utils/HttpError';

export default function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) throw new HttpError('token not found', 404);

  JWT.tokenValidation(token);

  return next();
}
