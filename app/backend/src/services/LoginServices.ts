import * as crypto from 'bcryptjs';
import { Secret } from 'jsonwebtoken';
import HttpError from '../utils/HttpError';
import UserModel from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import JWT from '../utils/JWT';

export default class LoginService {
  private model = UserModel;

  async login({ email, password }: ILogin): Promise<Secret> {
    const user = await this.model.findOne({ where: { email } });
    if (!user || !(await crypto.compare(password as string, user?.password))) {
      throw new HttpError('Incorrect email or password', 401);
    }

    const token = JWT.tokenGenerator({
      id: user.id,
      userName: user.username,
      email: user.email,
      role: user.role,
    });

    return token;
  }
}
