const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

require('dotenv').config();

const { DB_HOST, USER_EMAIL, USER_PASSWORD } = process.env;

let server;

const login = require('./login');

app.post('/api/users/login', login);

const userOne = {
  email: USER_EMAIL,
  password: USER_PASSWORD,
};

describe('test login controller', () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(80);
  });

  afterAll(async () => {
    await server.close();
  });

  test('login controller', async () => {
    const res = await request(app).post('/api/users/login', login).send({
      email: userOne.email,
      password: userOne.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});
