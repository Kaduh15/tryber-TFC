import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import TeamModel from '../database/models/Team';

const { expect } = chai;

chai.use(chaiHttp);

const mockTeams = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
]

describe('---------------------- Rota Teams ----------------------', () => {

  
  describe('GET /Teams', () => {
    // describe('Casos de erros', () => {
    //   it('Busca apenas um time pelo o id!', async () => {
      
    //     const idIncorrect = 998
        
    //     sinon
    //     .stub(TeamModel, 'findOne')
    //     .resolves(null)
          
    //       const httpResponse = await chai.request(app)
    //       .get(`/teams/${idIncorrect + 1}`)
          
    //       expect(httpResponse.status).to.equal(200);
    //       expect(httpResponse.body).to.deep.equal(mockTeams[idIncorrect]);
          
    //       (TeamModel.findOne as sinon.SinonStub).restore()
    //   })
    // })
      
    describe('Casos de sucessos', () => {
      
      it('Busca todos os times!', async () => {
        
        sinon
        .stub(TeamModel, 'findAll')
        .resolves(
          mockTeams as TeamModel[]
          )
          
          const httpResponse = await chai.request(app)
          .get('/teams')
          
          expect(httpResponse.status).to.equal(200);
          expect(httpResponse.body).to.deep.equal(mockTeams);
        } )
        
      it('Busca apenas um time pelo o id!', async () => {
        
        const idCorrect = 1
        
        sinon
        .stub(TeamModel, 'findOne')
        .resolves(
          mockTeams[idCorrect] as TeamModel
          )
          
          const httpResponse = await chai.request(app)
          .get(`/teams/${idCorrect + 1}`)
          
          expect(httpResponse.status).to.equal(200);
          expect(httpResponse.body).to.deep.equal(mockTeams[idCorrect]);
      })
    })
  })
})