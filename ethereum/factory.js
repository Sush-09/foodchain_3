import web3 from './web3';
import FoodSupplyChain from './build/FoodSupplyChain.json';

const instance = new web3.eth.Contract(
  JSON.parse(FoodSupplyChain.interface),
  '0x12620517f1425f58Cde13E49AEBBb758048b2c2D'
);

export default instance;
