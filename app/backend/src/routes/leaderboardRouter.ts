import { Router } from 'express';

import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router
  .get('/', (req, res) => leaderboardController.homeAway(req, res));

router
  .get('/home', (req, res) => leaderboardController.home(req, res));

router
  .get('/away', (req, res) => leaderboardController.away(req, res));

export default router;
