import HttpError from '../utils/HttpError';
import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

export default class TeamService {
  private model = TeamModel;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    if (!team) throw new HttpError('Team not found', 404);

    return team;
  }
}
