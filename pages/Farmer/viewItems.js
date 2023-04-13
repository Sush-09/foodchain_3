import React, { Component } from "react";
import { Card,Button } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from '../../components/Layout';
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class ItemsByFarmer extends Component {
    static async getInitialProps(props) {
      // const address = '0xA2Ec9c4c87769748D2E4DB8E4647f2e793bc5eFf';
      //const fsc = FoodSupplyChain(address);
      const address = props.query.address;

      const states = ["ProduceByFarmer","RequestByManufacturer","AcceptRequestByFarmer","RejectRequestByFarmer",
      "PurchasedByManufacturer","ProducedByManufacturer","PurchasedByDistributor","ShippedByFarmer","ReceivedByDistributor",
      "ProcessedByDistributor","PackageByDistributor","ForSaleByDistributor",
      "PurchasedByRetailer","ShippedByDistributor","ReceivedByRetailer",
      "ForSaleByRetailer","PurchasedByConsumer"]
      
      const item_length = await factory.methods.getItemsLength().call();
      
      const items = await Promise.all(
        Array(parseInt(item_length))
          .fill()
          .map((element, index) => {
            return factory.methods.items(index).call();
          })
      );
  
      return { items, item_length, address, states };
    } 
    
    renderItems() {
    const item_data = this.props.items.filter((item) => {
        if (item.originFarmerID == this.props.address){
            return item;
        }
    });
   
    const item_card = item_data.map((item) => {
      return {
        header: item.productName,
        description: "Rs."+ item.pricePerUnit+ "  per "+item.unit,
        meta: "Available: "+item.quantityAvailable+" "+item.unit,
        fluid: true
      }; 
      });
      
      return <Card.Group items={item_card} />;
    }
    render() {
      return (
        <Layout>
          <div> 

            <Link route={`/Farmer/${this.props.address}/new`}>
              <a>
                <Button
                  floated="left"
                  content="Add Item"
                  icon="add circle"
                  primary
                />
              </a>
            </Link>

          <br></br><br></br>
          <h3> Items Added </h3>  

             

            {this.renderItems()}
        </div>
        </Layout>
      );
    }
  }
export default ItemsByFarmer;