import IMatch, { IMatchCreate } from '../interfaces/IMatch';
import TeamModel from '../database/models/Team';
import MatchModel from '../database/models/Match';
import HttpError from '../utils/HttpError';

export default class MatchService {
  private model = MatchModel;

  static async teamValidation(id: number): Promise<boolean | void> {
    const hasTeam = await TeamModel.findOne({
      where: { id },
    });

    if (!hasTeam) throw new HttpError('Team not found', 404);

    return true;
  }

  async findAll(inProgress: boolean | undefined): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: {
        ...(typeof inProgress === 'boolean' ? { inProgress } : undefined),
      },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async create(match: IMatchCreate): Promise<IMatch | null> {
    await MatchService.teamValidation(match.homeTeam);
    await MatchService.teamValidation(match.awayTeam);

    const Match = await this.model.create({ ...match, inProgress: true });

    return Match;
  }

  async finishMacth(id: number): Promise<void> {
    const hasMatch = await this.model.findOne({ where: { id } });
    if (!hasMatch) throw new HttpError('Macth not found', 404);
    if (!hasMatch.inProgress) throw new HttpError('Match already over', 409);

    await this.model.update({
      inProgress: false,
    }, {
      where: { id },
    });
  }
}
