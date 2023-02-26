const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFSC = require('./build/FoodSupplyChain.json');

const provider = new HDWalletProvider(
  'moment census surge remind pupil keep genius mixed release suffer airport minute',
  // remember to change this to your own phrase!
  'https://goerli.infura.io/v3/5187fd9b46f14d98a57d5da7fd5b06c9'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFSC.interface)
  )
    .deploy({ data: compiledFSC.bytecode })
    .send({ gas: '5000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
