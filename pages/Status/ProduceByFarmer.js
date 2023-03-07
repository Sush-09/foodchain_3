import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import {Link} from '../../routes';

class ProduceByFarmer extends Component {
    state={
        itemName: "",
        farmerName: "",
        farmName: "",
        quantity: "",
        quantityAvailable: "",
        price: ""
    };
    static async getInitialProps(props) {
        const original_id = props.query.id;

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

        const required_item = items[original_id];
        const farmerName = await factory.methods.FarmerName(required_item.originFarmerID).call();

        

        return {original_id, states, items, required_item,farmerName};
    }

    // SettingState(){
    //     this.setState({
    //         itemName: this.props.required_item.productName, 
    //         farmerName: this.props.farmerName, 
    //         farmName: this.props.required_item.originFarmName,
    //         quantity:  this.props.required_item.quantity,
    //         quantityAvailable: this.props.required_item.quantityAvailable,
    //         price: this.props.required_item.pricePerUnit
    //      });
    // }

    render(){
        return(
            
            <Layout>
                 
                <h2>{this.props.required_item.productName}</h2>
                <h3>Farmer: {this.props.farmerName}</h3>
                <h3>Farm Address: {this.props.required_item.originFarmName}</h3>
                <h3>Quantity: {this.props.required_item.quantity} Kg</h3>
                <h3>Quantity Available: {this.props.required_item.quantityAvailable} Kg</h3>
                <h3>Price: Rs. {this.props.required_item.pricePerUnit} per kg.</h3>

            </Layout>
        );
    }
}
export default ProduceByFarmer;