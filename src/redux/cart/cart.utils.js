//declaring a util function with array and an item to add(catch it from when user clicks on add to cart)
export const addItemToCart = (cartItems, cartItemToAdd) => {
    //it will find if the particular item is already present in cart by checking the id.
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    //if item is present, map the item by checking both id and increase the quantity
    if(existingCartItem){
        //map method creates a new array with result being affected on every element of array.
        //In this, it will increase the count if id matches, otherwise keep the value same  
        return cartItems.map(cartItem => 
        cartItem.id === cartItemToAdd.id
        ? {...cartItem, quantity : cartItem.quantity + 1}
        : cartItem
        );
    }
    //otherwise return the same array and that latest item to add with quantity 1
    return [...cartItems, {...cartItemToAdd, quantity : 1}]
};