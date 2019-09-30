/* eslint-disable no-useless-escape */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import users from '../model/users';

const { expect } = chai;

chai.use(chaiHttp);


// ############ SIGNUP TEST ############

// Test signup for the user

describe('POST sign up successfully, api/v1/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('user Created successfully');
        expect(res.body.data.token).to.be.a('string');
        done();
      });
  });
});

describe('POST sign up NOT successfully, api/v1/auth/signup', () => {
  it('should return email is already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Email is already exist!');
        done();
      });
  });
});

describe('POST sign up NOT successfully, api/v1/auth/signup', () => {
  it('should return email is data required is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});
// Test login for the user

describe('POST sign in successfully, api/v1/auth/signin', () => {
  it('should return signin successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('user  is successfully logged in');
        expect(res.body.data.token).to.be.a('string');
        done();
      });
  });
});

// Test login for the user on fail

describe('POST sign in not successfully, api/v1/auth/signin', () => {
  it('should return Invalid Email or Password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Invalid Email or Password');
        done();
      });
  });
});

describe('POST sign in not successfully, api/v1/auth/signin', () => {
  it('should return email is not allowed tobe empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('\"email\" is not allowed to be empty');
        done();
      });
  });
});

describe('POST sign in not successfully, api/v1/auth/signin', () => {
  it('should return email must be valid ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('\"email\" must be a valid email');
        done();
      });
  });
});

describe('POST sign in not successfully, api/v1/auth/signin', () => {
  it('should return password is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('\"password\" is not allowed to be empty');
        done();
      });
  });
});


describe('POST sign in not successfully, api/v1/auth/signin', () => {
  it('should return password is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signi')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Route doesn\'t exist');
        done();
      });
  });
});
