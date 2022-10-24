import * as Joi from 'joi';

export default Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
});
