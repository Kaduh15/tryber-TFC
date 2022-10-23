import IMatch from '../interfaces/IMatch';
import TeamModel from '../database/models/Team';
import MatchModel from '../database/models/Match';
// import IMatch from '../interfaces/IMatch';

export default class MatchService {
  private model = MatchModel;

  async findAll(inProgress: boolean | undefined): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: {
        ...(typeof inProgress === 'boolean' ? { inProgress } : undefined),
      },
      include: [
        { model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  // async findById(id: number): Promise<IMatch | null> {
  //   const Match = await this.model.findOne({ where: { id } });

  //   return Match;
  // }
}
