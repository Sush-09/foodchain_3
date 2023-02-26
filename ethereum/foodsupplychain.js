import web3 from './web3';
import FoodSupplyChain from './build/FoodSupplyChain.json';

const foodsupplychain = (address) => {
    return new web3.eth.Contract(JSON.parse(FoodSupplyChain.interface), address);
};

export default foodsupplychain;