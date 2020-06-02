import React, {Component} from 'react';
import {PersonWrapper, PersonItem} from '../theme';


export default class CardTest extends Component{


    render(){
        const {id, status, testdate, datee, time} = this.props;

        return (
            <PersonWrapper>
                <PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{id}</PersonItem>
                <PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{status}</PersonItem>
                <PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{testdate}</PersonItem>
                <PersonItem style={{flex: "2 1 10px", overflow: "hidden"}}>{`${datee} \n ${time}`}</PersonItem>             
            </PersonWrapper>                   
            
        );

    }

}



/*

return(<CardTest 
                    key={idx} 
                    id={person.id} 
                    status={person.status} 
                    testdate={person.testdate}                    
                    time={new Date(person.time.seconds * 1000).toLocaleTimeString("en-US")}  
                    datee={new Date(person.time.seconds * 1000).toDateString()}                
                    />);


*/