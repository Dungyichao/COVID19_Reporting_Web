
import React, {Component} from 'react';
import {MenuWrapper, Menubotton} from './theme';

export default class Menu extends Component{

    constructor(props){

        super(props);
        this.changeBackground_over = this.changeBackground_over.bind(this);
        this.changeBackground_out = this.changeBackground_out.bind(this);
        this.onClickChange = this.onClickChange.bind(this);      
    }

    changeBackground_over(e) {
        e.target.style.background = "#abb8c3";
    }

    changeBackground_out(e) {
        e.target.style.background = "#0378bb";
    }

    onClickChange(event){
        //event.preventDefault(); 
        event.persist();        
        this.props.onChange(event);

        //https://stackoverflow.com/questions/40795906/onchange-event-for-react-child-component-to-update-state

    }

    render(){

    

        return(
            <MenuWrapper>
                <Menubotton name="0" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange} >Overview</Menubotton>
                <Menubotton name="1" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange}>Symptom</Menubotton>
                <Menubotton name="2" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange}>Travel</Menubotton>
                <Menubotton name="3" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange}>Temperature</Menubotton>
                <Menubotton name="4" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange}>Contacted</Menubotton> 
                <Menubotton name="5" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange}>Peronal History</Menubotton> 
                <Menubotton name="6" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange}>Test Alert</Menubotton> 
                <Menubotton name="7" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange}>Test History</Menubotton> 
                <Menubotton name="8" onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} onClick={this.onClickChange} style={{display: "none"}}>Test Page</Menubotton>                                                                         
            </MenuWrapper>
            
        );
    }
    


}

//export default Menu;

