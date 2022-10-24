import { IPayload } from '../utils/JWT';
import { IUser } from '../interfaces/IUser';
import { Secret } from 'jsonwebtoken';
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


const token = JWT.tokenGenerator({ role: 'admin'} as IUser)

const mockToken = {
  token,
}

const payload = JWT.tokenValidation(token as string);
describe('---------------------- Rota Login ----------------------', () => {

  after(() => {
    sinon.restore()
  })

  describe('1 - POST /login', () => {

    describe('Casos de erros', () => {

      after(() => {
        sinon.restore()
      })

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

        sinon.restore()
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

        sinon.restore()
      })
    })

    describe('Casos de sucessos', () => {

      after(() => {
        sinon.restore()
      })
      
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
      })
    })
  })

  describe('2 - GET /login/validate', () => {

    describe('Casos de erros', () => {

      after(() => {
        sinon.restore()
      })

      it('caso o username não tenha passado', async () => {
        const httpResponse = await chai.request(app)
          .post('/login')
          .send({ password: 'any_password' });

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
      })

      it('caso o password esteja incorreto', async () => {
        sinon.restore()

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

        sinon.restore()
      })

    })

    describe('Casos de sucessos', () => {

      after(() => {
        sinon.restore()
      })

      it('Caso seja enviado o Token corretamente!', async () => {
        const httpResponse = await chai.request(app)
        .get('/login/validate')
        .set({'Authorization': token });

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.deep.equal({ role: payload.role });
      })
    })
  })
})