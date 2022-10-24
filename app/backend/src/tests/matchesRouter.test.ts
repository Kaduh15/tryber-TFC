import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import IMatche from '../interfaces/IMatch'

import { app } from '../app'
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Match';
import MatchService from '../services/MatchServices';
import Team from '../database/models/Team';

const { expect } = chai;

chai.use(chaiHttp);

const mockListMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'São Paulo' },
    teamAway: { teamName: 'Grêmio' }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Internacional' },
    teamAway: { teamName: 'Santos' }
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'Corinthians' },
    teamAway: { teamName: 'Napoli-SC' }
  },
  {
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'Botafogo' },
    teamAway: { teamName: 'Bahia' }
  },
  {
    id: 5,
    homeTeam: 7,
    homeTeamGoals: 1,
    awayTeam: 10,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Flamengo' },
    teamAway: { teamName: 'Minas Brasília' }
  },
  {
    id: 6,
    homeTeam: 5,
    homeTeamGoals: 1,
    awayTeam: 13,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Cruzeiro' },
    teamAway: { teamName: 'Real Brasília' }
  },
  {
    id: 7,
    homeTeam: 12,
    homeTeamGoals: 2,
    awayTeam: 6,
    awayTeamGoals: 2,
    inProgress: 0,
    teamHome: { teamName: 'Palmeiras' },
    teamAway: { teamName: 'Ferroviária' }
  },
  {
    id: 8,
    homeTeam: 15,
    homeTeamGoals: 0,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'São José-SP' },
    teamAway: { teamName: 'Avaí/Kindermann' }
  },
  {
    id: 9,
    homeTeam: 1,
    homeTeamGoals: 0,
    awayTeam: 12,
    awayTeamGoals: 3,
    inProgress: 0,
    teamHome: { teamName: 'Avaí/Kindermann' },
    teamAway: { teamName: 'Palmeiras' }
  },
  {
    id: 10,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 9,
    awayTeamGoals: 2,
    inProgress: 0,
    teamHome: { teamName: 'Bahia' },
    teamAway: { teamName: 'Internacional' }
  },
  {
    id: 11,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'Real Brasília' },
    teamAway: { teamName: 'Botafogo' }
  },
  {
    id: 12,
    homeTeam: 6,
    homeTeamGoals: 0,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Ferroviária' },
    teamAway: { teamName: 'Corinthians' }
  },
  {
    id: 13,
    homeTeam: 8,
    homeTeamGoals: 2,
    awayTeam: 5,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Grêmio' },
    teamAway: { teamName: 'Cruzeiro' }
  },
  {
    id: 14,
    homeTeam: 14,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Santos' },
    teamAway: { teamName: 'São Paulo' }
  },
  {
    id: 15,
    homeTeam: 10,
    homeTeamGoals: 0,
    awayTeam: 15,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Minas Brasília' },
    teamAway: { teamName: 'São José-SP' }
  },
  {
    id: 16,
    homeTeam: 11,
    homeTeamGoals: 0,
    awayTeam: 7,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'Napoli-SC' },
    teamAway: { teamName: 'Flamengo' }
  },
  {
    id: 17,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 3,
    inProgress: 0,
    teamHome: { teamName: 'Avaí/Kindermann' },
    teamAway: { teamName: 'Grêmio' }
  },
  {
    id: 18,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 5,
    awayTeamGoals: 2,
    inProgress: 0,
    teamHome: { teamName: 'Palmeiras' },
    teamAway: { teamName: 'Cruzeiro' }
  },
  {
    id: 19,
    homeTeam: 11,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 2,
    inProgress: 0,
    teamHome: { teamName: 'Napoli-SC' },
    teamAway: { teamName: 'Bahia' }
  },
  {
    id: 20,
    homeTeam: 7,
    homeTeamGoals: 0,
    awayTeam: 9,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Flamengo' },
    teamAway: { teamName: 'Internacional' }
  },
  {
    id: 21,
    homeTeam: 6,
    homeTeamGoals: 3,
    awayTeam: 13,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Ferroviária' },
    teamAway: { teamName: 'Real Brasília' }
  },
  {
    id: 22,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Corinthians' },
    teamAway: { teamName: 'Botafogo' }
  },
  {
    id: 23,
    homeTeam: 15,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 3,
    inProgress: 0,
    teamHome: { teamName: 'São José-SP' },
    teamAway: { teamName: 'São Paulo' }
  },
  {
    id: 24,
    homeTeam: 10,
    homeTeamGoals: 2,
    awayTeam: 14,
    awayTeamGoals: 2,
    inProgress: 0,
    teamHome: { teamName: 'Minas Brasília' },
    teamAway: { teamName: 'Santos' }
  },
  {
    id: 25,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 6,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Bahia' },
    teamAway: { teamName: 'Ferroviária' }
  },
  {
    id: 26,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'Real Brasília' },
    teamAway: { teamName: 'Avaí/Kindermann' }
  },
  {
    id: 27,
    homeTeam: 5,
    homeTeamGoals: 1,
    awayTeam: 15,
    awayTeamGoals: 2,
    inProgress: 0,
    teamHome: { teamName: 'Cruzeiro' },
    teamAway: { teamName: 'São José-SP' }
  },
  {
    id: 28,
    homeTeam: 16,
    homeTeamGoals: 3,
    awayTeam: 7,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'São Paulo' },
    teamAway: { teamName: 'Flamengo' }
  },
  {
    id: 29,
    homeTeam: 9,
    homeTeamGoals: 0,
    awayTeam: 4,
    awayTeamGoals: 4,
    inProgress: 0,
    teamHome: { teamName: 'Internacional' },
    teamAway: { teamName: 'Corinthians' }
  },
  {
    id: 30,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 12,
    awayTeamGoals: 4,
    inProgress: 0,
    teamHome: { teamName: 'Botafogo' },
    teamAway: { teamName: 'Palmeiras' }
  },
  {
    id: 31,
    homeTeam: 8,
    homeTeamGoals: 2,
    awayTeam: 10,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'Grêmio' },
    teamAway: { teamName: 'Minas Brasília' }
  },
  {
    id: 32,
    homeTeam: 14,
    homeTeamGoals: 5,
    awayTeam: 11,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Santos' },
    teamAway: { teamName: 'Napoli-SC' }
  },
  {
    id: 33,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 16,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Avaí/Kindermann' },
    teamAway: { teamName: 'São Paulo' }
  },
  {
    id: 34,
    homeTeam: 9,
    homeTeamGoals: 3,
    awayTeam: 6,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Internacional' },
    teamAway: { teamName: 'Ferroviária' }
  },
  {
    id: 35,
    homeTeam: 10,
    homeTeamGoals: 1,
    awayTeam: 5,
    awayTeamGoals: 3,
    inProgress: 0,
    teamHome: { teamName: 'Minas Brasília' },
    teamAway: { teamName: 'Cruzeiro' }
  },
  {
    id: 36,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 7,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Bahia' },
    teamAway: { teamName: 'Flamengo' }
  },
  {
    id: 37,
    homeTeam: 15,
    homeTeamGoals: 0,
    awayTeam: 13,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'São José-SP' },
    teamAway: { teamName: 'Real Brasília' }
  },
  {
    id: 38,
    homeTeam: 14,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Santos' },
    teamAway: { teamName: 'Corinthians' }
  },
  {
    id: 39,
    homeTeam: 3,
    homeTeamGoals: 2,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: 0,
    teamHome: { teamName: 'Botafogo' },
    teamAway: { teamName: 'Napoli-SC' }
  },
  {
    id: 40,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: { teamName: 'Palmeiras' },
    teamAway: { teamName: 'Grêmio' }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: 1,
    teamHome: { teamName: 'São Paulo' },
    teamAway: { teamName: 'Internacional' }
  },
  {
    id: 42,
    homeTeam: 6,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: 1,
    teamHome: { teamName: 'Ferroviária' },
    teamAway: { teamName: 'Avaí/Kindermann' }
  },
  {
    id: 43,
    homeTeam: 11,
    homeTeamGoals: 0,
    awayTeam: 10,
    awayTeamGoals: 0,
    inProgress: 1,
    teamHome: { teamName: 'Napoli-SC' },
    teamAway: { teamName: 'Minas Brasília' }
  },
  {
    id: 44,
    homeTeam: 7,
    homeTeamGoals: 2,
    awayTeam: 15,
    awayTeamGoals: 2,
    inProgress: 1,
    teamHome: { teamName: 'Flamengo' },
    teamAway: { teamName: 'São José-SP' }
  },
  {
    id: 45,
    homeTeam: 5,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: 1,
    teamHome: { teamName: 'Cruzeiro' },
    teamAway: { teamName: 'Botafogo' }
  },
  {
    id: 46,
    homeTeam: 4,
    homeTeamGoals: 1,
    awayTeam: 12,
    awayTeamGoals: 1,
    inProgress: 1,
    teamHome: { teamName: 'Corinthians' },
    teamAway: { teamName: 'Palmeiras' }
  },
  {
    id: 47,
    homeTeam: 8,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 2,
    inProgress: 1,
    teamHome: { teamName: 'Grêmio' },
    teamAway: { teamName: 'Santos' }
  },
  {
    id: 48,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: 1,
    teamHome: { teamName: 'Real Brasília' },
    teamAway: { teamName: 'Bahia' }
  }
]

const mockInsertMetch = {
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
const mockInsertMetchError = {
  "homeTeam": 999999, // O valor deve ser o id do time
  "awayTeam": 999999, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const mockInsertMetchResult = {
  id: 1,
  ...mockInsertMetch,
  inProgress: true,
}

const mockListMatchesInProgress = (boolean: boolean) => mockListMatches.filter(({ inProgress }) => {
  return boolean ? !inProgress : !!inProgress
})

describe('1 - GET /matches', () => {
  // describe('Casos de erros', () => {
  // })

  describe('Casos de sucessos', () => {
    
    it('Busca todas as matches!', async () => {

      sinon
        .stub(MatchModel, 'findAll')
        .resolves(
          mockListMatches as unknown as MatchModel[]
        )

      const httpResponse = await chai.request(app)
      .get('/matches')
      
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mockListMatches);

      (MatchModel.findAll as sinon.SinonStub).restore();
    } )
  })
})

describe('2 - GET /matches?inProgress', () => {
  // describe('Casos de erros', () => {
  // })

  describe('Casos de sucessos', () => {
    
    it('Busca todas as matches que estão em progresso!', async () => {
      const inProgress = true;

      sinon
        .stub(MatchModel, 'findAll')
        .resolves(
          mockListMatchesInProgress(inProgress) as unknown as MatchModel[]
        )

        const httpResponse = await chai.request(app)
          .get(`/matches?inProgress=${inProgress}`)
      
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mockListMatchesInProgress(inProgress));
      
      (MatchModel.findAll as sinon.SinonStub).restore();
    } )

    it('Busca todas as matches que não estão em progresso!', async () => {
      const inProgress = false;

      sinon
        .stub(MatchModel, 'findAll')
        .resolves(
          mockListMatchesInProgress(inProgress) as unknown as MatchModel[]
        )

      const httpResponse = await chai.request(app)
      .get(`/matches?inProgress=${inProgress}`)
      
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mockListMatchesInProgress(inProgress));

      (MatchModel.findAll as sinon.SinonStub).restore();
    } )
  })
})

describe('3 - POST /matches', () => {
  describe('Casos de error', () => {

    it('Caso não venha o homeTeam!', async () => {
      const { homeTeam, ...match } = mockInsertMetch

      const httpResponse = await chai.request(app)
        .post('/matches')
        .send(match);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: 'All fields must be filled'
      });

    })

    it('Caso não venha o awayTeam!', async () => {
      const { awayTeam, ...match } = mockInsertMetch

      const httpResponse = await chai.request(app)
        .post('/matches')
        .send(match);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: 'All fields must be filled'
      });

    })

    it('Caso não venha o homeTeamGoals!', async () => {
      const { homeTeamGoals, ...match } = mockInsertMetch

      const httpResponse = await chai.request(app)
        .post('/matches')
        .send(match);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: 'All fields must be filled'
      });

    })

    it('Caso não venha o awayTeamGoals!', async () => {
      const { awayTeamGoals, ...match } = mockInsertMetch

      const httpResponse = await chai.request(app)
        .post('/matches')
        .send(match);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: 'All fields must be filled'
      });

    })

    it('Caso o algum time não exista!', async () => {

      const httpResponse = await chai.request(app)
        .post('/matches')
        .send(mockInsertMetchError);
      
      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({
        message: 'Team not found'
      });
    })
  })

  describe('Casos de sucesso', () => {

    it('Cadastro de uma partida com sucesso!', async () => {
      sinon
        .stub(MatchModel, 'create')
        .resolves(mockInsertMetchResult as unknown as MatchModel)

      const httpResponse = await chai.request(app)
        .post('/matches')
        .send(mockInsertMetch);

      expect(httpResponse.status).to.equal(201);
    })

  })
})

describe.only('4 - PACTH /matches/:id/finish', () => {
  describe('Casos de Error', () => {
    
    it('Caso seja passado um id inexistente!', async () => {
      const id = 99999;

      const httpResponse = await chai.request(app)
        .patch(`/matches/${id}/finish`)

      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({
        message: 'Macth not found',
      });
    })

    it('Caso a partida já esteja encerrada!', async () => {
      const id = 1;

      const httpResponse = await chai.request(app)
        .patch(`/matches/${id}/finish`)

      expect(httpResponse.status).to.equal(409);
      expect(httpResponse.body).to.deep.equal({
        message: 'Match already over',
      });
    })
  })

  describe('Casos de sucesso', () => {

    it('Partida encerrada com sucesso!', async () => {
      const id = 47;

      sinon
        .stub(MatchModel, 'findOne')
        .resolves(mockInsertMetchResult as unknown as MatchModel)

      const httpResponse = await chai.request(app)
        .patch(`/matches/${id}/finish`)

      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal({ message: 'Finished' });
    })
  })

})
