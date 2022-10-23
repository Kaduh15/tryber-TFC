import ITeam from './ITeam';

export default interface IMatch {
  id?: number
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number
  awayTeamGoals: number
  inProgress: boolean | number
  teamHome?: ITeam | number
  teamAway?: ITeam | number
}
