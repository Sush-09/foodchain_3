import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import {Link} from '../../routes';

class SignUp extends Component {
    state = {
      address: "",
      name: "",
      errorMessage: "",
      loading: false
    };
  
    onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: "" });
  
      try {
        const accounts = await web3.eth.getAccounts();
        const val = await factory.methods
          .addManufacturer(this.state.address,this.state.name)
          .send({
            from: accounts[0],
          });

          
            Router.pushRoute("/");
         
         } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
    };
  
    render() {
      return (
        <Layout>
          <h3>SignUp</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Manufacturer's Address</label>
              <Input
                value={this.state.address}
                onChange={(event) =>
                  this.setState({ address: event.target.value })
                }
              />
            </Form.Field>

            <Form.Field>
              <label>Manufacturer's Name</label>
              <Input
                value={this.state.name}
                onChange={(event) =>
                  this.setState({ name: event.target.value })
                }
              />
            </Form.Field>
            
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              Sign Up!
            </Button>
          </Form>
        </Layout>
      );
    }
  }
  
  export default SignUp;
  