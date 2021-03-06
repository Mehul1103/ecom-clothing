import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//so that firebase knows it our project and connect it to database
const config = {
    apiKey: "AIzaSyCWpOcvEnblLXt8GDp90PnNEqXFJa5Hy7U",
    authDomain: "mynt-db.firebaseapp.com",
    databaseURL: "https://mynt-db.firebaseio.com",
    projectId: "mynt-db",
    storageBucket: "mynt-db.appspot.com",
    messagingSenderId: "676635034410",
    appId: "1:676635034410:web:1fdd7032f43507dbffd453",
    measurementId: "G-GNM6ESNGF6"
  };

  //creating a user information profile having userAuth object(when user authenticate)
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;   //if userAuth object is null, return nothing

    //getting userRef from the firstore with uid generated during authentication
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //wait to get the userRef object and then have the snapshot of user
    const snapShot = await userRef.get();

    //if no user found, create the new column with user information and date of creation
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        // setting the data in firestore. passing additionalData with additionalData(as we dont need it)
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
          console.log('error creating user', error.message)
      }
    }

    //return the userRef object to do things with user
    return userRef;
  }
  
  firebase.initializeApp(config);

  //using firebase auth method to use anywhere in the program.
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //declaring const to use Google signin auth.
  const provider = new firebase.auth.GoogleAuthProvider();
  //always trigger to select account
  provider.setCustomParameters({prompt : 'select_account'})

  //method to call popup with provider as argument.
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;