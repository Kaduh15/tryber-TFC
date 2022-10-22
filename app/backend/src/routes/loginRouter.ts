import { Router } from 'express';
import bodyLogin from '../schemas/bodyLogin';
import bodyMiddleware from '../middlewares/bodyMiddleware';
import LoginController from '../controllers/LoginController';

import 'express-async-errors';

const loginController = new LoginController();

const router = Router();

router.use(bodyMiddleware(bodyLogin));

router
  .post('/', (req, res) => loginController.login(req, res));

export default router;
