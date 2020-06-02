import React, {Component} from 'react';
import good from './img/good.png';
import alert from './img/alert.png';
import watch from './img/watch.png';

//https://www.folio3.com/mobile/blog/how-to-make-use-of-html-5-canvas-with-react/
//https://reactjs.org/docs/refs-and-the-dom.html

export default class Canvas extends Component{

    componentDidMount(){
        
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        //const img = this.props.imageToShow;
        const img = this.refs.imag;
        img.onload = () => {          
            ctx.drawImage(img, 0, 0);
            ctx.font = "40px Courier";
            ctx.fillStyle = "white";
            ctx.fillText(this.props.badge_id, 10, 50);

            ctx.font = "bold 40px Times New Roman";
            ctx.fillStyle = "black";    
            ctx.fillText(this.props.time, 10, 390); 
            
            ctx.font = "italic 28px Courier";
            ctx.fillStyle = "white";            
            ctx.fillText("Nan Ya Plastics SC", 10, 440);  
                 
        }

    }

    render(){
        const {badge_id, pass_cat} = this.props;
        

        if(pass_cat === "normal"){
           return(
               <div>
                   <h1>Certificate</h1>
                   <img style={{display:"none"}} ref="imag" src={good} />
                   <canvas id="mirror" ref="canvas" width={370} height={468} />
               </div>
            
           )
        }
        else if(pass_cat === "watch"){
            return(
                <div>
                    <h1>Certificate</h1>
                    <img style={{display:"none"}} ref="imag" src={watch} />
                   <canvas id="mirror" ref="canvas" width={370} height={468} />
                </div>               
            );
        }
        else{
            return(
                <div>
                    <h1>Certificate</h1>
                    <img style={{display:"none"}} ref="imag" src={alert} />
                   <canvas id="mirror" ref="canvas" width={370} height={468} />
                </div>                
            );
        }

    }
    

}