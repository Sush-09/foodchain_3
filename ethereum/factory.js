import web3 from './web3';
import FoodSupplyChain from './build/FoodSupplyChain.json';

const instance = new web3.eth.Contract(
  JSON.parse(FoodSupplyChain.interface),
  '0x50902b8Ef9B3EC8e2f0d1a945C1fc0beCcc26B9E'
);

export default instance;
