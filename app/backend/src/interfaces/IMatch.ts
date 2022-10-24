import ITeam from './ITeam';

export interface IMatchCreate {
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number
  awayTeamGoals: number
}

export default interface IMatch extends IMatchCreate {
  id?: number
  inProgress: boolean | number
  teamHome?: ITeam | number
  teamAway?: ITeam | number
}
