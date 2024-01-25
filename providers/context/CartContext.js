// components/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState(null);

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  const setItemAdded = (item) => {
    setAddedItem(item);
    updateCartCount(item.length);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, addedItem, setItemAdded }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
