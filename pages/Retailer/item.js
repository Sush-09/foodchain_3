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
        const m_name = await factory.methods.ManufacturerName(productData.originManufacturerID).call();
        const d_name = await factory.methods.DistributerName(productData.distributerID,0).call();
        const d_location = await factory.methods.DistributerName(productData.distributerID,1).call();

        
        return {address,productData, id, states,m_name,d_name,d_location};
    }

    onRequest = async () => {  
        this.setState({ loading: true, errorMessage: "", message:"" });
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.purchasedByRetailer(parseInt(this.props.id),parseInt(this.state.quantityRequired)).send({
            from: accounts[0],
            });

            
            Router.pushRoute(`/Retailer/${this.props.address}/viewPurchasedProducts`);
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
                    <h3><b>Manufacturer :</b> {this.props.m_name}</h3>
                    <h3><b>Factory Location:</b> {this.props.productData.originFactory}</h3>
                    <h3><b>Distributer Id:</b> {this.props.productData.distributerID}</h3>
                    <h3><b>Distributer :</b> {this.props.d_name}</h3>
                    <h3><b>Distributer Location :</b> {this.props.d_location}</h3>
                    <h3><b>Quantity Available:</b> {this.props.productData.quantityAvailable} units</h3>
                    <h3><b>Price:</b> Rs. {this.props.productData.pricePerUnit} per unit</h3>
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