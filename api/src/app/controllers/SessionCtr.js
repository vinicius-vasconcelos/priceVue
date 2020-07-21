const { generateToken } = require('../../../utils/userToken');

class SessionCtr {

  initSession(req, res) {
    const { email, password } = req.body;

    if(!email.includes('@') || password.length < 6)
      return res.status(400).json({ message: 'Campos inválidos' });
      
    const token = generateToken(email);
    
    return res.status(200).send({ token });
  }

  destroyerSession(req, res) {
    return;
  }
}

module.exports = new SessionCtr();
