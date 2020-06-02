import React, {Component} from 'react';
import {SummaryWrapper, SummaryinfoWrapper, SummaryTitleWrapper, SummaryValueWrapper} from '../theme';


export default class Overcard extends Component{

    
    constructor(props){
        super(props);

        this.changeBackground_over = this.changeBackground_over.bind(this);
        this.changeBackground_out = this.changeBackground_out.bind(this);
        
    }
    

   changeBackground_over(e) {
        e.persist();
        if(e.target.id === "allwrap"){
            e.target.style.background = "#37A4E2"; //07CC14   //74CE0C
        }
        //console.log(e)
    }

    changeBackground_out(e) {
        e.persist();
        if(e.target.id === "allwrap"){
            e.target.style.background = "#3AA2C3";
        }
    }


    render(){
        const {title, suminfo, subinfo, imgsrc} = this.props;

        //console.log(imgsrc);
        return (
            <SummaryWrapper onMouseOver={this.changeBackground_over} onMouseOut ={this.changeBackground_out} id={"allwrap"}>  
                <img src={imgsrc} alt="image" width="100" height="50" style={{flex:4}} />
                <SummaryinfoWrapper style={{flex:3}} >
                    <SummaryTitleWrapper>{title}</SummaryTitleWrapper>
                    <SummaryValueWrapper>{suminfo}</SummaryValueWrapper>
                    <SummaryValueWrapper>{subinfo}</SummaryValueWrapper>    
                </SummaryinfoWrapper>
                          
            </SummaryWrapper>                   
            
        );

    }

}