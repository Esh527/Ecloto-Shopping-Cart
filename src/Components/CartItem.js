import React from 'react';
import { FREE_GIFT } from '../constants';

const CartItem = ({ item, onUpdateCartItem, onRemoveFromCart }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-name-price">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
      </div>
      <div className="item-actions">
        {item.id !== FREE_GIFT.id && (
          <>
            <button className="item-actions-btn1" onClick={() => onUpdateCartItem(item.id, false)}>-</button>
            <button className="item-actions-btn2" onClick={() => onUpdateCartItem(item.id, true)}>+</button>
            <button 
              className="remove-btn" 
              onClick={() => onRemoveFromCart(item.id)}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;