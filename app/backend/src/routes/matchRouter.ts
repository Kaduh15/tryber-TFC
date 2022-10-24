import { Router } from 'express';

import 'express-async-errors';
import bodyMiddleware from '../middlewares/bodyMiddleware';
import MatchController from '../controllers/MatchController';
import bodyMetch from '../schemas/bodyMetch';

const matchController = new MatchController();

const router = Router();

router
  .get('/', (req, res) => matchController.findAll(req, res));

router
  .post(
    '/',
    bodyMiddleware(bodyMetch),
    (req, res) => matchController.create(req, res),
  );

export default router;
