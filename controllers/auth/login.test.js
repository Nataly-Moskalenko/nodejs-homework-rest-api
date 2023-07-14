const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

require('dotenv').config();

const { DB_HOST, USER_EMAIL, USER_PASSWORD } = process.env;

const login = require('./login');

app.post('/api/users/login', login);

const userOne = {
  email: USER_EMAIL,
  password: USER_PASSWORD,
};

describe('test login controller', () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST).then(() => {
      console.log('Database disconnect');
    });
  });

  test('the login controller response must have a status 200', async () => {
    const res = await request(app).post('/api/users/login', login).send({
      email: userOne.email,
      password: userOne.password,
    });
    expect(res.status).toBe(200);
  });

  test('the login controller response must have a token', async () => {
    const res = await request(app).post('/api/users/login', login).send({
      email: userOne.email,
      password: userOne.password,
    });
    expect(res.body).toHaveProperty('token');
  });

  test('the login controller response must have a user', async () => {
    const res = await request(app).post('/api/users/login', login).send({
      email: userOne.email,
      password: userOne.password,
    });
    expect(res.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});
