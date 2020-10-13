import {createSelector} from 'reselect';

//inputSelector = take whole state and return a slice of it
const selectCart = state => state.cart;

//outputSelector which uses createSelector function and take the reference of other selector and get the value.
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumlatedQuantity, cartItem) => accumlatedQuantity + cartItem.quantity,0)
);