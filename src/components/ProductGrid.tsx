import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, ChevronRight } from 'lucide-react';

const products = {
  wood: [
    {
      id: 'w1',
      name: 'Handcrafted Wooden Jewelry Box',
      price: 89,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Wood Art'
    },
    {
      id: 'w2',
      name: 'Wooden Pendant Necklace',
      price: 39,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Wood Jewelry'
    },
    {
      id: 'w3',
      name: 'Basic Woodworking Course',
      price: 149,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1581612129334-551ccd069e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Courses'
    }
  ],
  paper: [
    {
      id: 'p1',
      name: 'Handmade Wedding Cards Set',
      price: 29,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Cards'
    },
    {
      id: 'p2',
      name: 'Vintage Style Bookmarks',
      price: 12,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1598067305109-9a60168d5311?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Bookmarks'
    }
  ],
  juggling: [
    {
      id: 'j1',
      name: 'Beginner Juggling Set',
      price: 24,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1576617497557-22895ee5930b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Sets'
    },
    {
      id: 'j2',
      name: 'Party Entertainment Package',
      price: 199,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Events'
    }
  ],
  art: [
    {
      id: 'a1',
      name: 'Watercolor Landscape',
      price: 299,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Paintings'
    },
    {
      id: 'a2',
      name: 'Mixed Media Workshop',
      price: 89,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Lessons'
    }
  ],
  software: [
    {
      id: 's1',
      name: 'Web Development Consultation',
      price: 149,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Consulting'
    },
    {
      id: 's2',
      name: 'Programming Basics Course',
      price: 299,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Teaching'
    }
  ]
};

const ProductGrid = ({ category = 'all', limit, addToCart }) => {
  const [expandedId, setExpandedId] = useState(null);

  const getFilteredProducts = () => {
    if (category === 'all') {
      return Object.values(products).flat();
    }
    return products[category] || [];
  };

  const filteredProducts = getFilteredProducts().slice(0, limit);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            className="card overflow-hidden transform transition-all duration-300 hover:shadow-xl"
          >
            <motion.div
              className="relative aspect-square overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-earth-600 text-natural-100 px-3 py-1 rounded-full text-sm">
                {product.category}
              </div>
            </motion.div>
            <div className="p-6">
              <h3 className="text-xl font-display font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-earth-700">${product.price}</span>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-earth-500 stroke-earth-500" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                  className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-earth-600 text-earth-600 hover:bg-earth-50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
              <AnimatePresence>
                {expandedId === product.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-natural-700"
                  >
                    <p>Handcrafted with love by the Bira family. Each piece is unique and made with the finest materials,
                       ensuring both beauty and durability. Our commitment to quality craftsmanship shows in every detail.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;