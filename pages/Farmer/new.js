import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class CampaignNew extends Component{

    state = {
        quantity: "",
        farmAddress: "",
        productName: "",
        price: "",
        loading: false,
        errorMessage: ""
    };

    static async getInitialProps(props) {
        const address = props.query.address;
        return {address};
    }

    onSubmit = async (event) => {
        event.preventDefault();

        
        const { quantity, farmAddress, productName,price } = this.state;

        this.setState({loading: true, errorMessage: ''});
        
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .addItem(farmAddress,productName,quantity,price)
                .send({
                    from: accounts[0]
            });
            
            Router.pushRoute(`/Farmer/${this.props.address}`);
        } catch (err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Add Items</h3>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Farm Address</label>
                    <Input
                    value={this.state.farmAddress}
                    onChange={(event) =>
                        this.setState({ farmAddress: event.target.value })
                    }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Product Name</label>
                    <Input
                    value={this.state.productName}
                    onChange={(event) =>
                        this.setState({ productName: event.target.value })
                    }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Quantity</label>
                    <Input
                    label="Kg"
                    labelPosition="right"
                    value={this.state.quantity}
                    onChange={(event) => this.setState({ quantity: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <Input
                    label="Rs per Kg"
                    labelPosition="right"
                    value={this.state.price}
                    onChange={(event) =>
                        this.setState({ price: event.target.value })
                    }
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Add!
                </Button>
            </Form>

            </Layout>
        );
    }
}
export default CampaignNew ;