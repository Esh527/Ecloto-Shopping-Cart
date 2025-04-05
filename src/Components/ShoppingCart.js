import React from 'react';
import CartItem from './CartItem';
import ProgressBar from './ProgressBar';

const ShoppingCart = ({ 
  cart, 
  subtotal, 
  hasFreeGift, 
  showGiftMessage, 
  progress, 
  onUpdateCartItem, 
  onRemoveFromCart 
}) => {

  return (
    <div className="cart-section">
      <h2>Shopping Cart</h2>
      
      {showGiftMessage && (
        <div className="gift-message">
          Congratulations! You've earned a free gift!
        </div>
      )}

      <ProgressBar progress={progress} subtotal={subtotal} />
      
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.,
        add some products to see them here!!</p>
        
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateCartItem={onUpdateCartItem}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
          <div className="cart-total">
            <h3>Subtotal: ₹{subtotal}</h3>
            {hasFreeGift && <p>Free gift included!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;