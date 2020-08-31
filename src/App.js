import React from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shoppage/shop.component';
import Signup from './pages/signuppage/signup.component';

import Header from './component/header/header.component.jsx';

//to pass the state of user to whatever page we want after login
import {auth} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser : null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser : user});

      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>    
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;
