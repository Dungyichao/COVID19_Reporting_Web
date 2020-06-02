import React, {Component} from 'react';
//import {ConsoleinfoWrapper} from '../theme';

export default class Firetest extends Component{

    constructor(props){
        super(props);

        this.db = props.db;

        this.state = {
            data: [],
            data1: [],
            data2: []
        };
    }

    componentDidMount(){
        

        //https://sebhastian.com/react-firestore

        let log_time = new Date();
        const key = log_time.getFullYear().toString() + (log_time.getMonth() + 1).toString().padStart(2, '0') + log_time.getDate().toString();

        //https://sebhastian.com/react-firestore

        // get the whole collection
        this.db.db.collection("Form").doc(key).collection("Alert").get().then(querySnapshot => {
            //console.log(querySnapshot);
            const data = querySnapshot.docs.map(doc => doc.data());
            //console.log(data);
            //console.log(data.length); // array of cities objects
            this.setState({data: [data]})
        });

        //get the single doc from the collection
        this.db.db.collection("Form").doc(key).get().then(doc => {
            //console.log(doc);
            const data = doc.data();
            //console.log(data);
            //console.log(data.length); // array of cities objects
            this.setState({data1: [data]})
        });

        //get all docs matching the query
        this.db.db.collection("Form").doc(key).collection("Alert").where("temperature", ">", 99.5).get().then(querySnapshot => {
            //console.log(querySnapshot);
            const data = querySnapshot.docs.map(doc => doc.data());
            //console.log(data); // array of cities objects
            this.setState({data2: [data]})
        });


    }


    render(){
        

        let dataUI = this.state.data ? <pre>{JSON.stringify(this.state.data)}</pre> : <h1>No Data</h1>;
        let dataUI1 = this.state.data1 ? <pre>{JSON.stringify(this.state.data1)}</pre> : <h1>No Data</h1>;
        let dataUI2 = this.state.data2 ? <pre>{JSON.stringify(this.state.data2)}</pre> : <h1>No Data</h1>;

        return(
        <div>
            <div>
                {dataUI}
            </div>
            <div>
                {dataUI1}
            </div>
            <div>
                {dataUI2}
            </div>
        </div>
            
            
        );
    }
    


}