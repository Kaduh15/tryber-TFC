// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app'
// import MatcheModel from '../database/models/Matche';

// const { expect } = chai;

// chai.use(chaiHttp);

// const mockMetches = [
//   {
//     "id": 1,
//     "homeTeam": 16,
//     "homeTeamGoals": 1,
//     "awayTeam": 8,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Grêmio"
//     }
//   },
//   {
//     "id": 41,
//     "homeTeam": 16,
//     "homeTeamGoals": 2,
//     "awayTeam": 9,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Internacional"
//     }
//   }
// ]

// describe('GET /Teams', () => {
//   // describe('Casos de erros', () => {
//   // })

//   describe('Casos de sucessos', () => {
    
//     it('Busca todas as matches!', async () => {

//       sinon
//         .stub(MatcheModel, 'findAll')
//         .resolves(
//           mockMetches as MatcheModel[]
//         )

//       const httpResponse = await chai.request(app)
//         .get('/teams')
      
//       expect(httpResponse.status).to.equal(200);
//       expect(httpResponse.body).to.deep.equal(mockTeams);
//     } )

//     it('Busca apenas um time pelo o id!', async () => {

//       const idCorrect = 1

//       sinon
//         .stub(TeamModel, 'findOne')
//         .resolves(
//           mockTeams[idCorrect] as TeamModel
//       )

//       const httpResponse = await chai.request(app)
//         .get(`/teams/${idCorrect + 1}`)
      
//       expect(httpResponse.status).to.equal(200);
//       expect(httpResponse.body).to.deep.equal(mockTeams[idCorrect]);
//     } )

//   })
// })