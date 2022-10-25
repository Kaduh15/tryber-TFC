import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import TeamModel from '../database/models/Team';
import { Model } from 'sequelize';

import { app } from '../app'


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

  describe('1 - GET /Teams', () => {

    describe('Casos de erros', () => {

      it('Busca apenas um time pelo o id!', async () => {
      
        const idIncorrect = 998
        
        sinon.restore()

        sinon
          .stub(Model, 'findOne')
          .resolves(null)
          
        const httpResponse = await chai.request(app)
        .get(`/teams/${idIncorrect + 1}`)
          
        expect(httpResponse.status).to.equal(404);
        expect(httpResponse.body).to.deep.equal({message: 'Team not found'});
      })
    })
      
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
        
        sinon.restore()

        sinon
        .stub(Model, 'findOne')
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