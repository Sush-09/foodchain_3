import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import {Link} from '../../routes';

class PurchasedByManufacturer extends Component {
    state={
        itemName: "",
        farmerName: "",
        farmName: "",
        manufacturerName: "",
        quantity: "",
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

        const item_purchased_length = await factory.methods.getItemsPurchasedLength().call();
      
        const items_purchased = await Promise.all(
        Array(parseInt(item_purchased_length))
            .fill()
            .map((element, index) => {
            return factory.methods.itemsPurchased(index).call();
            })
        );
        
        const required_item = items_purchased.filter((item) => {
            if (item.id == original_id && item.manufacturerID == address){
                return item;
            }
        });

        // const f_address = required_item.map((item) => {
        //     return item.originFarmerId;
        // });

        // const m_address = required_item.map((item) => {
        //     return item.manufacturerID;
        // });

        

        const item_length = await factory.methods.getItemsLength().call();
      
        const items = await Promise.all(
        Array(parseInt(item_length))
            .fill()
            .map((element, index) => {
            return factory.methods.items(index).call();
            })
        );

        const raw_item = items[original_id];
        
        
        const farmerName = await factory.methods.FarmerName(required_item[0].originFarmerID).call();
        const manufacturerName = await factory.methods.ManufacturerName(required_item[0].manufacturerID).call();


        // this.setState({
        //     itemName: required_item.productName, 
        //     farmerName:farmerName, 
        //     farmName:raw_item.originFarmName,
        //     manufacturerName: manufacturerName,
        //     quantity:  required_item.quantity,
        //     price: required_item.pricePerUnit
        //  });

        return {original_id, states, required_item, farmerName, raw_item, manufacturerName};
    }

    render(){
        return(
            <Layout>
                <h2>{this.props.required_item[0].productName}</h2>
                <h3>Farmer: {this.props.farmerName}</h3>
                <h3>Farm Address: {this.props.raw_item.originFarmName}</h3>
                <h3>Manufacturer: {this.props.manufacturerName}</h3>
                <h3>Quantity: {this.props.required_item[0].quantity} Kg</h3>
                <h3>Price: Rs. {this.props.required_item[0].pricePerUnit} per kg.</h3>

            </Layout>
        );
    }
}
export default PurchasedByManufacturer;