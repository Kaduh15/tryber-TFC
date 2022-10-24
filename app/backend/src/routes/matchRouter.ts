import { Router } from 'express';

import 'express-async-errors';
import tokenMiddleware from '../middlewares/tokenMiddleware';
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
    tokenMiddleware,
    bodyMiddleware(bodyMetch),
    (req, res) => matchController.create(req, res),
  );

router
  .patch(
    '/:id',
    (req, res) => matchController.updateMatchScore(req, res),
  );

router
  .patch(
    '/:id/finish',
    (req, res) => matchController.finishMacth(req, res),
  );

export default router;
