import { sign, Secret, verify, JwtPayload } from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import 'dotenv/config';
import HttpError from './HttpError';

const secret: Secret = process.env.JWT_SECRET || 'secret';
// type TErrorToken = {
//   error: 'token expired or invalid'
// };

export interface IPayload extends IUser, JwtPayload {}

export default class JWT {
  static tokenGenerator(payload: IUser): Secret {
    return sign(payload, secret);
  }

  static tokenValidation(token: string): IPayload {
    try {
      const payload = verify(token, secret) as IPayload;
      return payload;
    } catch (e) {
      throw new HttpError('Token must be a valid token', 401);
    }
  }
}
