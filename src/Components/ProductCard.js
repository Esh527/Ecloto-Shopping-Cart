import React from 'react';

const ProductCard = ({ product, quantity, onQuantityChange, onAddToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      {/* <div className="quantity-selector">
        <button className="quantity-selector-button1" onClick={() => onQuantityChange(product.id, false)}>-</button>
        <span>{quantity}</span>
        <button className="quantity-selector-button2" onClick={() => onQuantityChange(product.id, true)}>+</button>
      </div> */}
      <button 
        className="add-to-cart" 
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;