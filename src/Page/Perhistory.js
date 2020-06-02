import React, {Component} from 'react';
import PeopleList from './PeopleList';

export default class Perhistory extends Component{

    constructor(props){
        super(props);

        this.db = props.db;

        this.state = {
            data2: [],
            needsearch: true
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

    //https://medium.com/@admin_86118/react-re-render-child-components-on-parent-state-change-387720c3cff8
    //https://ourcodeworld.com/articles/read/409/how-to-update-parent-state-from-child-component-in-react
    //componentWillReceiveProps
    UNSAFE_componentWillReceiveProps(e){
        //event.preventDefault(); 
        //console.log(e);

        if(e.lookup.length === 6){
            let log_time = new Date();
            //https://sebhastian.com/react-firestore
            var list_data = [];
            //https://firebase.googleblog.com/2019/06/understanding-collection-group-queries.html
            this.db.db.collectionGroup("Alert").where('id', '==', e.lookup).get().then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    //doc.data();
                    if(!this.checkisEmpty(doc.data())){
                        list_data.push(doc.data());
                    }
                });
            }).then(() => {
                this.db.db.collectionGroup("Normal").where('id', '==', e.lookup).get().then(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => {
                        if(!this.checkisEmpty(doc.data())){ 
                            list_data.push(doc.data());    
                        }
                    });
                }).then(() => {  
                    //order the list_data by date 
                    //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
                    list_data.sort((a, b) => (a.time.seconds < b.time.seconds) ? 1 : -1)
                    //console.log(list_data);
                    this.setState({data2: [list_data]});                                      
                });                  
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.props.action(); 
            });
        }

    }

    GetPrintData(e){

        this.props.func(e);

    }

    render(){
        return(
            <div>             
                <PeopleList people={this.state.data2} func={this.GetPrintData} />
            </div>                                 
        );       
    }

}