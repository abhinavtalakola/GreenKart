import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, 10);
        if (newQuantity > existingItem.quantity) {
          toast.success(`${product.name} quantity updated to ${newQuantity}!`);
        } else {
          toast.warning('Maximum quantity (10) reached for this item!');
        }
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart!`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    if (newQuantity > 10) {
      toast.warning('Maximum quantity allowed is 10!');
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item._id === productId);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} removed from cart!`);
      }
      return prevItems.filter(item => item._id !== productId);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems(prevItems => {
      if (prevItems.length > 0) {
        toast.info('Cart cleared!');
      }
      return [];
    });
  }, []);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getCartSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getDeliveryFee = useCallback(() => {
    const subtotal = getCartSubtotal();
    return subtotal >= 500 ? 0 : 50;
  }, [getCartSubtotal]);

  const getTotalWithDelivery = useCallback(() => {
    return getCartSubtotal() + getDeliveryFee();
  }, [getCartSubtotal, getDeliveryFee]);

  const getSavings = useCallback(() => {
    const subtotal = getCartSubtotal();
    if (subtotal >= 500) {
      return 50;
    }
    return 0;
  }, [getCartSubtotal]);

  const isEligibleForFreeDelivery = useCallback(() => {
    return getCartSubtotal() >= 500;
  }, [getCartSubtotal]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartSubtotal,
    getDeliveryFee,
    getTotalWithDelivery,
    getSavings,
    isEligibleForFreeDelivery
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 