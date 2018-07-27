const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
// Conectando em algum rede de destino e desbloqueando o uso nessa rede
const provider = new HDWalletProvider(
    'issue have define play pelican core cherry napkin vibrant illegal unveil laptop',
    'https://rinkeby.infura.io/hP2fv5i9IuGrCwcp1bVF'
    //'https://ropsten.infura.io/hP2fv5i9IuGrCwcp1bVF'
    //'https://infuranet.infura.io/hP2fv5i9IuGrCwcp1bVF'
    //'https://kovan.infura.io/hP2fv5i9IuGrCwcp1bVF'
);
const web3 = new Web3(provider);

// Implantando o contrato na rede
const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]); 
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: '0x' + bytecode
    }).send({
       gas: '1000000',
       from: accounts[0] 
    });
    
    console.log('Contract deployed to', result.options.address);
}

deploy();