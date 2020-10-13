import CartActionTypes from './cart-types';
import {addItemToCart} from './cart.utils';

const INITIAL_STATE = {
    hidden : true,
    cartItems : []
};

//declaring reducer with state and action.
const cartReducer = (state = INITIAL_STATE, action) => {
    //looping through kind of action type and work according to it
    switch(action.type){
        //if the user click on cart-icon, change the hidden state and display cart-dropdown state and pass it to components
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden : !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItems : addItemToCart(state.cartItems, action.payload)
            };
            //default state
            default :
                return state
    }
};

export default cartReducer; 