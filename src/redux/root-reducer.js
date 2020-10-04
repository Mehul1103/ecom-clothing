import {combineReducers} from 'redux';

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart-reducer';

//function to create rootReducer object
export default combineReducers({
    user: userReducer,
    cart: cartReducer 
});