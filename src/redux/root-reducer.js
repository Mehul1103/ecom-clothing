import {combineReducers} from 'redux';

import userReducer from './user/user-reducer';

//function to create rootReducer object
export default combineReducers({
    user: userReducer
});