const request = require('supertest');
const app = require('../src/app');
const { generateToken } = require('../utils/userToken');


describe('Buscando informações sobre as moedas', () => {

  it('Deverá existir rota /crypto/btc (GET) para obter informações sobre as moedas.', async () => {
    const response = 
      await request(app)
        .get('/crypto/btc')
        .set('Authorization', generateToken('email@mail.com'));

    expect(response.status).not.toBe(404);
  });

  it('/crypto/btc (GET) deverá retornar um objeto com "time", "disclaimer" e "bpi (USD, BRL, EUR, CAD e BTC)".', async () => {
    const response = 
      await request(app)
        .get('/crypto/btc')
        .set('Authorization', generateToken('email@mail.com'))

    expect(response.body).toHaveProperty('time');
    expect(response.body).toHaveProperty('disclaimer');
    
    expect(response.body).toHaveProperty('bpi.USD');
      expect(response.body).toHaveProperty('bpi.USD.code');
      expect(response.body).toHaveProperty('bpi.USD.rate');
      expect(response.body).toHaveProperty('bpi.USD.description');
      expect(response.body).toHaveProperty('bpi.USD.rate_float');

    expect(response.body).toHaveProperty('bpi.BRL');
      expect(response.body).toHaveProperty('bpi.BRL.code');
      expect(response.body).toHaveProperty('bpi.BRL.rate');
      expect(response.body).toHaveProperty('bpi.BRL.description');
      expect(response.body).toHaveProperty('bpi.BRL.rate_float');

    expect(response.body).toHaveProperty('bpi.EUR');
      expect(response.body).toHaveProperty('bpi.EUR.code');
      expect(response.body).toHaveProperty('bpi.EUR.rate');
      expect(response.body).toHaveProperty('bpi.EUR.description');
      expect(response.body).toHaveProperty('bpi.EUR.rate_float');

    expect(response.body).toHaveProperty('bpi.CAD');
      expect(response.body).toHaveProperty('bpi.CAD.code');
      expect(response.body).toHaveProperty('bpi.CAD.rate');
      expect(response.body).toHaveProperty('bpi.CAD.description');
      expect(response.body).toHaveProperty('bpi.CAD.rate_float');
      
    expect(response.body).toHaveProperty('bpi.BTC');
      expect(response.body).toHaveProperty('bpi.BTC.code');
      expect(response.body).toHaveProperty('bpi.BTC.rate');
      expect(response.body).toHaveProperty('bpi.BTC.description');
      expect(response.body).toHaveProperty('bpi.BTC.rate_float');
  });

  it('Deverá existir rota /crypto/btc (POST)', async () => {
    const response = 
      await request(app)
        .post('/crypto/btc')
        .set('Authorization', generateToken('email@mail.com'))

    expect(response.status).not.toBe(404);
  });

  it('O corpo deverá ser enviado com os atributos "currency (BRL, EUR, CAD)" e "value (> 0)" para alteração da moeda.', async () => {
    const response = 
      await request(app)
        .post('/crypto/btc')
        .set('Authorization', generateToken('email@mail.com'))
        .send({
          currency: 'CAD',
          value: 1.440
        })

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ message: 'Valor alterado com sucesso!' })
  });
});