import web3 from './web3';
import FoodSupplyChain from './build/FoodSupplyChain.json';

const instance = new web3.eth.Contract(
  JSON.parse(FoodSupplyChain.interface),
  '0xF970057B2468265B451DC87958a5e54D69E13b9e'
);

export default instance;
