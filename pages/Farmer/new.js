import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, Radio } from 'semantic-ui-react';
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
        errorMessage: "",
        label: ""
    };

    handleChange = (e, { value }) => {
        this.setState({ value, label: "Rs per "+value });
    }

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
                .addItem(farmAddress,productName,quantity,price,this.state.value)
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
                    <Radio label='dozen' name='radioGroup' value='dozen' checked={this.state.unit === 'dozen'} onChange={this.handleChange}/>
                    <Radio label='Kg' name='radioGroup' value='Kg' checked={this.state.unit === 'Kg'} onChange={this.handleChange}/>
                    <Radio label='liter' name='radioGroup' value='liter' checked={this.state.unit === 'liter'} onChange={this.handleChange}/>
                    <Input
                    label={this.state.value}
                    labelPosition="right"
                    value={this.state.quantity}
                    onChange={(event) => this.setState({ quantity: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <Input
                    label={this.state.label}
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