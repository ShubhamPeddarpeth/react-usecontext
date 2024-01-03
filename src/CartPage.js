// CartPage.js
import React from 'react';
import { useCart } from './CartProvider';

const CartPage = () => {
    const { state, updateQuantity, dispatch } = useCart();

    const handleQuantityChange = (id, quantity) => {
        updateQuantity(id, quantity);
    };

    const handleRemove = (id) => {
        // Filter out the item with the given id and create a new cart array
        const newCart = state.cart.filter(item => item.id !== id);
        // Dispatch the new cart to update the state
        dispatch({ type: 'REMOVE_ITEM', payload: newCart });
    };
    const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = state.cart.reduce((total, item) => total + item.price * (1 - item.discountPercentage / 100) * item.quantity, 0);

    return (
        <div>
            <h2>Shopping Cart</h2>

            {state.cart.map(item => (
                <div key={item.id} style={{ marginTop:'50px' }} >
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <h3>{item.title}</h3>
                            {/* Display your product image here */}
                            <img src={item.thumbnail} alt="Product Thumbnail" style={{ width: '100%' }} />
                        </div>

                        <div style={{ flex: 1, marginLeft: '20px' }}>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Discount: {item.discountPercentage}%</p>
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                />
                            </label>
                            <br />
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                            <p>Total: ${(item.price * (1 - item.discountPercentage / 100) * item.quantity).toFixed(2)}</p>
                        </div>

                    </div>

                </div>
            ))}

            <div id="totals">
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartPage;
