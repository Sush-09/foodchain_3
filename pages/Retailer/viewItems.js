import React, { Component } from "react";
import { Card,Button,Grid } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from '../../components/Layout';
import { Link, Router } from "../../routes";

class ItemList extends Component {
    static async getInitialProps(props) {
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
  
      return { address, products, product_length, states };
    }
    renderItems() {

      const product_data = this.props.products.filter((product) => {
        if (this.props.states[product.itemState]== "PurchasedByDistributor"){
          return product;
      }
      });

      const product_card = product_data.map((product) => {
        
          return {
            href: `/Retailer/${this.props.address}/${product.f_id}`,
            header: product.productName,
            description: "Rs."+product.pricePerUnit+" per unit ",
            meta: "Available: "+product.quantityAvailable+" units",
            fluid: true,
          };
       
      });
      return <Card.Group items={product_card} />;
    }
    render() {
      return (
        <Layout>
          <div> 
            <Link route={`/Retailer/${this.props.address}/viewPurchasedProducts`}>
                  <a>
                    <Button primary floated="left" style={{ marginBottom: 10 }}>
                      Purchased Products
                    </Button>
                  </a>
            </Link> 
            <br></br><br></br>
            <h3> Available Products </h3> 
   
                {this.renderItems()}

          </div>
        </Layout>
      );
    }
  }
export default ItemList;