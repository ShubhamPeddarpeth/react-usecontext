// cartReducer.js
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
};

export default cartReducer;
