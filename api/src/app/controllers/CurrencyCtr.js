const axios = require('../../../utils/axios');
const fs = require('fs');
const path = require('path');

const { convertInBTC } = require('../../../helpers/convertCurrencyValue');
const { mountObj } = require('../../../helpers/createObject');

class CurrencyCtr {

  getCurrencies(req, res) {
    axios.getAxios('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      .then( ({ data }) => {
        const USDrate_float = data.bpi.USD.rate_float;
        const currencies = this._readFile();

        Object.keys(currencies)
          .map((key) => 
            data.bpi[key] = mountObj(key, convertInBTC(currencies[key], USDrate_float))
          );

        return res.status(200).json(data);
      })
      .catch(err => res.status(500).json({ message: 'Problemas de conexão...' }))
  }

  updateCurrencies(req, res) {
    const { currency, value } = req.body;

    if(currency !== 'BRL' && currency !== 'EUR' && currency !== 'CAD')
      return res.status(400).json({ message: 'Moeda inválida' });

    if(value === undefined || parseFloat(value) <= 0.00)
      return res.status(400).json({ message: 'Valor inválida' });
      
    const currencies = this._readFile();
    currencies[currency] = value.toLocaleString('en-US');
    this._writeFile(currencies)

    return res.status(200).json({ message: 'Valor alterado com sucesso!' });
  }

  _readFile() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../../config/currencies.json'), 'utf-8'));
  }

  _writeFile(content) {
    fs.writeFileSync(
      path.join(__dirname, '../../../config/currencies.json'), 
      JSON.stringify(content), 
      'utf-8');
  }
}

module.exports = new CurrencyCtr();
