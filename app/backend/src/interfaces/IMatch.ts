import ITeam from './ITeam';

export interface IScore {
  awayTeam: number
  awayTeamGoals: number
}

export interface IMatchCreate extends IScore {
  homeTeam: number
  homeTeamGoals: number
}

export default interface IMatch extends IMatchCreate {
  id?: number
  inProgress: boolean | number
  teamHome?: ITeam | number
  teamAway?: ITeam | number
}
