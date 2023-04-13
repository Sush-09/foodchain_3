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
      
      const item_length = await factory.methods.getItemsLength().call();
      
      const items = await Promise.all(
        Array(parseInt(item_length))
          .fill()
          .map((element, index) => {
            return factory.methods.items(index).call();
          })
      );

      return { address, items, item_length, states };
    }
    renderItems() {
      const item_data = this.props.items.map((item) => {
        
          return {
            href: `/Manager/${this.props.address}/${item.id}`,
            header: item.productName,
            description: "Rs."+item.pricePerUnit+" per "+item.unit,
            meta: "Available: "+item.quantityAvailable+" "+item.unit,
            fluid: true,
          };
       
      });
      return <Card.Group items={item_data} />;
    }
    render() {
      return (
        <Layout>
          <div>  
              <Link route={`/Manager/${this.props.address}/viewPurchasedItems`}>
                  <a>
                    <Button primary floated="left" style={{ marginBottom: 10 }}>
                      Purchased Items
                    </Button>
                  </a>
              </Link>  
              <Link route={`/Manager/${this.props.address}/viewProducts`}>
                  <a>
                    <Button primary floated="left" style={{ marginBottom: 10 }}>
                      View Products
                    </Button>
                  </a>
              </Link>    
              <br></br><br></br>
                <h3> Available Items </h3> 
                {this.renderItems()}
          </div>
        </Layout>
      );
    }
  }
export default ItemList;