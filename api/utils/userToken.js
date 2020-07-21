module.exports.generateToken = email => {
  let token = '';
  let decimal;
  let hexadecimal;
  const emailUpperCase = email.toUpperCase()

  for(let i = 0; i < 4; i++) {
    decimal = emailUpperCase.charCodeAt(i);
    hexadecimal = decimal.toString(16);
    token += `${decimal}${hexadecimal}`;
  }

  return token;
}

/*module.exports.validToken = (email, token) => {
  return this.generateToken(email) === token;
}*/
