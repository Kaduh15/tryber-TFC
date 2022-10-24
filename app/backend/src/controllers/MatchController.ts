import { Request, Response } from 'express';
import MactherService from '../services/MatchServices';

import 'express-async-errors';
import stringToBoolean from '../utils/boolean';

export default class MacthController {
  private service: MactherService;

  constructor() {
    this.service = new MactherService();
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const { inProgress = '' } = req.query;

    const Macthes = await this.service.findAll(stringToBoolean(inProgress));

    res.status(200).json(Macthes);
  }

  async create(req: Request, res: Response): Promise<void> {
    const Macthers = await this.service.create(req.body);

    res.status(201).json(Macthers);
  }
}
