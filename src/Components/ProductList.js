import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, productQuantities, onQuantityChange, onAddToCart }) => {
  return (
    <div className="products">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={productQuantities[product.id] || 1}
            onQuantityChange={onQuantityChange}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;