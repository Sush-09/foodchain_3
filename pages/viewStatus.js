import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Router } from "../routes";
import {Link} from '../routes';

class SignIn extends Component {
    state = {
      id: "",
      errorMessage: "",
      loading: false,
      productName:"",
      rawProductName: "",
      farmer: "",
      farmAddress: "",
      manufacturer: "",
      factoryAddress: "",
      retailer: ""
    };
  
    onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: "" });
      
      try {

        const finalProduct = await factory.methods.productsPurchased(this.state.id).call();
        const productId = finalProduct.f_id;
        const itemId = finalProduct.originalId;
        
        const originalProduct = await factory.methods.items(itemId).call();
        this.setState({productName: finalProduct.productName});
        this.setState({rawProductName: originalProduct.productName});
        this.setState({farmer: originalProduct.originFarmerID});
        this.setState({farmAddress: originalProduct.originFarmName});
        this.setState({manufacturer: finalProduct.originManufacturerID});
        this.setState({factoryAddress: finalProduct.originFactory});
        this.setState({retailer: finalProduct.retailerId});

      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    };
  
    render() {
      return (
        <Layout>
          <h3>Product Status</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Product Id</label>
              <Input
                value={this.state.id}
                onChange={(event) =>
                  this.setState({ id: event.target.value })
                }
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              View!
            </Button>
          </Form>

          <h3><b>Product Name:</b> {this.state.productName}</h3>
          <h3><b>Raw Product Name: </b> {this.state.rawProductName}</h3>
          <h3><b>farmer Id: </b> {this.state.farmer}</h3>
          <h3><b>Farm Address: </b> {this.state.farmAddress}</h3>
          <h3><b>Manufacturer Id: </b> {this.state.manufacturer}</h3>
          <h3><b>Factory Address: </b> {this.state.factoryAddress}</h3>
          <h3><b>Retailer Id: </b> {this.state.retailer}</h3>

          

        </Layout>
      );
    }
  }
  
  export default SignIn;
  