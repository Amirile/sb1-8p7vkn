import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, Facebook, Instagram, Twitter } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import ServicesPage from './components/ServicesPage';
import GalleryPage from './components/GalleryPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BookingRoute from './components/BookingRoute';
import ArtistSubmission from './components/ArtistSubmission';
import NotFoundPage from './components/NotFoundPage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type?: string;
  bookingDetails?: {
    serviceId: string;
    offering: string;
    date: string;
    time: string;
    participants: number;
  };
}

const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'shop', label: 'Shop', path: '/shop' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'submit-art', label: 'Submit Art', path: '/submit-art' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'contact', label: 'Contact', path: '/contact' }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-natural-100 text-natural-800 font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-earth-600 text-natural-100 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="text-2xl font-display font-bold">
                Bira&apos;s
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navItems.map(item => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="hover:text-natural-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-earth-700 rounded-full"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 hover:bg-earth-700 rounded-full relative"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 hover:bg-earth-700 rounded-full"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="md:hidden p-2 hover:bg-earth-700 rounded-full"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/book" element={<BookingRoute addToCart={addToCart} />} />
            <Route path="/submit-art" element={<ArtistSubmission />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-earth-800 text-natural-100 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4">About Us</h4>
                <p className="text-natural-300">
                  A family business bringing art and creativity to our community since 1980.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {navItems.map(item => (
                    <li key={item.id}>
                      <Link to={item.path} className="text-natural-300 hover:text-natural-100">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Contact</h4>
                <address className="text-natural-300 not-italic">
                  123 Craft Street<br />
                  Artisan City, AC 12345<br />
                  Phone: (555) 123-4567<br />
                  Email: hello@biras.com
                </address>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-natural-300 hover:text-natural-100">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-natural-300 hover:text-natural-100">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-natural-300 hover:text-natural-100">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-earth-700 text-center text-natural-300">
              <p>&copy; 2024 Bira's Family Business. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed inset-y-0 left-0 w-64 bg-earth-800 text-natural-100 p-6"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-2xl font-bold">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-earth-700 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navItems.map(item => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="block hover:text-natural-200 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg"
                onClick={e => e.stopPropagation()}
              >
                <form onSubmit={handleSearch} className="flex gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products and services..."
                    className="flex-1 p-3 border-2 border-natural-200 rounded-lg focus:border-earth-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-earth-600 text-natural-100 px-6 rounded-lg hover:bg-earth-700"
                  >
                    Search
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shopping Cart */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end"
              onClick={() => setIsCartOpen(false)}
            >
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="bg-white h-full w-full max-w-md p-6 overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Your Cart</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-natural-500 hover:text-natural-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-center text-natural-500">Your cart is empty</p>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 border-b border-natural-200 pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-natural-500">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-natural-500 hover:text-natural-700"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-natural-500 hover:text-natural-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}

                    <div className="border-t border-natural-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Total:</span>
                        <span className="text-xl font-bold">${cartTotal}</span>
                      </div>
                      <button className="w-full bg-earth-600 text-natural-100 py-3 rounded-lg hover:bg-earth-700">
                        Checkout
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;