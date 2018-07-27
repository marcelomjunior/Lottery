const path = require('path');
const fs = require('fs');
// Usando o compilador de solidity
const solc = require('solc');

// A partir daqui irá ler o conteúdo do contrato, inserindo-o diretamente no compilador
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Lottery'];
