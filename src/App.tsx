import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, Facebook, Instagram, Twitter } from 'lucide-react';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import ServicesPage from './components/ServicesPage';
import GalleryPage from './components/GalleryPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BookingSystem from './components/BookingSystem';
import ArtistSubmission from './components/ArtistSubmission';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'book', label: 'Book a Session' },
    { id: 'submit-art', label: 'Submit Art' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-natural-100 text-natural-800 font-sans">
      <header className="bg-earth-700 text-natural-100 p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-display font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bira&apos;s
          </motion.h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <motion.li key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    onClick={() => setActiveTab(item.id)}
                    className={`hover:text-natural-200 transition-colors ${
                      activeTab === item.id ? 'text-natural-200 font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-6">
            <motion.button 
              className="hover:text-natural-200 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={24} />
            </motion.button>
            <motion.button 
              className="hover:text-natural-200 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-natural-200 text-earth-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </motion.button>
            <motion.button 
              className="hover:text-natural-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={24} />
            </motion.button>
            <motion.button 
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-earth-700 text-natural-100 p-4 md:hidden"
          >
            <ul className="space-y-4">
              {navItems.map((item) => (
                <motion.li 
                  key={item.id}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left py-2 hover:text-natural-200 transition-colors"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto mt-8 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <HomePage addToCart={addToCart} />}
            {activeTab === 'shop' && <ShopPage addToCart={addToCart} />}
            {activeTab === 'services' && <ServicesPage />}
            {activeTab === 'gallery' && <GalleryPage />}
            {activeTab === 'book' && <BookingSystem />}
            {activeTab === 'submit-art' && <ArtistSubmission />}
            {activeTab === 'about' && <AboutPage />}
            {activeTab === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-earth-700 text-natural-100 p-8 mt-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">About Us</h3>
            <p className="text-natural-200">Bira's Family Business: Crafting love into every creation since 1980.</p>
            <div className="flex space-x-4 mt-6">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-natural-200"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-natural-200"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-natural-200"
              >
                <Twitter size={24} />
              </motion.a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <motion.button 
                    onClick={() => setActiveTab(item.id)}
                    className="hover:text-natural-200 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Contact Us</h3>
            <p className="text-natural-200 mb-2">123 Craft Lane</p>
            <p className="text-natural-200 mb-2">Artisan Town, AT 12345</p>
            <p className="text-natural-200 mb-2">Phone: (555) 123-4567</p>
            <p className="text-natural-200">Email: info@birasfamily.com</p>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-natural-200/20">
          <p className="text-natural-200">&copy; {new Date().getFullYear()} Bira's Family Business. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;