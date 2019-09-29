/* eslint-disable no-useless-escape */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import users from '../model/users';
import generateToken from '../helpers/tokens';
import articles from '../model/articles';
import comments from '../model/comments';

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

describe('PACTH User will be able to edit article, api/v1/articles/1', () => {
  it('should return article article SUCCESFULLY Edited', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
      .set('user-auth-token', token)
      .send(articles[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('article SUCCESFULLY Edited');
        expect(res.body.Data.Title).to.be.a('string');
        expect(res.body.Data.Article).to.be.a('string');
        expect(res.body.Data.Date).to.be.a('string');
        done();
      });
  });
});
describe('PATCH User will not be able to edit article, api/v1/articles/2', () => {
  it('should return article article SUCCESFULLY Edited', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/2')
      .set('user-auth-token', token)
      .send(articles[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Id is not found !');
        done();
      });
  });
});

describe('POST User will be able to delete article, api/v1/articles/<articleId>', () => {
  it('should return  article SUCCESFULLY DELETED', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/1')
      .set('user-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('article SUCCESFULLY DELETED');
        done();
      });
  });
});
describe('POST User will not be able to delete article, api/v1/articles/2', () => {
  it('should return not article SUCCESFULLY DELETED', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/2')
      .set('user-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Id is not found !');
        done();
      });
  });
});

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

describe('POST User will be able to comment article, api/v1/articles/1/comments', () => {
  it('should return article article SUCCESFULLY Edited', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('user-auth-token', token)
      .send(comments[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('relevant success message');
        expect(res.body.Data.CreatedOn).to.be.a('string');
        expect(res.body.Data.ArticleTitle).to.be.a('string');
        expect(res.body.Data.Article).to.be.a('string');
        expect(res.body.Data.comment).to.be.a('string');
        done();
      });
  });
});

describe('POST User will not be able to comment article, api/v1/articles/1/comments', () => {
  it('should return article article SUCCESFULLY Edited', (done) => {
    chai.request(app)
      .post('/api/v1/articles/2/comments')
      .set('user-auth-token', token)
      .send(comments[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Id is not found !');
        done();
      });
  });
});

describe('POST User will not be able to comment article, api/v1/articles/1/comments', () => {
  it('should return Provide a Token or check key header', (done) => {
    chai.request(app)
      .post('/api/v1/articles/2/comments')
      .set('me-auth-token', token)
      .send(comments[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Provide a Token or check key header');
        done();
      });
  });
});
describe('GET User will be able to view all articles, api/v1/feeds', () => {
  it('should return article article SUCCESFULLY Edited', (done) => {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('user-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
});

describe('GET User will be able to view specific articles, api/v1/articles/3', () => {
  it('should return article article SUCCESFULLY Edited', (done) => {
    chai.request(app)
      .get('/api/v1/articles/1')
      .set('user-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
describe('GET User will be able to view specific articles, api/v1/articles/3', () => {
  it('should return article article SUCCESFULLY Edited', (done) => {
    chai.request(app)
      .get('/api/v1/articles/2')
      .set('user-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});
