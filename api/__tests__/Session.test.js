const request = require('supertest');
const app = require('../src/app');
const { generateToken } = require('../utils/userToken');

describe('Autenticando usuário', () => {

  it('Deverá existir a rota /login (POST) de login', async () => {
    const response = 
      await request(app)
        .post('/login')
        .send({
          email: 'email@mail.com',
          password: '135982'
        });

    expect(response.status).not.toBe(404);
  });

  it('Deverá ter campos válidos para autenticar', async () => {
    const response = 
      await request(app)
        .post('/login')
        .send({
          email: 'email@mail.com',
          password: '135982'
        });

    expect(response.status).not.toBe(400);
  });

  it('Deverá ter crendenciais válidas para acessar', async () => {
    const response = 
      await request(app)
        .post('/login')
        .send({
          email: 'email@mail.com',
          password: '135982'
        });

    expect(response.status).toBe(200);
  });

  it('Deverá retornar o token de acesso', async () => {
    const response = 
      await request(app)
        .post('/login')
        .send({
          email: 'email@mail.com',
          password: '135982'
        });

    expect(response.body).toHaveProperty('token');
  });

  it('Deverá acessar rotas privadas com token', async () => {
    const response = 
      await request(app)
        .get('/crypto/btc')
        .set('Authorization', generateToken('email@mail.com'))
        

    expect(response.status).toBe(200);
  });

  it('Deverá ser bloqueado em rotas privadas sem token', async () => {
    const response = 
      await request(app)
        .get('/crypto/btc')
        
    expect(response.status).toBe(401);
  });

});