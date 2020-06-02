import React, {Component} from 'react';
import {ConsoleinfoWrapper} from './theme';
import Firetest from './Page/firetest';
import Symptom from './Page/Symptom';
import Contacted from './Page/Contacted';
import Temperature from './Page/Temperature';
import Travel from './Page/Travel';
import Perhistory from './Page/Perhistory';
import Overview from './Page/Overview';
import TestAlert from './Page/TestAlert';
import TestHistory from './Page/TestHistory';



export default class Consoleinfo extends Component{

    constructor(props){
        super(props);

        this.db = props.db;
        this.handler = this.handler.bind(this);
        this.GetPrintData = this.GetPrintData.bind(this);
    }

    handler() {
        this.props.action();
    }

    GetPrintData(e){
        //console.log("Consoleinfo--GetPrintData", e);
        this.props.func(e);
    }


    render(){

        let showpage = this.props.showp;
        let searchID = this.props.search;
        let searchTest = this.props.test;
        let searchDate = this.props.searchdate;

        return(
            <ConsoleinfoWrapper>
                
                {showpage === '0' ? <Overview db={this.db} /> : null}
                {showpage === '1' ? <Symptom db={this.db} searchdate={searchDate} func={this.GetPrintData} /> : null}
                {showpage === '2' ? <Travel db={this.db} searchdate={searchDate} func={this.GetPrintData} /> : null}
                {showpage === '3' ? <Temperature db={this.db} searchdate={searchDate} func={this.GetPrintData} /> : null}
                {showpage === '4' ? <Contacted db={this.db} searchdate={searchDate} func={this.GetPrintData} /> : null}
                {showpage === '5' ? <Perhistory db={this.db} lookup={searchID} action={this.handler} func={this.GetPrintData} /> : null}
                {showpage === '6' ? <TestAlert db={this.db} searchdate={searchDate} func={this.GetPrintData} /> : null}
                {showpage === '7' ? <TestHistory db={this.db} search={searchTest} action={this.handler} func={this.GetPrintData}/> : null}
                {showpage === '8' ? <Firetest db={this.db} /> : null}
            </ConsoleinfoWrapper>
            
        );
    }
    


}



