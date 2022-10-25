/* eslint-disable max-lines-per-function */
import ITeam from '../interfaces/ITeam';
import { IEstatisticas } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

const modelAcc = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

const funcReduce = (teams: ITeam[]) => (acc: IEstatisticas, curr: MatchModel) => {
  acc.name = teams.find((team) => team.id === curr.homeTeam)?.teamName as string;
  acc.goalsFavor += curr.homeTeamGoals;
  acc.goalsOwn += curr.awayTeamGoals;
  acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
  acc.totalGames += 1;
  acc.totalPoints = (acc.totalVictories * 3) + acc.totalDraws;
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    acc.totalVictories += 1;
  } else if (curr.homeTeamGoals === curr.awayTeamGoals) {
    acc.totalDraws += 1;
  } else {
    acc.totalLosses += 1;
  }
  acc.efficiency = ((acc.totalVictories === 0
    ? 0 : acc.totalVictories / acc.totalGames) * 100).toFixed(2).toString();
  return { ...acc };
};

export default class LeaderboardService {
  private macthModel = MatchModel;
  private teamModel = TeamModel;

  async home(): Promise<IEstatisticas[]> {
    const teams = await this.teamModel.findAll({ raw: true });
    const macthHome = await Promise.all(teams.map((team) => this.macthModel.findAll({
      where: { homeTeam: team.id, inProgress: false },
      raw: true,
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    })));

    const result = macthHome.map((teamHomeMacth) => teamHomeMacth
      .reduce(funcReduce(teams), { ...modelAcc }));

    return result;
  }
}
