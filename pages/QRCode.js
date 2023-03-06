import React, {Component} from 'react';
import Layout from '../components/Layout';
import {Card, Grid, Button, Image, Form, Input, Message} from 'semantic-ui-react';
// import web3 from '../ethereum/web3';
import {Link} from '../routes';
import QRCode from "react-qr-code";

class QRCodeGenerate extends Component{

    state = {
        id: "",
        url: "http://192.168.43.47:3000/viewStatus/",
        text: ""
        // src: "",
        // errorMessage: "",
        // loading: false,
    };

    // downloadQRCode = () => {
    //     const qrCodeURL = document.getElementById('qrCodeEl')
    //       .toDataURL("image/png")
    //       .replace("image/png", "image/octet-stream");
    //     console.log(qrCodeURL)
    //     let aEl = document.createElement("a");
    //     aEl.href = qrCodeURL;
    //     aEl.download = "QR_Code.png";
    //     document.body.appendChild(aEl);
    //     aEl.click();
    //     document.body.removeChild(aEl);
    //   }

    // onSubmit = async (event) => {
    //     event.preventDefault();
    //     this.setState({ loading: true, errorMessage: "" });
    
    //     try {
    //         const id = this.state.id;
    //         const qrsrc =await fetch('http://api.qrserver.com/v1/create-qr-code/?data=id');
    //         console.log(qrsrc);
    //         this.setState({src: qrsrc});
    //     } catch (err) {
    //       this.setState({ errorMessage: err.message });
    //     }
    //     this.setState({ loading: false });
    // };


    render(){
        return (

            <Layout>
                <h3>QR Code</h3>
                
                <Form >
                    <Form.Field>
                    <label>Enter ID</label>
                    <Input
                        value={this.state.id}
                        onChange={(event) =>
                        this.setState({text : this.state.url+event.target.value ,id : event.target.value })
                        }
                    />
                    
                    </Form.Field>
                    <br></br>
                    {this.state.text && (
                    <QRCode
                        id  = "qrCodeEl"
                        title="QR CODE"
                        value={this.state.text}
                    />
                    )}
                    <br></br>
                     
                </Form>

                <br></br>

                <Link route={`/viewStatus/${this.state.id}`}>
                    <a>
                        <Button
                        floated="left"
                        content="View Status"
                        primary
                        />
                    </a>
                </Link>

                {/* <Image src= {this.state.src} size='medium' bordered /> */}

            </Layout>
        );
    }
}

export default QRCodeGenerate;