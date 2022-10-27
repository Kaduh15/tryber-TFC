/* eslint-disable max-lines-per-function */
import HttpError from '../utils/HttpError';
import sequelize from '../database/models';
import { IEstatisticas } from '../interfaces/IMatch';
import { awayLeaderboard, homeLeaderboard } from '../utils/sequelizeQuery';

export default class LeaderboardService {
  private sequelize = sequelize;

  async home(): Promise<IEstatisticas[]> {
    const [result] = await this.sequelize.query(homeLeaderboard);
    if (!result) throw new HttpError('error', 404);

    return result as IEstatisticas[];
  }

  async away(): Promise<IEstatisticas[]> {
    const [result] = await this.sequelize.query(awayLeaderboard);
    if (!result) throw new HttpError('error', 404);

    return result as IEstatisticas[];
  }
}
