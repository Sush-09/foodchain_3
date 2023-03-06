import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class AddFinalProduct extends Component{

    state = {
        quantity: "",
        factoryAddress: "",
        productName: "",
        price: "",
        loading: false,
        errorMessage: "",
    };

    static async getInitialProps(props) {
        const address = props.query.address;
        const id = props.query.id; 

        const originalItem = await factory.methods.items(id).call();/*????*/

        // const item_length = await factory.methods.getItemsPurchasedLength().call();
        // console.log(item_length);
        // const items = await Promise.all(
        //     Array(parseInt(item_length))
        //     .fill()
        //     .map((element, index) => {
        //         return factory.methods.itemsPurchased(index).call();
        //     })
        // );
        // console.log(items);
        // const item_data = items.filter((item) => {
        //     if (item.manufacturerID == address){
        //         return item;
        //     }
        // });
        // console.log(item_data);
        // const itemQuantity = item_data.filter((item) => {
        //     if (item.id == id){
        //         return item.quantity;
        //     }
        // });
        // console.log(itemQuantity);

        return {address, id, originalItem};
    }

    onSubmit = async (event) => {
        event.preventDefault();

        
        const { quantity, factoryAddress, productName,price } = this.state;

        this.setState({loading: true, errorMessage: ''});
        
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .addProductByManufacturer(this.props.id,factoryAddress,productName,quantity,price)
                .send({
                    from: accounts[0]
            });
            
            Router.pushRoute(`/Manager/${this.props.address}/viewProducts`);
        } catch (err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Add Product</h3>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                
                <Form.Field>
                    <label>Original Product:  {this.props.originalItem.productName}</label>
                    {/* <label>Quantity:  {this.props.itemQuantity}</label>  */}
                   
                </Form.Field>

                <Form.Field>
                    <label>Factory Address</label>
                    <Input
                    value={this.state.factoryAddress}
                    onChange={(event) =>
                        this.setState({ factoryAddress: event.target.value })
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
                    label="units"
                    labelPosition="right"
                    value={this.state.quantity}
                    onChange={(event) => this.setState({ quantity: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <Input
                    label="Rs per unit"
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
export default AddFinalProduct ;