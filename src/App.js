import React from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shoppage/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up.component';

import Header from './component/header/header.component.jsx';

//to pass the state of user to whatever page we want after login
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser : null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {    //userAuth can be null(sign-out) or user object
      if (userAuth){
        //we will get the userRef if there is document already present at firestore
        //if there is no document, we will go to firebase.util and create and get userRef
          const userRef =  await createUserProfileDocument(userAuth);

          //we will create the snapshot and get the details and set the state with it to run within the website
          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            });
          });
        }
        this.setState({currentUser: userAuth})
    });
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
        <Route path='/signup' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
