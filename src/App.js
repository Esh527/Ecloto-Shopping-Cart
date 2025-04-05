import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProductList from './Components/ProductList';
import ShoppingCart from './Components/ShoppingCart';
import { PRODUCTS, FREE_GIFT, THRESHOLD } from './constants';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [hasFreeGift, setHasFreeGift] = useState(false);

  // Initialize quantities
  useEffect(() => {
    const initialQuantities = {};
    PRODUCTS.forEach(product => {
      initialQuantities[product.id] = 1;
    });
    setProductQuantities(initialQuantities);
  }, []);

  // Check for free gift eligibility
  useEffect(() => {
    const subtotal = calculateSubtotal();
    
    if (subtotal >= THRESHOLD && !hasFreeGift) {
      setCart([...cart, { ...FREE_GIFT, quantity: 1 }]);
      setHasFreeGift(true);
      setShowGiftMessage(true);
      setTimeout(() => setShowGiftMessage(false), 3000);
    } else if (subtotal < THRESHOLD && hasFreeGift) {
      setCart(cart.filter(item => item.id !== FREE_GIFT.id));
      setHasFreeGift(false);
    }
  }, [cart, hasFreeGift]);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      if (item.id !== FREE_GIFT.id) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const handleQuantityChange = (productId, increment) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + (increment ? 1 : -1))
    }));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + productQuantities[product.id] }
          : item
      ));
    } else {
      setCart([...cart, {
        ...product,
        quantity: productQuantities[product.id]
      }]);
    }
  };

  const updateCartItem = (productId, increment) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + (increment ? 1 : -1);
        if (newQuantity < 1) return item; // Prevent going below 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const subtotal = calculateSubtotal();
  const progress = Math.min(100, (subtotal / THRESHOLD) * 100);

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <ProductList
          products={PRODUCTS}
          productQuantities={productQuantities}
          onQuantityChange={handleQuantityChange}
          onAddToCart={addToCart}
        />
        
        <ShoppingCart
          cart={cart}
          subtotal={subtotal}
          hasFreeGift={hasFreeGift}
          showGiftMessage={showGiftMessage}
          progress={progress}
          onUpdateCartItem={updateCartItem}
          onRemoveFromCart={removeFromCart}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;