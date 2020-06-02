import React, {Component} from 'react';
import TestList from './TestList';

export default class TestHistory extends Component{

    constructor(props){
        super(props);

        this.db = props.db;

        this.state = {
            data2: [],
            needsearch: true,
            search: "all"
        };

        this.props = props;   
        
        this.GetPrintData = this.GetPrintData.bind(this);
    }

    checkisEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidUpdate(e){
        //console.log(e);
    }
    componentDidMount(){
        
        this.db.db.collectionGroup("person").get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data()); 
            //console.log(data);
            this.setState({data2: [data]});

        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            //this.props.action();
        });
        

    }

    GetPrintData(e){
        //console.log("TestHistory--GetPrintData", e);
        this.props.func(e);

    }

    //https://medium.com/@admin_86118/react-re-render-child-components-on-parent-state-change-387720c3cff8
    //https://ourcodeworld.com/articles/read/409/how-to-update-parent-state-from-child-component-in-react
    //componentWillReceiveProps
    //getDerivedStateFromProps
    UNSAFE_componentWillReceiveProps(e){
        //event.preventDefault(); 
        //console.log("WillReceiveProps e: ", e)
               
        if(e.search !== ""){
            if(e.search === "all"){
                this.db.db.collectionGroup("person").get().then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => doc.data()); 
                    //console.log(data);
                    this.setState({data2: [data]});

                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    
                });
                
            }
            else{
                this.db.db.collection("test").doc(e.search).collection("person").get().then(querySnapshot => {
                    //console.log(querySnapshot);
                    const data = querySnapshot.docs.map(doc => doc.data());
                    //console.log(data); // array of cities objects
                    this.setState({data2: [data]});
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    
                });
            }
        }
        
        

        

    }

    render(){
        return(
            <div>
                <TestList people={this.state.data2} func={this.GetPrintData} />                             
            </div>                                 
        );       
    }

}