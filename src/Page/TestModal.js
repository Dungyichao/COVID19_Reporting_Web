import React, {Component, useState } from 'react';
import {Modal, Button } from 'react-bootstrap';
import {TestformWrapper, TestFormItem} from '../theme';




//https://react-bootstrap.github.io/components/modal/
//https://stackoverflow.com/questions/53282848/react-16-7-hooks-react-usestate-is-not-a-function
//https://stackoverflow.com/questions/34438671/react-bootstrap-modal-how-do-i-get-it-to-show

export default class TestModal extends Component {
	constructor(props) {
        
        super(props);
        //console.log(props);

        const today_date = new Date();
        const date_string = `${today_date.getFullYear().toString()}-${(today_date.getMonth() + 1).toString().padStart(2, '0')}-${today_date.getDate().toString()}`;

        this.today_date = date_string;
		this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClose_noVal = this.handleClose_noVal.bind(this);
        this.calendar_onChange = this.calendar_onChange.bind(this);
        this._t_radioOnClick = this._t_radioOnClick.bind(this);


		this.state = {
            show: false,
            testinfo:{
                date: date_string,
                status: "",
            },
            t_radiocheck:{
                t_radi0: true,
                t_radi1: false,
                t_radi2: false,

            },
		};
    }
    
    _t_radioOnClick(event){
        event.persist();
        let {testinfo, t_radiocheck} = this.state;
        if(event.target.value === "w"){
            t_radiocheck["t_radi0"] = true;
            t_radiocheck["t_radi1"] = false;
            t_radiocheck["t_radi2"] = false;
        }
        else if(event.target.value === "p"){
            t_radiocheck["t_radi0"] = false;
            t_radiocheck["t_radi1"] = true;
            t_radiocheck["t_radi2"] = false;
        }
        else{
            t_radiocheck["t_radi0"] = false;
            t_radiocheck["t_radi1"] = false;
            t_radiocheck["t_radi2"] = true;
        }
       
        //console.log(event.target.value);
        testinfo["status"] = event.target.value;
        this.setState({ testinfo:testinfo, t_radiocheck:t_radiocheck });        
    }

	handleClose() {
        this.setState({ show: false });
        this.props.onClose(this.state.testinfo);
    }
    
    handleClose_noVal(){
        let {show, testinfo} = this.state;
        show = false;
        testinfo["date"] = this.today_date;
        testinfo["status"] = "";
        this.setState({ show: show, testinfo:testinfo });
        this.props.onClose({date: "", status:""});
    }

	handleShow() {
        
        

		this.setState({ show: true });
    }
    
    calendar_onChange(e){
        e.persist();
        let {testinfo} = this.state;
        testinfo["date"] = e.target.value;
        this.setState({ testinfo:testinfo });

        //console.log(e.target.value);
    }

	render() {
        
        let {t_radiocheck} = this.state;
       
        if(this.props.new){
            //window.location.reload(false);

            return (
                <>
                    <Modal show={this.props.open} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>COVID19 Testing Inoformation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Please enter the date you received the test and your testing result. 
                            <TestformWrapper>
                                <TestFormItem>
                                    <h3>1. Test Date</h3>
                                    
                                    <input type="date" id="start" name="trip-start"
                                        defaultValue={this.today_date}
                                        min="2020-01-01" 
                                        max={this.today_date}
                                        onChange={this.calendar_onChange}>                                       
                                    </input>

                                </TestFormItem>

                                <TestFormItem>
                                    <h3>2. Test Result</h3>
                                    <label><input type="radio" value="w" name="test" checked={t_radiocheck.t_radi0} onChange={this._t_radioOnClick} />Waiting Result</label> 
                                    <label><input type="radio" value="p" name="test" checked={t_radiocheck.t_radi1} onChange={this._t_radioOnClick}/>Positive</label> 
                                    <label><input type="radio" value="n" name="test" checked={t_radiocheck.t_radi2} onChange={this._t_radioOnClick}/>Negative</label> 

                                </TestFormItem>                    
                            </TestformWrapper>
                            


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose_noVal}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            );

        } 
        else{          
            return (
                <>
                    <Modal show={this.props.open} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>COVID19 Testing Inoformation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Please enter the date you received the test and your testing result. 
                            <TestformWrapper>
                                <TestFormItem>
                                    <h3>Test Date</h3>
                                    
                                    <input type="date" id="start" name="trip-start"
                                        defaultValue={this.state.testinfo.date}
                                        min="2020-01-01" 
                                        max="2030-12-31"
                                        onChange={this.calendar_onChange}>                                       
                                    </input>

                                </TestFormItem>

                                <TestFormItem>
                                    <h3>Test Result</h3>

                                </TestFormItem>                    
                            </TestformWrapper>
                            


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose_noVal}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
	}
}

//export default () => (<div><TestModal /></div>)