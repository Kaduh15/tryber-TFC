import { Router } from 'express';
import JWT from '../utils/JWT';
import bodyLogin from '../schemas/bodyLogin';
import bodyMiddleware from '../middlewares/bodyMiddleware';
import LoginController from '../controllers/LoginController';

import 'express-async-errors';

const loginController = new LoginController();

const router = Router();

router
  .post('/', bodyMiddleware(bodyLogin), (req, res) => loginController.login(req, res));

router
  .get('/validate', (req, res) => {
    const token = req.headers.authorization || '';
    const payload = JWT.tokenValidation(token);

    res.status(200).json({ role: payload.role });
  });

export default router;
