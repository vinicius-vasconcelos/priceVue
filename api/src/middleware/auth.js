module.exports.authMiddleware = (req, res, next) => {
  if(!req.headers.authorization)
    return res.status(401).json({ 'message': 'Token inválido' });

  return next();
}

module.exports.checkRouteMiddleware = (req, res, next) => {
  return res.status(404).json({ message: 'Endpoint não encontrado' });
}