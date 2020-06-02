import React, {Component} from 'react';
import {DailyformWrapper, Form, FormItem, FormLabel, FormInput, FormAction, FormSubmit, FormSuccessMessage, FormErrorMessage, NoneLabel} from './theme';
import { Redirect } from "react-router-dom";
import Example from "./Example";
import Certificate from "./Certificate";
import TestModal from './Page/TestModal';


export default class Dailyform extends Component{

    constructor(props){
        super(props);

        this.user_badge = "";
        this.use_scan = 0;
        //console.log(props);
        var match = props.location.pathname.match(/[^/?]*[^/?]/);

        if(!this.checkisEmpty(match)){
            var tryparse = props.location.pathname.split('/');
            
            if(!this.checkisEmpty(tryparse)){
                //console.log(tryparse.length);

                if(tryparse.length !== 4){
                    //console.log("");
                    alert("Please input badge yourself");
                    //console.log("Is null");
                    //alert("Please input badge yourself");
                    this.use_scan = 0;
                }
                else{
                    if(tryparse.length === 4){
                        if(tryparse[2].length === 6){
                            alert("Welcome: " + tryparse[3]);
                            this.user_badge = tryparse[2];
                            this.use_scan = 1;
                        }
                        else{
                            alert("Please input badge yourself");
                            this.use_scan = 0;
        
                        }  
                    }
                                                   
                }

            }

            /*
            
            if(match.length <= 2 || match.length > 3){
                console.log("1");
                //console.log("Is null");
                //alert("Please input badge yourself");
                this.use_scan = 0;
            }
            else{
                if(match[1].length === 6 && match[2].length > 0){
                    alert("Welcome: " + match[2]);
                    this.user_badge = match[1];
                    this.use_scan = 1;
                }
                else{
                    //alert("Please input badge yourself");
                    this.use_scan = 0;

                }                                 
            }
            */
        }
        else{
            
            this.use_scan = 0;
        }
        
        const initialState = {
            redirect: null,
            message: {
                type: 'success',
                msg: ''
            },
            certificate:{
                pass_cat: 'normal',
            },
            user: {
                badgeid: this.user_badge,
                temperature: "",
                symptom: [],
                travel: "",
                contacted: [],
                test: "",
                logtime: ""
            },
            radiocheck:{
                radi0: true,
                radi1: false,
                radi2: false,
                radi3: false,
                radi4: false,
                radi5: false,
                radi6: false,
                radi7: false,
                radi8: false,
            },
            c_radiocheck:{
                c_radi0: true,
                c_radi1: false,
                c_radi2: false,
                c_radi3: false,
            },
            t_radiocheck:{
                t_radi0: true,
                t_radi1: false,

            },
            test:{
                testdate: "",
                status: "",
                showtest: false,
            }
        };
               
        this.db = props.db;

        this.state = {
            redirect: null,
            message: {
                type: 'success',
                msg: ''
            },
            certificate:{
                pass_cat: 'normal',
            },
            user: {
                badgeid: this.user_badge,
                temperature: "",
                symptom: [],
                travel: "",
                contacted: [],
                test: "",
                logtime: ""
            },
            radiocheck:{
                radi0: true,
                radi1: false,
                radi2: false,
                radi3: false,
                radi4: false,
                radi5: false,
                radi6: false,
                radi7: false,
                radi8: false,
            },
            c_radiocheck:{
                c_radi0: true,
                c_radi1: false,
                c_radi2: false,
                c_radi3: false,
            },
            t_radiocheck:{
                t_radi0: true,
                t_radi1: false,

            },
            test:{
                testdate: "",
                status: "",
                showtest: false,
            }
        };;

        this._radioOnClick = this._radioOnClick.bind(this);
        this._inputfieldOnChange = this._inputfieldOnChange.bind(this);
        this._c_radioOnClick = this._c_radioOnClick.bind(this);
        this._addData = this._addData.bind(this);
        this._t_radioOnClick = this._t_radioOnClick.bind(this);
        this.testmodalclose = this.testmodalclose.bind(this);


        this.testmod = React.createRef();

    }

    checkisEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    _radioOnClick(event){
        event.persist();
        //event.preventDefault();
        let i = 0; 
        let {radiocheck, user} = this.state;  
        if(event.target.name === 'radi0'){
                       
            if(!radiocheck.radi0){
                radiocheck["radi0"] = true;
                for(i = 1; i < 9; i++){
                    let index = "radi" + i.toString();
                    radiocheck[index] = false;
                }
                user.symptom = [];
                this.setState({radiocheck: radiocheck, user: user});                   
            }           
        }
        else{

            radiocheck["radi0"] = false; 
            radiocheck[event.target.name] = true; 
            user.symptom.push(event.target.value);
            this.setState({radiocheck: radiocheck, user: user}); 
        
        }
        this.setState({
            message: {type: 'error', msg:null}
        });   
    }

    _c_radioOnClick(event){
        event.persist();
        //event.preventDefault();
        let i = 0; 
        let {c_radiocheck, user} = this.state;  
        if(event.target.name === 'c_radi0'){
                       
            if(!c_radiocheck.radi0){
                c_radiocheck["c_radi0"] = true;
                for(i = 1; i < 4; i++){
                    let index = "c_radi" + i.toString();
                    c_radiocheck[index] = false;
                }
                user.contacted = [];
                this.setState({c_radiocheck: c_radiocheck, user: user});                   
            }           
        }
        else{

            c_radiocheck["c_radi0"] = false; 
            c_radiocheck[event.target.name] = true; 
            user.contacted.push(event.target.value);
            this.setState({c_radiocheck: c_radiocheck, user: user}); 
        
        }
        this.setState({
            message: {type: 'error', msg:null}
        });   
    }


    _t_radioOnClick(event){
        event.persist();
        //event.preventDefault();
        let i = 0; 
        let {t_radiocheck, test} = this.state;  
        if(event.target.name === 't_radi0'){
                       
            if(!t_radiocheck.radi0){
                t_radiocheck["t_radi0"] = true;
                t_radiocheck["t_radi1"] = false;
                test.status = "";
                test.testdate = "";
                this.setState({t_radiocheck: t_radiocheck, test: test});                   
            }           
        }
        else{
            t_radiocheck["t_radi0"] = false; 
            t_radiocheck[event.target.name] = true; 
            test.showtest = true;
            //user.contacted.push(event.target.value);
            this.setState({t_radiocheck: t_radiocheck, test: test}); 
        
        }
        this.setState({
            message: {type: 'error', msg:null}
        });   
    }

    _inputfieldOnChange(event){
        event.persist();
        let {user} = this.state;
        if(event.target.name === "travel" && event.target.value === "NA"){
            user["travel"] = "";
        }
        else{
            user[event.target.name] = event.target.value;
        }
        
        this.setState({user: user});
        this.setState({
            message: {type: 'error', msg:null}
        });
    }

    _addData(event){
        //event.persist();
        event.preventDefault(); 
        let {user, test} = this.state;
        if(user.badgeid.trim() === ""){
            this.setState({
                message: {type: 'error', msg:'Please enter your Badge ID'}
            });
        }
        /*
        else if(user.temperature.trim() === ""){
            this.setState({
                message: {type: 'error', msg:'Please enter current body temperature'}
            });
        }
        */
        else{
            let log_time = new Date();
            const key = log_time.getFullYear().toString() + (log_time.getMonth() + 1).toString().padStart(2, '0') + log_time.getDate().toString().padStart(2, '0');
            //console.log("key time: ", key);
            
            //Trying Batch
            user["logtime"] = log_time;
            this.setState({user: user});
            let batch = this.db.db.batch();
            batch.set(this.db.db.collection("Form").doc(key), {});
            if(user.temperature > 99.5 || user.symptom.length > 0 || user.travel.trim() !== "" || user.contacted.length > 0 || (test.status.trim() !== "" && test.testdate.trim() !== "")){
                batch.set(this.db.db.collection("Form").doc(key).collection("Alert").doc(), {
                    id: this.state.user.badgeid,
                    temperature: Number(this.state.user.temperature),
                    symptom: this.state.user.symptom,
                    travel: this.state.user.travel,
                    contacted: this.state.user.contacted,
                    test: this.state.test.status,
                    time: this.state.user.logtime
                });

                //batch.set(this.db.db.collection("test").doc("wait"), {});

                console.log(test.status);
                if(test.status === "waiting"){
                    console.log("insert to wait");
                    batch.set(this.db.db.collection("test").doc("wait").collection("person").doc(), 
                        {
                            id: this.state.user.badgeid,
                            testdate: test.testdate,
                            status: test.status,
                            time: this.state.user.logtime
                        }
                    );

                }
                else if(test.status === "positive"){
                    console.log("insert to positive");
                    batch.set(this.db.db.collection("test").doc("pos").collection("person").doc(), 
                        {
                            id: this.state.user.badgeid,
                            testdate: test.testdate,
                            status: test.status,
                            time: this.state.user.logtime
                        }
                    );
                }
                else if(test.status === "negative"){
                    console.log("insert to negative");
                    batch.set(this.db.db.collection("test").doc("neg").collection("person").doc(), 
                        {
                            id: this.state.user.badgeid,
                            testdate: test.testdate,
                            status: test.status,
                            time: this.state.user.logtime
                        }
                    );
                }

                batch.commit().then(() => {
                    this.setState({
                        message: {type: 'success', msg:'Submit successful'},
                        certificate: {pass_cat: "alert"}
                    });  
                    alert("Successful submitted your form");   
                    }).catch((err) => {
                    this.setState({
                        message: {type: 'error', msg:'Error. Contact IT Dept.'},
                    }).finally(() => {
                        this.setState({ redirect: "/qr" });
                    });
                });
                
            }
            else{
                //put into normal collection
                this.db.db.collection("Form").doc(key).collection("Normal").doc().set({
                    id: this.state.user.badgeid,
                    temperature: Number(this.state.user.temperature),
                    symptom: this.state.user.symptom,
                    travel: this.state.user.travel,
                    contacted: this.state.user.contacted,
                    test: this.state.test.status,
                    time: this.state.user.logtime
                }).then(() => {
                    this.setState({
                        message: {type: 'success', msg:'Submit successful'},
                        certificate: {pass_cat: "normal"}
                    });
                    //this.setState({ redirect: "/home/0/0" });
                    alert("Successful submitted your form");    
                    //window.location.reload(false);                       
                }).catch((err) => {
                    this.setState({
                        message: {type: 'error', msg:'Error. Contact IT Dept.'}
                    }).finally(() => {
                        this.setState({ redirect: "/qr" });
                    });
                })

            }





            //Trying Batch
            /*

 
            this.db.db.collection("Form").doc(key).set({});
                    
            user["logtime"] = log_time;
            this.setState({user: user});

            if(user.temperature > 99.5 || user.symptom.length > 0 || user.travel.trim() !== "" || user.contacted.length > 0 || (test.status.trim() !== "" && test.testdate.trim() !== "")){
                //put into alert collection
                this.db.db.collection("Form").doc(key).collection("Alert").doc().set({
                    id: this.state.user.badgeid,
                    temperature: Number(this.state.user.temperature),
                    symptom: this.state.user.symptom,
                    travel: this.state.user.travel,
                    contacted: this.state.user.contacted,
                    time: this.state.user.logtime
                }).then(() => {
                    this.setState({
                        message: {type: 'success', msg:'Submit successful'},
                        certificate: {pass_cat: "alert"}
                    });  
                    alert("Successful submitted your form");   
                            //window.location.reload(false);                       
                            //this.setState({ redirect: "/home/0/0" });                            
                            //this.setState({ state: this.state });
                }).catch((err) => {
                    this.setState({
                        message: {type: 'error', msg:'Error. Contact IT Dept.'},
                    });
                })
            }
            else{
                //put into normal collection
                this.db.db.collection("Form").doc(key).collection("Normal").doc().set({
                    id: this.state.user.badgeid,
                    temperature: Number(this.state.user.temperature),
                    symptom: this.state.user.symptom,
                    travel: this.state.user.travel,
                    contacted: this.state.user.contacted,
                    time: this.state.user.logtime
                }).then(() => {
                    this.setState({
                        message: {type: 'success', msg:'Submit successful'},
                        certificate: {pass_cat: "normal"}
                    });
                    //this.setState({ redirect: "/home/0/0" });
                    alert("Successful submitted your form");    
                    //window.location.reload(false);                       
                }).catch((err) => {
                    this.setState({
                        message: {type: 'error', msg:'Error. Contact IT Dept.'}
                    });
                })

            }
        
            */

        }
        window.scrollTo(0, 0);
    }


    testmodalclose(e){
        //console.log(e);
        let {test, t_radiocheck} = this.state;
        let temp_status = "";

        if(e.status.trim() === "" && e.date.trim() === ""){
            //click to NO
            test["status"] = "";
            test["testdate"] = "";
            t_radiocheck["t_radi0"] = true;
            t_radiocheck["t_radi1"] = false;            
        }      
        else{
            if(e.date === ""){
                test["testdate"] = "N/A";
            }
            else{
                test["testdate"] = e.date;
            }
            
            if(e.status !== ""){
                switch(e.status){
                    case 'w':
                        temp_status = "waiting";
                        break;
                    case 'n':
                        temp_status = "negative";
                        break;
                    case 'p':
                        temp_status = "positive";
                        break;
                    default:
                        temp_status = "waiting";
                        break;
                }
                test["status"] = temp_status;
            }
            else{
                test["status"] = "waiting"
            }
        }

        
        test["showtest"] = false;
        this.setState({test: test});
    }
    

    render(){
        let {c_radiocheck, t_radiocheck, radiocheck, user, message, test} = this.state;

        if (this.state.redirect) {
            console.log( this.state.redirect);
            return(                               
                <Redirect to={{pathname: this.state.redirect}} />
            ); 
        }
        
        return(
            <DailyformWrapper>
                <Form onSubmit={this._addData}>
                    {message.msg && message.type === 'success' ? <FormSuccessMessage>{message.msg}</FormSuccessMessage> : null}
                    {message.msg && message.type === 'success' && false ? <Example badge_id={this.state.user.badgeid} pass_cat={this.state.certificate.pass_cat} time= {this.state.user.logtime.toDateString()} /> : null}
                    {message.msg && message.type === 'success' ? <Certificate open={true} badge_id={this.state.user.badgeid} pass_cat={this.state.certificate.pass_cat} time= {this.state.user.logtime.toDateString()} /> : null}
                    {message.msg && message.type === 'error' ? <FormErrorMessage>{message.msg}</FormErrorMessage> : null}
                    <TestModal open={test.showtest} onClose={this.testmodalclose} new={true} /> 

                    <FormItem>
                        <FormLabel>1. Badge ID</FormLabel>
                        <FormInput type={"number"} placeholder={'6 digits badge id'} min={"200000"} max={"689999"} name={"badgeid"} value={user.badgeid} onChange={this._inputfieldOnChange} />
                    </FormItem>
                    
                    <FormItem>
                        <FormLabel>2. Temperature (F)</FormLabel>
                        <FormInput type="number" step="0.1" placeholder={'Body temperature'} min="95.0" max="102.0" name={"temperature"} value={user.temperature} onChange={this._inputfieldOnChange}/>
                    </FormItem>
                    

                    <FormItem>
                        <FormLabel>2. Symptom</FormLabel>
                        <NoneLabel><input type="radio" value="none" name="radi0" checked={radiocheck.radi0} onChange={this._radioOnClick} />No Symptom</NoneLabel>                        
                        <label><input type="radio" value="cough" name="radi1" checked={radiocheck.radi1}  onChange={this._radioOnClick}/>Cough</label>
                        <label><input type="radio" value="breath" name="radi2" checked={radiocheck.radi2} onChange={this._radioOnClick} />Shortness of breath/Difficulty breathing</label>
                        <label><input type="radio" value="chest" name="radi3" checked={radiocheck.radi3} onChange={this._radioOnClick} />Chest Pain</label>
                        <label><input type="radio" value="chills" name="radi4" checked={radiocheck.radi4} onChange={this._radioOnClick} />Chills</label>
                        <label><input type="radio" value="muscle" name="radi5" checked={radiocheck.radi5} onChange={this._radioOnClick} />Muscle pain</label>
                        <label><input type="radio" value="head" name="radi6" checked={radiocheck.radi6} onChange={this._radioOnClick} />Headache</label>
                        <label><input type="radio" value="sore" name="radi7" checked={radiocheck.radi7} onChange={this._radioOnClick} />Sore throat</label>
                        <label><input type="radio" value="taste" name="radi8" checked={radiocheck.radi8} onChange={this._radioOnClick} />Loss of taste or smell</label>                       
                    </FormItem>

                    <FormItem>
                        <FormLabel>3. Have 15 minutes close contacted with</FormLabel>
                        <NoneLabel><input type="radio" value="none" name="c_radi0" checked={c_radiocheck.c_radi0} onChange={this._c_radioOnClick} />None</NoneLabel>                        
                        <label><input type="radio" value="confirmed" name="c_radi1" checked={c_radiocheck.c_radi1}  onChange={this._c_radioOnClick}/>COVID confirmed person</label>
                        <label><input type="radio" value="symptom" name="c_radi2" checked={c_radiocheck.c_radi2} onChange={this._c_radioOnClick} />COVID symptom person</label>
                        <label><input type="radio" value="testing" name="c_radi3" checked={c_radiocheck.c_radi3} onChange={this._c_radioOnClick} />COVID suspected or testing person</label>                                            
                    </FormItem>

                    <FormItem>
                        <FormLabel>4. I have received COVID19 Test</FormLabel>
                        <NoneLabel><input type="radio" value="none" name="t_radi0" checked={t_radiocheck.t_radi0} onChange={this._t_radioOnClick} />No</NoneLabel>                        
                        <label><input type="radio" value="test" name="t_radi1" checked={t_radiocheck.t_radi1}  onChange={this._t_radioOnClick}/>Yes I have</label>   
                        {test.status || test.testdate ? <h6 style={{color: "#0693E3"}}>{`Received Test on ${test.testdate} & result is ${test.status}`}</h6> : null}                                        
                    </FormItem>

                    <FormItem>
                        <FormLabel>5. Travel out of state or country</FormLabel>                       
                        <select value={user.travel} name="travel" onChange={this._inputfieldOnChange}>
                            <option value="NA">None</option>
                            <option value="US">Out of United States</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        
                    </FormItem>
                    <p>I understand that false or misleading statements in this form will be sufficient cause for disciplinary actions, including termination.</p>

                    <FormAction>
                        <FormSubmit type={'submit'} size="lg" style={{height:'50px'}} >Submit</FormSubmit>                      
                    </FormAction>
                    
                </Form>                
            </DailyformWrapper>
        );

        

    }
}

//export default withRouter(Dailyform);



