/* eslint-disable no-useless-escape */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import users from '../model/users';
import generateToken from '../helpers/tokens';
import articles from '../model/articles';


const { expect } = chai;

chai.use(chaiHttp);

// ############ ARTICLE TEST ############
// Create a true token for testing
const token = generateToken.generateToken(1, users[0].email);
// Create a token with invalid user
const Invalidtoken = generateToken.generateToken(1, 'kkjkshj@gmail.com');

describe('POST User will  be able to write new article, api/v1/articles', () => {
  it('should return article  successfully Created', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('user-auth-token', token)
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('article  successfully Created');
        expect(res.body.Data.CreatedOn).to.be.a('string');
        expect(res.body.Data.Title).to.be.a('string');
        done();
      });
  });
});
describe('POST User will not be able to write new article, api/v1/articles', () => {
  it('should return article  your are not user', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('user-auth-token', Invalidtoken)
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('You are not a user');
        done();
      });
  });
});

describe('POST User will not be able to write new article, api/v1/articles', () => {
  it('should return article  invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('user-auth-token', 'Invamdasjhkdgczbjhdfgalidtoken')
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('invalid token');
        done();
      });
  });
});
