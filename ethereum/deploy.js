const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFSC = require('./build/FoodSupplyChain.json');

const provider = new HDWalletProvider(
  '//mneumonic//',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/71631c015b2d4eb8895355707333a880'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  try{
    console.log("deploying.....");
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFSC.interface)
  )
    .deploy({ data: compiledFSC.bytecode })
    .send({ gas: '0x4C4B40',gasPrice: '0x4A817C800', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  } catch(err){
    console.log(err);
  }


  provider.engine.stop();
};
deploy();
