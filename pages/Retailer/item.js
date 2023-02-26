import React, { Component } from "react";
import {Input, Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";
import factory from "../../ethereum/factory";

class ItemShow extends Component{
    state = {
        quantityRequired: "",
        message: "",
        loading: false,
        errorMessage: "",
        disabling: false
      };
    
    static async getInitialProps(props){
        const id = props.query.id;
        const address = props.query.address;
        
        const states = ["ProduceByFarmer","RequestByManufacturer","AcceptRequestByFarmer","RejectRequestByFarmer",
        "PurchasedByManufacturer","ProducedByManufacturer","PurchasedByDistributor","ShippedByFarmer","ReceivedByDistributor",
        "ProcessedByDistributor","PackageByDistributor","ForSaleByDistributor",
        "PurchasedByRetailer","ShippedByDistributor","ReceivedByRetailer",
        "ForSaleByRetailer","PurchasedByConsumer"];

        const productData = await factory.methods.products(id).call();
        
        return {address,productData, id, states};
    }

    onRequest = async () => {  
        this.setState({ loading: true, errorMessage: "", message:"" });
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.purchasedByRetailer(parseInt(this.props.id),parseInt(this.state.quantityRequired)).send({
            from: accounts[0],
            });

            
            Router.pushRoute(`/Retailer/${this.props.address}/${this.props.id}`);
            this.setState({loading: false});
            


            // this.setState({loading:false, message: "Request Sent Successfully !!!"}); 
            
        } catch(err){
            this.setState({ errorMessage: err.message ,loading: false});
        }

       
         
        
      };
    
    render(){
        return (
            <Layout>
                <div> 
                    <h1> {this.props.productData.productName} </h1>
                    <br></br>           
                    <h3><b>Manufacturer Id:</b> {this.props.productData.originManufacturerID}</h3>
                    <h3><b>Factory Location:</b> {this.props.productData.originFactory}</h3>
                    <h3><b>Quantity Available:</b> {this.props.productData.quantityAvailable} kg.</h3>
                    <h3><b>Price:</b> Rs. per Kg. {this.props.productData.pricePerUnit}</h3>

                    <h3><b>Quantity Required: </b></h3>
                    <Input value={this.state.quantityRequired} onChange={(event) => this.setState({ quantityRequired: event.target.value })}/>

                    <h3><b>Total Price:</b> Rs. {this.props.productData.pricePerUnit * parseInt(this.state.quantityRequired)}</h3>
                    
                    <br></br>
                    
                    <Button onClick={this.onRequest} primary loading={this.state.loading} disabled= {this.state.disabling}>
                    Purchase
                    </Button>
                    
                    <h3 color="Green">{this.state.errorMessage}</h3>
                </div>
            </Layout>
        );
    }
}

export default ItemShow;