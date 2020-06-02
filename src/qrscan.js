import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { Redirect } from "react-router-dom";
import {Form, FormAction, FormSubmit} from './theme';
 
export default class Test extends Component {
    constructor(props){

        super(props);

        this.state = {
            result: 'No result',
            redirect: null,
            userinfo: null
        };

        this._handle_manual = this._handle_manual.bind(this);

        //this.empinfo = props.inf;
    }

    _handle_manual(event){
        event.preventDefault(); 
        this.setState({ redirect: "/home/0/0"});
    }

  
 
  handleScan = data => {
      var {result} = this.state;
      result = data
    if (data) {
      this.setState({
        result: result
      });
      var result_length = result.length;
      this.setState({ redirect: "/home/" + result.substring(0,6) + "/" + result.substring(6,result_length) });

    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    //https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
    if (this.state.redirect) {
        //alert(this.state.result);
        return <Redirect to={{pathname: this.state.redirect, state:this.state.result}} />
    }
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
        <Form onSubmit={this._handle_manual}>
            <FormAction>
                <FormSubmit type={'submit'} size="lg" style={{height:'60px'}} >Cannot Scan</FormSubmit>                           
            </FormAction>
        </Form>

      </div>
    )
  }
}