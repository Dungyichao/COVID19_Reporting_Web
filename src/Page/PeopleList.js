import React, {Component} from 'react';
import Card from './Card';

import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import {Table} from '../Topdf';
import { NoneLabel } from '../theme';

let obj = [];


export default class PeopleList extends Component{

    constructor(props){
        super();

        this.db = props.db;

        this.state = {

            data: [],
            
        };
    }

    UNSAFE_componentWillReceiveProps(e){
        this.setState({data: e.people})
    }

    //data: props.people.length === 0 ? [] : props.people
    render(){

        const {data} = this.state;
        let people = data;
        obj = [];

        let robocomponent1 = [];

        //console.log("0");
        let submit_date = "";
        //console.log(people);
        if(people.length !== 0){
            //console.log("1");
            if(people[0].length !== 0){
                //console.log(people[0][0]["time"]["seconds"]);
                submit_date = new Date(people[0][0]["time"]["seconds"] * 1000).toDateString();
                //submit_date = "20200530";
                robocomponent1 = people[0].map(        
                    (person, idx) => {
                        //console.log("Try to render");
                        let symptomString = "";
                        let contactString = "";
                        let testString = "";
                        let submit_time = new Date(person.time.seconds * 1000).toLocaleTimeString("en-US");                
                        if(person.symptom.length > 0){
                            person.symptom.map((value, idx) => {
                                switch(value){
                                    case 'cough':
                                        value = "Cough";
                                        break;
                                    case 'breath':
                                        value = "Short of breath";
                                        break;
                                    case 'chills':
                                        value = "Chills";
                                        break;
                                    case 'chest':
                                        value = "Chest Pain";
                                        break;
                                    case 'muscle':
                                        value = "Muscle Pain";
                                        break;
                                    case 'head':
                                        value = "Headache";
                                        break;
                                    case 'sore':
                                        value = "Sore throat";
                                        break;
                                    case 'taste':
                                        value = "Lost of taste";
                                        break;
                                }
                                symptomString = symptomString + value + ", \n";
                            })
                        }

                        if(person.contacted.length > 0){
                            person.contacted.map((value, idx) => {
                                contactString = contactString + value + ", \n";
                            })
                        }

                        if(person.test !== ""){
                            switch(person.test){
                                case 'negative':
                                    testString = "N";
                                    break;
                                case 'positive':
                                    testString = "P";
                                    break;
                                case 'waiting':
                                    testString = "W";
                                    break;                            
                            }
                        }

                        obj.push({
                            key:idx, 
                            id:person.id, 
                            contacted:contactString, 
                            symptom:symptomString,
                            temperature:person.temperature,
                            travel:person.travel,
                            test:testString,
                            time:submit_time,  
                            date: submit_date
                            
                        })
                
                        return(<Card 
                            key={idx} 
                            id={person.id} 
                            contacted={contactString} 
                            symptom={symptomString}
                            temperature={person.temperature}
                            travel={person.travel}
                            test = {testString}
                            time={submit_time}  
                            datee={submit_date}                
                            />);
                    }
                );

                this.props.func(obj);

            }
        }
     
        
        //this.props.func(obj);
      
        return (
            <div>                
                {robocomponent1}
            </div>
        );
        


    }


}


/*
const PeopleList = ({people}) => {
    obj = [];

    let robocomponent1 = [];

    let submit_date = "";
    if(people.length !== 0){
        if(people[0].length !== 0){
            //console.log(people[0][0]["time"]["seconds"]);
            submit_date = new Date(people[0][0]["time"]["seconds"] * 1000).toDateString();
            //submit_date = "20200530";
            robocomponent1 = people[0].map(        
                (person, idx) => {
                    let symptomString = "";
                    let contactString = "";
                    let testString = "";
                    let submit_time = new Date(person.time.seconds * 1000).toLocaleTimeString("en-US");                
                    if(person.symptom.length > 0){
                        person.symptom.map((value, idx) => {
                            switch(value){
                                case 'cought':
                                    value = "Cought";
                                    break;
                                case 'breath':
                                    value = "Short of breath";
                                    break;
                                case 'chills':
                                    value = "Chills";
                                    break;
                                case 'chest':
                                    value = "Chest Pain";
                                    break;
                                case 'muscle':
                                    value = "Muscle Pain";
                                    break;
                                case 'head':
                                    value = "Headache";
                                    break;
                                case 'sore':
                                    value = "Sore throat";
                                    break;
                                case 'taste':
                                    value = "Lost of taste";
                                    break;
                            }
                            symptomString = symptomString + value + ", \n";
                        })
                    }

                    if(person.contacted.length > 0){
                        person.contacted.map((value, idx) => {
                            contactString = contactString + value + ", \n";
                        })
                    }

                    if(person.test !== ""){
                        switch(person.test){
                            case 'negative':
                                testString = "N";
                                break;
                            case 'positive':
                                testString = "P";
                                break;
                            case 'waiting':
                                testString = "W";
                                break;                            
                        }
                    }

                    obj.push({
                        key:idx, 
                        id:person.id, 
                        contacted:contactString, 
                        symptom:symptomString,
                        temperature:person.temperature,
                        travel:person.travel,
                        test:testString,
                        time:submit_time,  
                        date: submit_date
                        
                    })
            
                    return(<Card 
                        key={idx} 
                        id={person.id} 
                        contacted={contactString} 
                        symptom={symptomString}
                        temperature={person.temperature}
                        travel={person.travel}
                        test = {testString}
                        time={submit_time}  
                        datee={submit_date}                
                        />);
                }
            );

        }
    }

   //console.log(robocomponent1);
   
   
    return (
        <div>
            {false ? 
                <PDFDownloadLink document={<Table data={obj} style_function={style_fun} style={cell_style} header={`Report on  ${submit_date}`} />} fileName="somename.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Print Document')}
                </PDFDownloadLink>
            : null}
            {robocomponent1}
        </div>
    );
}

export default PeopleList;
*/

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
        display: "none",
    }
}

const style_fun = (row_index, col_index) => {


}

//id, contacted, symptom, temperature, travel, time