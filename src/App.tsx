import React, { useState } from 'react';
import AppContext from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import UserDashboard from './components/UserDashboard';
import SupportPage from './components/SupportPage';
import { Product, CartItem } from './types';
import { addToCart as addToCartUtil, removeFromCart as removeFromCartUtil } from './utils/cart';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => addToCartUtil(prev, product));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => removeFromCartUtil(prev, productId));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'catalog':
        return <CatalogPage />;
      case 'product':
        return <ProductPage />;
      case 'cart':
        return <CartPage />;
      case 'dashboard':
        return <UserDashboard />;
      case 'support':
        return <SupportPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <div className="min-h-screen bg-background">
        <Header />
        <main className="min-h-screen">
          {renderCurrentPage()}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}