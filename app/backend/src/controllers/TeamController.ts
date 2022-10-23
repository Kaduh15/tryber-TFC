import { Request, Response } from 'express';
import TeamService from '../services/TeamServices';

import 'express-async-errors';

export default class teamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const teams = await this.service.findAll();

    res.status(200).json(teams);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const teams = await this.service.findById(Number(id));

    res.status(200).json(teams);
  }
}
