import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import UserModel from '../database/models/User';

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /login', () => {
  describe('Casos de erros', () => {
    it('caso o username não tenha passado', async () => {
      const httpResponse = await chai.request(app)
        .post('/login')
        .send({
          password: 'any_password'
        });
      
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: "All fields must be filled" });
    })
    it('caso o password não tenha passado', async () => {
      const httpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'any_email@mail.com'
        });
      
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: "All fields must be filled" });
    })
  })
  describe('Casos de sucessos', () => {
    it('Login feito com sucesso', async () => {
      const httpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        });
      
      expect(httpResponse.status).to.equal(200);
    } )
  })
})