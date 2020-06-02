import React, {Component} from 'react';
import CardTest from './CardTest';

let obj = [];

export default class TestList extends Component{
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

    render(){
        const {data} = this.state;
        let people = data;

        obj = [];
        let robocomponent1 = [];
        if(people[0]){
            
            robocomponent1 = people[0].map(        
                (person, idx) => {
                    let submit_time = new Date(person.time.seconds * 1000).toLocaleTimeString("en-US");
                    let submit_date = new Date(person.time.seconds * 1000).toDateString();
                    obj.push({
                        key:idx, 
                        id:person.id, 
                        status:person.status, 
                        testdate:person.testdate,
                        time:submit_time,  
                        date: submit_date                       
                    })

                    return(<CardTest 
                        key={idx} 
                        id={person.id} 
                        status={person.status} 
                        testdate={person.testdate}                    
                        time={submit_time}  
                        datee={submit_date}                
                        />);
                }
            );
            this.props.func(obj);
        }

        return (
            <div>
                {robocomponent1}
            </div>
        );
    }
}

/*
const TestList = ({people}) => {
    let robocomponent1 = [];
    if(people[0]){
         robocomponent1 = people[0].map(        
            (person, idx) => {

                return(<CardTest 
                    key={idx} 
                    id={person.id} 
                    status={person.status} 
                    testdate={person.testdate}                    
                    time={new Date(person.time.seconds * 1000).toLocaleTimeString("en-US")}  
                    datee={new Date(person.time.seconds * 1000).toDateString()}                
                    />);
            }
        );

    }

    return (
        <div>
            {robocomponent1}
        </div>
    );
}

export default TestList;
*/
//id, contacted, symptom, temperature, travel, time