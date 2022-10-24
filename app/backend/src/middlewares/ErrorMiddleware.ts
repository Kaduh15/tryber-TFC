import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/HttpError';

function errorMiddleware(
  error: HttpError,
  request: Request,
  response: Response,
  _next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  response
    .status(status)
    .send({
      message,
    });
}

export default errorMiddleware;
