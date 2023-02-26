import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import {Link} from '../../routes';

class Action extends Component{
render(){
    return(
        <Layout>
            <div>
                <center>
                    <h1>Farmer</h1>
                    <br></br><br></br><br></br>
                <Link route="/Farmer/signIn">
                    <a>
                    <Button content="SignIn" primary/>
                    </a>
                </Link>
                <br></br><br></br>
                <Link route="/Farmer/signUp">
                <a>
                <Button content="SignUp" primary/>
                </a>
                </Link>
                </center>
            </div>
        </Layout>
    );
}
}
export default Action;