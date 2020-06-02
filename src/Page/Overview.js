import React, {Component} from 'react';
import Overcard from './Overcard';
import {SumCardWrapper, SumCardsWrapper} from '../theme';
import pen from '../img/pen.png';
import airplane from '../img/airplane.png';
import cough from '../img/cough.png';
import hug from '../img/hug.png';
import temperatureico from '../img/temperatureico.png';
import tube from '../img/tube.png';
import gene from '../img/gene.png';

export default class Overview extends Component{

    constructor(props){
        super(props);

        this.db = props.db;

        this.state = {
            Alert_count: "error",
            Normal_count: "error",
            Temperature_count: "error",
            Symptom_count: "error",
            Travel_count: "error",
            Contact_count: "error",
            a_test_wait: "error",
            a_test_pos: "error",
            a_test_neg: "error",
            test_wait: "error",
            test_pos: "error",
            test_neg: "error",
            data2: []
        };

        
    }

    //https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
    removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    componentDidMount(){
        let log_time = new Date();
        const key = log_time.getFullYear().toString() + (log_time.getMonth() + 1).toString().padStart(2, '0') + (log_time.getDate()).toString().padStart(2, '0');

        let Temperature_count = 0, Symptom_count = 0, Travel_count = 0, Contact_count = 0, a_test_wait = 0, a_test_pos = 0, a_test_neg = 0, test_wait = 0, test_pos = 0, test_neg = 0;

        //https://sebhastian.com/react-firestore
        
        //get all docs matching the query
        this.db.db.collection("Form").doc(key).collection("Alert").orderBy('test').get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());  
            var test_list1 = [];         
            for(let i = 0; i < data.length; i++){
                let userid = data[i].id;
                if(data[i].test !== ""){
                    if(!test_list1.includes(userid) || true){
                        test_list1.push(userid);
                        if(data[i].test === "positive"){
                            test_pos++;
                        }
                        else if(data[i].test === "negative"){
                            test_neg++;
                        }
                        else if(data[i].test === "waiting"){
                            test_wait++;
                        }

                    }
                }



                if(data[i].symptom.length > 0){
                    Symptom_count++;
                }
                if(data[i].travel !== ""){
                    Travel_count++;
                }
                if(data[i].temperature > 99.5){
                    Temperature_count++;
                }
                if(data[i].contacted.length > 0){
                    Contact_count++;
                }
                
            }            
            this.setState({Alert_count: data.length, 
                Symptom_count: Symptom_count, 
                Travel_count: Travel_count, 
                Temperature_count: Temperature_count, 
                Contact_count: Contact_count, 
                test_pos: test_pos, 
                test_neg: test_neg, 
                test_wait: test_wait});
            //console.log(test_list1);
        });

        this.db.db.collection("Form").doc(key).collection("Normal").get().then(querySnapshot => {
            this.setState({Normal_count: querySnapshot.docs.length});
        });

        
        this.db.db.collectionGroup("person").get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data()); 
            var test_list_p = [];
            var test_list_n = [];
            var test_list_w = [];
            for(let i = 0; i < data.length; i++){
                let userid = data[i].id;
                if(data[i].status === "positive"){
                    if(!test_list_p.includes(userid)){
                        test_list_p.push(userid);
                        //this.removeA(test_list_n, userid);
                        //this.removeA(test_list_w, userid);
                        var index = test_list_n.indexOf(userid);
                        if (index !== -1) test_list_n.splice(index, 1);
                        var index1 = test_list_w.indexOf(userid);
                        if (index1 !== -1) test_list_w.splice(index1, 1);
                        //https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
                    }
                }
                else if(data[i].status === "negative"){
                    if(!test_list_p.includes(userid) && !test_list_n.includes(userid)){
                        test_list_n.push(userid);
                        //this.removeA(test_list_w, userid);
                        var index1 = test_list_w.indexOf(userid);
                        if (index1 !== -1) test_list_w.splice(index1, 1);
                    }

                }
                else if(data[i].status === "waiting"){
                    if(!test_list_w.includes(userid)){
                        test_list_w.push(userid);
                    }

                }
          
            }            
            this.setState({a_test_pos: test_list_p.length, a_test_neg: test_list_n.length, a_test_wait: test_list_w.length});

            //console.log("a_test_pos", test_list_p, "a_test_neg", test_list_n, "a_test_wait", test_list_w);
        });
        

        

        /*

        this.db.db.collection("Form").doc(key).collection("Alert").where("symptom", ">", []).get().then(querySnapshot => {
            this.setState({Symptom_count: querySnapshot.docs.length});
        });

        this.db.db.collection("Form").doc(key).collection("Alert").where("travel", ">", "").get().then(querySnapshot => {
            this.setState({Travel_count: querySnapshot.docs.length});
        });

        this.db.db.collection("Form").doc(key).collection("Alert").where("temperature", ">", 99.5).get().then(querySnapshot => {
            this.setState({Temperature_count: querySnapshot.docs.length});
        });

        this.db.db.collection("Form").doc(key).collection("Alert").where("contacted", ">", []).get().then(querySnapshot => {
            this.setState({Contact_count: querySnapshot.docs.length});
        });
        */
        
    }

    

  


    render(){

        let log_time = new Date();
        //let suminfostring = `Normal: ${this.state.Normal_count}`;
        return(
        <div>
            <h1 style={{margin:"5px 10px 15px 0", color:"#549EEF"}}>{log_time.toLocaleDateString()}</h1>
            
            <SumCardsWrapper style={{textAlign: "center"}}>
                
                <SumCardWrapper>
                    <Overcard imgsrc={pen} title="Survey" suminfo={`Normal: ${this.state.Normal_count}`} subinfo={`Alert: ${this.state.Alert_count}`} />
                </SumCardWrapper>

            </SumCardsWrapper>

            <div style={{borderBottom: "2px solid #9DC6FD", margin: "5px 40px"}}></div>

            <SumCardsWrapper style={{textAlign: "center"}}>
                <SumCardWrapper>
                    <Overcard imgsrc={cough} title="Symptom Alert" suminfo={this.state.Symptom_count} />
                </SumCardWrapper>
                <SumCardWrapper>
                    <Overcard imgsrc={airplane} title="Travel Alert" suminfo={this.state.Travel_count} />
                </SumCardWrapper>
                <SumCardWrapper>
                    <Overcard imgsrc={temperatureico} title="Temperature Alert" suminfo={this.state.Temperature_count} />
                </SumCardWrapper>                              
                <SumCardWrapper>
                    <Overcard imgsrc={hug} title="Contacted Alert" suminfo={this.state.Contact_count} />
                </SumCardWrapper>                
            </SumCardsWrapper>

            <SumCardsWrapper>
                <SumCardWrapper style={{textAlign: "center"}}>
                    <Overcard imgsrc={gene} title="Testing Alert" suminfo={`Positive: ${this.state.test_pos}`} subinfo={`N: ${this.state.test_neg} / W: ${this.state.test_wait}`} />
                </SumCardWrapper>
                <SumCardWrapper style={{textAlign: "center"}}>
                    <Overcard imgsrc={tube} title="Accumulate Test" suminfo={`Positive: ${this.state.a_test_pos}`} subinfo={`N: ${this.state.a_test_neg} / W: ${this.state.a_test_wait}`} />
                </SumCardWrapper>            
            </SumCardsWrapper>
 
            {/*<PeopleList people={this.state.data2} />*/}
        </div>
            
            
        );
    }
    


}