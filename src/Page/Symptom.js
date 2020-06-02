import React, {Component} from 'react';
import {TitleBarItem, TitleBarWrapper} from '../theme';
import PeopleList from './PeopleList';



export default class Symptom extends Component{

    constructor(props){
        super(props);

        this.db = props.db;

        this.state = {

            data2: []
        };

        this.GetPrintData = this.GetPrintData.bind(this);
    }

    
    componentDidMount(){
        let log_time = new Date();
        const key = log_time.getFullYear().toString() + (log_time.getMonth() + 1).toString().padStart(2, '0') + log_time.getDate().toString().padStart(2, '0');
        //console.log("Component did mount", key);

        //https://sebhastian.com/react-firestore

 

        //get all docs matching the query
        this.db.db.collection("Form").doc(key).collection("Alert").where("symptom", ">", []).get().then(querySnapshot => {
            //console.log(querySnapshot);
            const data = querySnapshot.docs.map(doc => doc.data());
            //console.log(data); // array of cities objects
            this.setState({data2: [data]})
        });

    }
    

    UNSAFE_componentWillReceiveProps(e){

        //console.log("Symptom search date: ", e.searchdate);
        if(e.searchdate){
            var match = e.searchdate.split("-");
            var datesearch = match[0]+match[1]+match[2];
            this.db.db.collection("Form").doc(datesearch).collection("Alert").where("symptom", ">", []).get().then(querySnapshot => {
                //console.log(querySnapshot);
                const data = querySnapshot.docs.map(doc => doc.data());
                //console.log(data); // array of cities objects
                this.setState({data2: [data]})
            });
            
        }

    }

    GetPrintData(e){
        //console.log("Symptom--GetPrintData", e);
        this.props.func(e);

    }

    
   


    render(){
        if(this.state.data2.length > 0 || true){
            //console.log("this.state.data2: ", this.state.data2);
            return(
                <div>                   
                    <PeopleList people={this.state.data2} func={this.GetPrintData} />
                </div>                   
            );
        }
        else{
            //console.log("Here");
            return null;
        }
    }
    


}