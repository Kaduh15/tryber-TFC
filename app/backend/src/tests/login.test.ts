import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import { app } from '../app'
import UserModel from '../database/models/User';
import JWT from '../utils/JWT';

const { expect } = chai;

chai.use(chaiHttp);

const emailCorrect = 'any_email@mail.com';
const emailIncorrect = 'error_email@mail.com';

const passwordCorrect = 'any_password';
const passwordIncorrect = 'error_password';
const sal = bcrypt.genSaltSync ( 10 ) ; 
const passwordHash  = bcrypt.hashSync ( passwordCorrect,  sal );

const mockToken = {
  token: 'any_token',
}

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

    it('caso o email esteja incorreto', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(null);

      const httpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: emailIncorrect,
          password: 'any_password'
        });
      
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal( { message: "Incorrect email or password" });

      (UserModel.findOne as sinon.SinonStub).restore();
    })

    it('caso o password esteja incorreto', async () => {

      sinon
        .stub(UserModel, "findOne")
        .resolves({
          email: emailCorrect,
          password: passwordHash,
        } as UserModel);

      const httpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: emailIncorrect,
          password: passwordIncorrect
        });
      
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal( { message: "Incorrect email or password" });

      (UserModel.findOne as sinon.SinonStub).restore();
    })
  })

  describe('Casos de sucessos', () => {

    it('Login feito com sucesso', async () => {
      
      sinon
        .stub(UserModel, "findOne")
        .resolves({
          email: emailCorrect,
          password: passwordHash,
        } as UserModel);

      sinon
        .stub(JWT, "tokenGenerator")
        .resolves(mockToken.token);

      const httpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: emailCorrect,
          password: passwordCorrect
        });
      
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mockToken);

      (UserModel.findOne as sinon.SinonStub).restore();
      (JWT.tokenGenerator as sinon.SinonStub).restore();
    } )

  })
})