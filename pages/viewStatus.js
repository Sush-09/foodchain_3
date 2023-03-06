import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Router } from "../routes";
import {Link} from '../routes';

class ViewStatus extends Component {
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
      distributer: "",
      d_location: "",
      retailer: "",
      r_location: ""
    };

    static async getInitialProps(props){
      const id = props.query.id;
      return{ id };
    }


  
    onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: "" });
      
      try {

        const finalProduct = await factory.methods.productsPurchased(this.props.id).call();
        const productId = finalProduct.f_id;
        const itemId = finalProduct.originalId;
        const originalProduct = await factory.methods.items(itemId).call();
        const f_name = await factory.methods.FarmerName(originalProduct.originFarmerID).call();
        const m_name = await factory.methods.ManufacturerName(finalProduct.originManufacturerID).call();
        const d_name = await factory.methods.DistributerName(finalProduct.distributerID,0).call();
        const d_location= await factory.methods.DistributerName(finalProduct.distributerID,1).call();
        const r_name = await factory.methods.RetailerName(finalProduct.retailerId,0).call();
        const r_location = await factory.methods.RetailerName(finalProduct.retailerId,1).call();
        
        this.setState({productName: finalProduct.productName});
        this.setState({rawProductName: originalProduct.productName});
        this.setState({farmer: f_name});
        this.setState({farmAddress: originalProduct.originFarmName});
        this.setState({manufacturer: m_name});
        this.setState({factoryAddress: finalProduct.originFactory});
        this.setState({distributer: d_name});
        this.setState({d_location: d_location});
        this.setState({retailer: r_name});
        this.setState({r_location: r_location});


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
            {/* <Form.Field>
              <label>Product Id</label>
              <Input
                value={this.state.id}
                onChange={(event) =>
                  this.setState({ id: event.target.value })
                }
              />
            </Form.Field> */}
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              View!
            </Button>
          </Form>

          <h3><b>Product Name:</b> {this.state.productName}</h3>
          <h3><b>Raw Product Name: </b> {this.state.rawProductName}</h3>
          <h3><b>farmer : </b> {this.state.farmer}</h3>
          <h3><b>Farm Address: </b> {this.state.farmAddress}</h3>
          <h3><b>Manufacturer : </b> {this.state.manufacturer}</h3>
          <h3><b>Factory Address: </b> {this.state.factoryAddress}</h3>
          <h3><b>Distributer: </b> {this.state.distributer}</h3>
          <h3><b>Distributer Address: </b> {this.state.d_location}</h3>
          <h3><b>Retailer: </b> {this.state.retailer}</h3>          
          <h3><b>Retailer Address: </b> {this.state.r_location}</h3>

          

        </Layout>
      );
    }
  }
  
  export default ViewStatus;
  