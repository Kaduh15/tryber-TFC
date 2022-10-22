import { Request, Response } from 'express';
import LoginService from '../services/LoginServices';

import 'express-async-errors';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  async login(req: Request, res: Response): Promise<void> {
    const token = await this.service.login(req.body);

    res.status(200).json({ token });
  }
}
