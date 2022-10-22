import { sign, Secret } from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import 'dotenv/config';

const secret: Secret = process.env.JWT_SECRET || 'secret ';

export default class JWT {
  static tokenGenerator(payload: IUser): Secret {
    return sign(payload, secret);
  }
}
