import React, { Component } from "react";
import { Card,Button,Grid, GridColumn } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from '../../components/Layout';
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class ItemsPurchsedByDistributer extends Component {
    static async getInitialProps(props) {
      // const address = '0xA2Ec9c4c87769748D2E4DB8E4647f2e793bc5eFf';
      //const fsc = FoodSupplyChain(address);
      const address = props.query.address;

      const states = ["ProduceByFarmer","RequestByManufacturer","AcceptRequestByFarmer","RejectRequestByFarmer",
      "PurchasedByManufacturer","ProducedByManufacturer","PurchasedByDistributor","ShippedByFarmer","ReceivedByDistributor",
      "ProcessedByDistributor","PackageByDistributor","ForSaleByDistributor",
      "PurchasedByRetailer","ShippedByDistributor","ReceivedByRetailer",
      "ForSaleByRetailer","PurchasedByConsumer"]
      
    const product_length = await factory.methods.getProductsLength().call();
      
      const products = await Promise.all(
        Array(parseInt(product_length))
          .fill()
          .map((element, index) => {
            return factory.methods.products(index).call();
          })
      );
      
  
      return {products, address, states };
    }
    renderItems() {
    const product_data = this.props.products.filter((product) => {
        if (product.distributerID == this.props.address){
            return product;
        }
    });
   
    const product_card = product_data.map((product) => {
        
            return {
                header: product.productName,
                description: "Rs."+ product.pricePerUnit+"  per unit" ,
                meta: product.quantity+" units",
                fluid: true
              };
        
        
      });
      return <Card.Group items={product_card} />;
    }
    render() {
      return (
        <Layout>
          <div> 
            <h3> Product Purchased </h3> 

            <Grid>

              <Grid.Column width={10}>
                {this.renderItems()}
              </Grid.Column>

              

            </Grid> 
          </div>
        </Layout>
      );
    }
  }
export default ItemsPurchsedByDistributer;