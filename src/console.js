import React, {Component} from 'react';
import {ConsoleWrapper, ConsoleinfoWrapper, TitleBarItem, TitleBarWrapper, SearchItem, FormSubmit, SearchInput, SearchForm} from './theme';

import Menu from './menu';
import Consoleinfo from './consoleinfo';
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';

import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import {Table, Table1} from './Topdf';

import {Button } from 'react-bootstrap';

export default class Console extends Component{

    
    constructor(props){

        super(props);

        const today_date = new Date();
        const date_string = `${today_date.getFullYear().toString()}-${(today_date.getMonth() + 1).toString().padStart(2, '0')}-${today_date.getDate().toString().padStart(2, '0')}`;
        this.today_date = date_string;

        console.log(date_string);
        this.state = {
            page: '0',
            user: {
                badgeid: ""

            },
            searchid: "",
            searchtest: "",
            searchdate: this.today_date,
            canprint: false,
            canprinttest: false,
            printdata: [],
            printdatatest: [],
            reporttitle:{
                '1': "Symptom Alert",
                '2': "Travel Alert",
                '3': "Temperature Alert",
                '4': "Contacted Alert",
                '5': "Personal History",
                '6': "Test Alert",
                '7': "Test History",
            }
            
            
        };

        this.printdata = [];
        this.db = props.db;

        this.menubott_onchange = this.menubott_onchange.bind(this);
        this._inputfieldOnChange = this._inputfieldOnChange.bind(this);
        this._searchData = this._searchData.bind(this);
        this._searchTestData = this._searchTestData.bind(this);
        this.handler = this.handler.bind(this);
        this.calendar_onChange = this.calendar_onChange.bind(this);
        this.GetPrintData = this.GetPrintData.bind(this);    
        this.updatePrintData = this.updatePrintData.bind(this); 
         
    }

    menubott_onchange(event){      
        this.setState({searchdate: this.today_date});
        this.setState({page: event.target.name, canprint: false, canprinttest: false, printdata:[], printdatatest:[]});
        this.printdata = [];
    }

    GetPrintData(e){
        //console.log("Console--GetPrintData", e);
        this.printdata = e;
    }

    

    _inputfieldOnChange(event){
        event.persist();
        let {user} = this.state;
        user[event.target.name] = event.target.value;
        this.setState({user: user});
    }

    _searchData(event){
        event.preventDefault(); 
        let {user} = this.state;
        if(user.badgeid.trim() !== ""){
            this.setState({searchid: user.badgeid, canprint: false});          
        }
    }

    _searchTestData(event){
        event.preventDefault(); 
        //console.log(event.target.value);
        this.setState({searchtest: event.target.value, printdatatest:[], canprinttest: false});
    }

    handler(){
        this.setState({searchid: ""});
    }

    calendar_onChange(e){
        e.persist();
        console.log(e.target.value);
        this.setState({searchdate: e.target.value, canprint: false});
    }


    updatePrintData(e){
        //console.log("Print");
        //console.log("this.state.printdata", this.state.printdata);
        //console.log("this.state.printdatatest", this.state.printdatatest);
        if(e.target.id === "1"){
            this.setState({printdata: this.printdata, canprint: true});
        }
        else if(e.target.id === "7"){
            //console.log("this.printdata: ", this.printdata);
            this.setState({printdatatest: this.printdata, canprinttest: true});
        }
        

    }

    render(){

        let {page, searchid, searchtest, searchdate} = this.state;

        
        return(
            <ConsoleWrapper >

                <Menu onChange={this.menubott_onchange} />
                <ConsoleinfoWrapper>
                        {this.state.page === '0' ? <div>Overview</div> : null}
                        {this.state.page === '1' ? <div>Symptom Alert</div> : null}
                        {this.state.page === '2' ? <div>Travel Alert</div> : null}
                        {this.state.page === '3' ? <div>Temperature Alert</div> : null}
                        {this.state.page === '4' ? <div>Contacted Alert</div> : null}
                        {this.state.page === '5' ? <div>Personal History</div> : null}
                        {this.state.page === '6' ? <div>Test Alert</div> : null}
                        {this.state.page === '7' ? <div>Test History</div> : null}
                        {this.state.page === '8' ? <div>Testing FireStore</div> : null}


                        {(this.state.page !== '0' && this.state.page !== '7') ?
                            <Button id="1" variant="info" style={{width:"100px"}} onClick={this.updatePrintData}>Print</Button>
                        : null}
                         {this.state.canprint ? 
                            <PDFDownloadLink document={<Table data={this.state.printdata} style_function={style_fun} style={{}} header={`${this.state.reporttitle[this.state.page]} Report on  ${this.state.searchdate}`} />} fileName="somename.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Document')}
                            </PDFDownloadLink> 
                        : null}

                        {(this.state.page === '7') ?
                            <Button id="7" variant="info" style={{width:"100px"}} onClick={this.updatePrintData}>Print</Button>
                        : null}
                         {this.state.canprinttest ? 
                            <PDFDownloadLink document={<Table1 data={this.state.printdatatest} style_function={style_fun} style={{}} header={"Test History Report"} />} fileName="somename.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Document')}
                            </PDFDownloadLink> 
                        : null}



                        {this.state.page === '5' ?  
                        <SearchForm onSubmit={this._searchData}>
                            <SearchItem>
                                <SearchInput type={"number"} placeholder={'6 digits id'} min="200000" max="300000" name={"badgeid"} value={this.state.user.badgeid} onChange={this._inputfieldOnChange} />
                                <FormSubmit type={'submit'} size="lg" style={{height:'30px'}} >Search</FormSubmit>                                                      
                            </SearchItem>
                        </SearchForm>
                        : null}

                        {(this.state.page !== '0' && this.state.page !== '5' && this.state.page !== '7' && this.state.page !== '8') ?
                             calend({today_date:this.today_date, search:this.state.searchdate, calendar_onChange: this.calendar_onChange})
                        : null}

                        


                        {(this.state.page !== '0' && this.state.page !== '7') ?
                            <TitleBarWrapper>
                                <TitleBarItem style={{flex: "1 1 10px", overflow: "hidden"}}>Badge ID</TitleBarItem>
                                <TitleBarItem style={{flex: "2 1 10px", overflow: "hidden"}}>Temperature</TitleBarItem>
                                <TitleBarItem style={{flex: "2 1 10px", overflow: "hidden"}}>Symptom</TitleBarItem>
                                <TitleBarItem style={{flex: "2 1 10px", overflow: "hidden"}}>Contact</TitleBarItem>
                                <TitleBarItem style={{flex: "1 1 10px", overflow: "hidden"}}>Travel</TitleBarItem>
                                <TitleBarItem style={{flex: "1 1 10px", overflow: "hidden"}}>Test</TitleBarItem>
                                <TitleBarItem style={{flex: "1 1 10px", overflow: "hidden"}}>Date</TitleBarItem>
                            </TitleBarWrapper>
                        : null}

                        {this.state.page === '7' ?
                         <SearchForm onChange={this._searchTestData}>
                             <h3>Search Test Result</h3>
                            <SearchItem>
                                <select id="cars" name="cars">
                                    <option value="all">All</option>
                                    <option value="pos">Positive</option>
                                    <option value="neg">Negative</option>
                                    <option value="wait">Waiting</option>
                                </select>                                                     
                            </SearchItem>
                            <TitleBarWrapper>
                                <TitleBarItem style={{flex: "1 1 10px", overflow: "hidden"}}>Badge ID</TitleBarItem>
                                <TitleBarItem style={{flex: "1 1 10px", overflow: "hidden"}}>Result</TitleBarItem>
                                <TitleBarItem style={{flex: "1 1 10px", overflow: "hidden"}}>Test Date</TitleBarItem>
                                <TitleBarItem style={{flex: "2 1 10px", overflow: "hidden"}}>Date</TitleBarItem>
                            </TitleBarWrapper>
                        </SearchForm> 
                         : null}

                            
                    <Scroll>
                        
                        <ErrorBoundary>
                            
                            <Consoleinfo db={this.db} showp={page} search={searchid} test={searchtest} searchdate={searchdate} action={this.handler} func={this.GetPrintData} />
   
                        </ErrorBoundary>
                        
                    </Scroll>

                </ConsoleinfoWrapper>
                
            </ConsoleWrapper>
            

        );
    }


}

const calend = (props) => {
    //console.log(props)
    return(
        <input type="date" id="findate" name="searchdate"                            
            min="2020-01-01" 
            max={props.today_date}
            value={props.search}
            onChange={props.calendar_onChange}
            style={{width:"150px", margin:"5px 0px 10px 0px"}}>                                       
        </input>
    )
        
}

const cell_style = (row_index, col_index) => {
    const borderLeftWidth = (col_index === 0) ? 1 : 0
    const borderTopWidth = (row_index === 0) ? 1 : 0
    const borderRightWidth = 1
    const borderBottomWidth = 1

    return {
        width: '33%',
        borderLeftWidth, borderRightWidth,
        borderTopWidth, borderBottomWidth,
        borderStyle: "solid",
    }
}


const style_fun = (row_index, col_index) => {


}

