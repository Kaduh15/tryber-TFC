import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export default (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
};
