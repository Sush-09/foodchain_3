import React, { Component } from "react";
import { Table } from 'semantic-ui-react';
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Link, Router } from "../routes";

class TableExampleSelectableCell extends Component{

  static async getInitialProps(props){
    //const address = props.query.address;
    
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

    const item_purchased_length = await factory.methods.getItemsPurchasedLength().call();
      
    const items_purchased = await Promise.all(
      Array(parseInt(item_purchased_length))
        .fill()
        .map((element, index) => {
          return factory.methods.itemsPurchased(index).call();
        })
    );

    const product_length = await factory.methods.getProductsLength().call();
      
    const products = await Promise.all(
      Array(parseInt(product_length))
        .fill()
        .map((element, index) => {
          return factory.methods.products(index).call();
        })
    );

    const product_purchased_length = await factory.methods.getProductsPurchasedLength().call();
      
    const products_purchased = await Promise.all(
      Array(parseInt(product_purchased_length))
        .fill()
        .map((element, index) => {
          return factory.methods.productsPurchased(index).call();
        })
    );

    return { items, products, states, items_purchased, products_purchased };
  }

  
  RequestPurchasedItems(item_id){
    return this.props.items_purchased.map((item) => {
      if(item.id == item_id){
        return (
          <Link route={`/Status/${item_id}/${item.manufacturerID}/PurchasedByManufacturer`}><a><b>{item.productName}</b><br/>Quantity: {item.quantity} kg.<br/><br/><br/></a></Link>
        );
      }
    });
  }

  RequestProducts(item_id){
    return this.props.products.map((product) => {
      if(product.originalId == item_id ){
        return (
          <Link route={`/Status/ProducedByManufacturer/${item_id}/${product.originManufacturerID}`}><a><b>{product.productName}</b><br/>Quantity: {product.quantity} units<br/><br/><br/></a></Link>
        );
      }
    });
  }

  ProductsDistributer(item_id){
    return this.props.products.map((product) => {
      if(product.originalId == item_id && this.props.states[product.itemState]== "PurchasedByDistributor"){
        return (
          <Link route={`/Status/PurchasedByDistributor/${item_id}/${product.originManufacturerID}`}><a><b>{product.productName}</b><br/>Quantity: {product.quantity} units<br/>Quantity Available:{product.quantityAvailable} units<br/><br/><br/></a></Link>
        );
      }
    });
  }

  ProductsRetailer(item_id){
    return this.props.products_purchased.map((product) => {
      if(product.originalId == item_id){
        return (
          <Link route={`/Status/PurchasedByRetailer/${item_id}/${product.originManufacturerID}`}><a><b>{product.productName}</b><br/>Quantity: {product.quantity} units<br/><br/><br/></a></Link>
        );
      }
    });
  }  


  RequestRow(){
    return this.props.items.map((item) =>{
      return(
        <Table.Row>
          <Table.Cell  positive><Link route={`/Status/ProduceByFarmer/${item.id}`}><a><b>{item.productName}</b><br />Quantity: {item.quantity} kg.<br/>Quantity Available: {item.quantityAvailable} kg.</a></Link></Table.Cell>
          <Table.Cell negative>{this.RequestPurchasedItems(item.id)}</Table.Cell>
          <Table.Cell>{this.RequestProducts(item.id)}</Table.Cell>
          <Table.Cell negative>{this.ProductsDistributer(item.id)}</Table.Cell>
          <Table.Cell  positive>{this.ProductsRetailer(item.id)}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render(){
    return (

       <Layout>
          <Table celled>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ProduceByFarmer</Table.HeaderCell>
                <Table.HeaderCell>PurchasedByManufacturer</Table.HeaderCell>
                <Table.HeaderCell>ProducedByManufacturer</Table.HeaderCell>
                <Table.HeaderCell>PurchasedByDistributor</Table.HeaderCell>
                <Table.HeaderCell>PurchasedByRetailer</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              {this.RequestRow()}
                      
            </Table.Body>
          </Table>
        </Layout>
    );
  }
}


export default TableExampleSelectableCell