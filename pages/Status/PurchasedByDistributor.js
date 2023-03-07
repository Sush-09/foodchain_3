import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import {Link} from '../../routes';

class PurchasedByDistributer extends Component {
    state={
        productName: "",
        RawItemName: "",
        farmerName: "",
        farmName: "",
        manufacturerName: "",
        factoryName: "",
        distributerName: "",
        distributerLocation: "",
        quantity: "",
        quantityAvailable:"",
        price: ""
    };
    static async getInitialProps(props) {
        const original_id = props.query.id;
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

        const required_product = products.filter((product) => {
            if (product.originalId == original_id && product.originManufacturerID == address && states[product.itemState]=="PurchasedByDistributor"){
                return product;
            }
        });



        const item_length = await factory.methods.getItemsLength().call();
      
        const items = await Promise.all(
        Array(parseInt(item_length))
            .fill()
            .map((element, index) => {
            return factory.methods.items(index).call();
            })
        );

        const raw_item = items[original_id];
        console.log(raw_item.originFarmerID);

        const farmerName = await factory.methods.FarmerName(raw_item.originFarmerID).call();
        const manufacturerName = await factory.methods.ManufacturerName(required_product[0].originManufacturerID).call();
        const distributerName = await factory.methods.DistributerName(required_product[0].distributerID,0).call();
        const distributerLocation = await factory.methods.DistributerName(required_product[0].distributerID,1).call();

        // this.setState({
        //     productName: required_product.productName,
        //     RawItemName: raw_item.productName, 
        //     farmerName:farmerName, 
        //     farmName:raw_item.originFarmName,
        //     manufacturerName: manufacturerName,
        //     factoryName: required_product.originFactory,
        //     distributerName: distributerName,
        //     distributerLocation: distributerLocation,
        //     quantity:  required_product.quantity,
        //     quantityAvailable: required_product.quantityAvailable,
        //     price: required_product.pricePerUnit
        //  });

        return {original_id, states, required_product, raw_item, farmerName, manufacturerName, distributerName, distributerLocation};
    }

    render(){
        return(
            <Layout>
                <h2>{this.props.required_product[0].productName}</h2>
                <h3>Raw Item: {this.props.raw_item.productName}</h3>
                <h3>Farmer: {this.props.farmerName}</h3>
                <h3>Farm Address: {this.props.raw_item.originFarmName}</h3>
                <h3>Manufacturer: {this.props.manufacturerName}</h3>
                <h3>Factory Address: {this.props.required_product[0].originFactory}</h3>
                <h3>Distributer: {this.props.distributerName}</h3>
                <h3>Distributer Address: {this.props.distributerLocation}</h3>
                <h3>Quantity: {this.props.required_product[0].quantity} units</h3>
                <h3>quantity Available: {this.props.required_product[0].quantityAvailable} units</h3>
                <h3>Price: Rs. {this.props.required_product[0].pricePerUnit} per unit.</h3>

            </Layout>
        );
    }
}
export default PurchasedByDistributer;