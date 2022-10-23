import { Router } from 'express';

import 'express-async-errors';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router
  .get('/', (req, res) => matchController.findAll(req, res));

export default router;
