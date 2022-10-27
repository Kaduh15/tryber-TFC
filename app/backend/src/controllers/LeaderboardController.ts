import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

import 'express-async-errors';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  async homeAway(req: Request, res: Response): Promise<void> {
    const result = await this.service.homeAway();

    res.status(200).json(result);
  }

  async home(req: Request, res: Response): Promise<void> {
    const result = await this.service.home();

    res.status(200).json(result);
  }

  async away(req: Request, res: Response): Promise<void> {
    const result = await this.service.away();

    res.status(200).json(result);
  }
}
