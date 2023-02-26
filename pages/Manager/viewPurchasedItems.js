import React, { Component } from "react";
import { Card,Button,Grid, GridColumn } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from '../../components/Layout';
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class ItemsPurchsedByManufacturer extends Component {
    static async getInitialProps(props) {
      // const address = '0xA2Ec9c4c87769748D2E4DB8E4647f2e793bc5eFf';
      //const fsc = FoodSupplyChain(address);
      const address = props.query.address;

      const states = ["ProduceByFarmer","RequestByManufacturer","AcceptRequestByFarmer","RejectRequestByFarmer",
      "PurchasedByManufacturer","ProducedByManufacturer","PurchasedByDistributor","ShippedByFarmer","ReceivedByDistributor",
      "ProcessedByDistributor","PackageByDistributor","ForSaleByDistributor",
      "PurchasedByRetailer","ShippedByDistributor","ReceivedByRetailer",
      "ForSaleByRetailer","PurchasedByConsumer"]
      
    const item_length = await factory.methods.getItemsPurchasedLength().call();
      
      const items = await Promise.all(
        Array(parseInt(item_length))
          .fill()
          .map((element, index) => {
            return factory.methods.itemsPurchased(index).call();
          })
      );
      
  
      return {items, item_length, address, states };
    }
    renderItems() {
    const item_data = this.props.items.filter((item) => {
        if (item.manufacturerID == this.props.address){
            return item;
        }
    });
   
    const item_card = item_data.map((item) => {
        
            return {
                href:  `/Manager/${this.props.address}/${item.id}/addFinalProduct`,
                header: item.productName,
                description: "Rs."+ item.pricePerUnit+"  per Kg" ,
                meta: item.quantity+" Kg",
                fluid: true
              };
        
        
      });
      return <Card.Group items={item_card} />;
    }
    render() {
      return (
        <Layout>
          <div> 
            <h3> Items Purchased </h3> 

            <Grid>

              <Grid.Column width={10}>
                {this.renderItems()}
              </Grid.Column>

              <Grid.Column width={6}>
                {/* <Link route={`/Manager/${this.props.address}/addFinalProduct`}>
                  <a>
                    <Button floated="right" content="Add Product" icon="add circle"  primary/>
                  </a>
                </Link> */}
              </Grid.Column>

            </Grid> 
          </div>
        </Layout>
      );
    }
  }
export default ItemsPurchsedByManufacturer;