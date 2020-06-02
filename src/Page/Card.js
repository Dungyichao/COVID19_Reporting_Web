import React, {Component} from 'react';
import {PersonWrapper, PersonItem} from '../theme';


export default class Card extends Component{

    /*
    constructor(props){
        super(props);
        
    }
    */


    render(){
        const {id, contacted, symptom, temperature, travel, datee, time, test} = this.props;

        return (
            <PersonWrapper>
                <PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{id}</PersonItem>
                <PersonItem style={{flex: "2 1 10px", overflow: "hidden"}}>{temperature}</PersonItem>
                <PersonItem style={{flex: "2 1 10px", overflow: "hidden"}}>{symptom}</PersonItem>
                <PersonItem style={{flex: "2 1 10px", overflow: "hidden"}}>{contacted}</PersonItem>
                <PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{travel}</PersonItem> 
                <PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{test}</PersonItem>              
                {/*<PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{time}</PersonItem>   */}
                <PersonItem style={{flex: "1 1 10px", overflow: "hidden"}}>{`${datee} \n ${time}`}</PersonItem>             
            </PersonWrapper>                   
            
        );

    }

}