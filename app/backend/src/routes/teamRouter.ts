import { Router } from 'express';

import 'express-async-errors';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router
  .get('/', (req, res) => teamController.findAll(req, res));

router
  .get('/:id', (req, res) => teamController.findById(req, res));

export default router;
