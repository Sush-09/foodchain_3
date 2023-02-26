import React, { Component } from "react";
import {Input,Card, Grid, Button } from "semantic-ui-react";
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

        const itemData = await factory.methods.items(parseInt(id)).call();
        
        return {address,itemData, id, states};
    }

    onRequest = async () => {  
        this.setState({ loading: true, errorMessage: "", message:"" });
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.purchasedByManufacturer(parseInt(this.props.id),parseInt(this.state.quantityRequired)).send({
            from: accounts[0],
            });

            Router.pushRoute(`/Manager/${this.props.address}/viewPurchasedItems`);
            this.setState({loading: false});
            if (this.props.itemData.itemState == 4){
                this.setState({disabling: true});
            }


            // this.setState({loading:false, message: "Request Sent Successfully !!!"}); 
            
        } catch(err){
            this.setState({ errorMessage: err.message ,loading: false});
        }

        if(this.props.itemData.itemState == 4){
            this.setState({disabling: true});
        }
         
        
      };
    
    render(){
        return (
            <Layout>
                <div> 
                    <h1> {this.props.itemData.productName} </h1>
                    <br></br>           
                    <h3><b>Farmar Id:</b> {this.props.itemData.originFarmerID}</h3>
                    <h3><b>Farmar Location:</b> {this.props.itemData.originFarmName}</h3>
                    <h3><b>Quantity Available:</b> {this.props.itemData.quantityAvailable} kg.</h3>
                    <h3><b>Price:</b> Rs. {this.props.itemData.pricePerUnit}  per Kg</h3>
                    
                    <h3><b>Quantity Required: </b></h3>
                    <Input value={this.state.quantityRequired} onChange={(event) => this.setState({ quantityRequired: event.target.value })}/>

                    <h3><b>Total Price:</b> Rs. {this.props.itemData.pricePerUnit * parseInt(this.state.quantityRequired)}</h3>

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