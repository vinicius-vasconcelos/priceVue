const routes = require('express').Router();
const SessionCtr = require('./app/controllers/SessionCtr');
const CurrencyCtr = require('./app/controllers/CurrencyCtr');
const { authMiddleware, checkRouteMiddleware } = require('./middleware/auth');

routes.get('/', (req, res) => res.status(200).json({message: 'Bem Vindo'}));
routes.post('/login', (req, res) => SessionCtr.initSession(req, res));

routes.get('/crypto/btc', authMiddleware, (req, res) => CurrencyCtr.getCurrencies(req, res));
routes.post('/crypto/btc', authMiddleware, (req, res) => CurrencyCtr.updateCurrencies(req, res));

routes.use(checkRouteMiddleware);

module.exports = routes;
