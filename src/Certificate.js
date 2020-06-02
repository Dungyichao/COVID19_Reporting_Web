import React, {Component, useState } from 'react';
import {Modal, Button } from 'react-bootstrap';
//import {TestformWrapper, TestFormItem} from '../theme';
import Canvas from './Canvas';
import { Redirect } from "react-router-dom";



//https://react-bootstrap.github.io/components/modal/
//https://stackoverflow.com/questions/53282848/react-16-7-hooks-react-usestate-is-not-a-function
//https://stackoverflow.com/questions/34438671/react-bootstrap-modal-how-do-i-get-it-to-show

export default class Certificate extends Component {
	constructor(props) {
        console.log(props);
        super(props);
        //console.log(props);
        this.badge_id=props.badge_id; 
        this.pass_cat=props.pass_cat;
        this.time=props.time;

        
		this.state = {
            show: false,
            redirect: null,
            
        };
        
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleClose(){    
        //setShow(false);
        this.setState({ show: false });
        this.setState({ redirect: "/" });
        //window.location.reload(false);
        //window.location.reload(false);
    }
    
    
    handleSave(){ 
        var log_time = new Date();
        const key = log_time.getFullYear().toString() + (log_time.getMonth() + 1).toString().padStart(2, '0') + log_time.getDate().toString();
        
        var mirror = document.getElementById('mirror');
        var image = mirror.toDataURL("image/jpg", 1.0).replace("image/jpg", "image/octet-stream");    
        var link = document.createElement('a');
        //link.download = `${key}.jp2`;

        if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) { //iOS = Iphone, Ipad, etc.

          link.download = `${key}.jp2`;
          link.href = image;
          link.click(); 
          //setShow(false);
          //window.location.reload(false);
          
         
        }
        else{

          link.download = `${key}.jpg`;
          link.href = image;
          link.click();   
          //setShow(false);
          //window.location.reload(false);
          //this.setState({ redirect: "/" });
         
        }
        this.setState({ show: false });
        this.setState({ redirect: "/" });

    }

	render(){
        
        if (this.state.redirect) {
            console.log( this.state.redirect);
            return(                               
                <Redirect to={{pathname: this.state.redirect}} />
            ); 
        }
        
       
        return (
            <>
                <Modal show={this.props.open} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Download</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Save certificate to your cell phone and show to the security when enter the plant 
                        <Canvas badge_id={this.badge_id} pass_cat={this.pass_cat} time={this.time} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                        Save Certificate
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
        
	};
}
