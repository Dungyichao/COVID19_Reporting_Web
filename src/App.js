import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Dailyform from './dailyform';
import Console from './console';
import {AppWrapper, Main, Header, Footer, Container, Copyright, HeaderTitle, HeaderWrapper} from './theme';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Firebase from './firebase';
import FirebaseContext from './context';
import Test from './qrscan';




export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      info: "123"
    }

    this.fireb = new Firebase()


  }
  

  render(){
    //const {info} = this.state;
    return(
      <FirebaseContext.Provider>
        <AppWrapper>
          <HeaderWrapper>
            <Header>
              <HeaderTitle>
                Nan Ya Plastics SC COVID19 Report System
              </HeaderTitle>
            </Header>
          </HeaderWrapper>
          <Main>
            <Container>
              <Router>
                <Switch>
                  <Route exact path="/" render={(routeProps) => <Test {...routeProps} />}></Route>
                  <Route path="/home/:id" render={(routeProps) => <Dailyform {...routeProps} db={this.fireb} />}></Route>
                  <Route path="/qr" render={(routeProps) => <Test {...routeProps}  />}></Route>
                  <Route path="/console" render={(routeProps) => <Console {...routeProps} db={this.fireb} />}></Route>
                </Switch>
              </Router>             
            </Container>            
          </Main>
          <Footer>
              <Container>
                  <Copyright>2020 Nan Ya Plastics SC  IT Dept.  (843) 389-7800 ext.2032 </Copyright>
              </Container>
          </Footer>
        </AppWrapper>
      </FirebaseContext.Provider>
    );
  }
}

//export default App;
