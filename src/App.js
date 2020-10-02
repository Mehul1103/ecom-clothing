import React from 'react';
import './App.css';

import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shoppage/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up.component';

import Header from './component/header/header.component.jsx';

//to pass the state of user to whatever page we want after login
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //instead of setting state, we are getting it from props.
    const {setCurrentUser} = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {    //userAuth can be null(sign-out) or user object
      if (userAuth){
        //we will get the userRef if there is document already present at firestore
        //if there is no document, we will go to firebase.util and create and get userRef
          const userRef =  await createUserProfileDocument(userAuth);

          //we will create the snapshot and get the details and set the state with it to run within the website
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });    
          });
        }
        setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>    
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signup' render = {() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

//passing the action to the store. dispatching an action with and return the updated result from store based on the action
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

//connect funtion connect a react component to Redux store. provide the component the data it need or the function to dispatch to the store
export default connect(mapStateToProps, mapDispatchToProps)(App);
