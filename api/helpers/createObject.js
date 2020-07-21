function _codeDescription(code) {
  let description;

  switch(code) {
    case 'BRL':
      return description = 'Brazilian Real';
    break;

    case 'EUR':
      return description = 'Euro';
    break;

    case 'CAD':
      return description = 'Canadian Dollar';
    break;

    default :
      return description = 'Not Found';
  }
}

module.exports.mountObj = (code, rate_float) => ({
  code,
  rate: rate_float.toLocaleString('en-US'),
  description: _codeDescription(code),
  rate_float
});
