import React from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './ProductGrid';
import ServiceTabs from './ServiceTabs';
import GalleryGrid from './GalleryGrid';
import CommunityForum from './CommunityForum';

const HomePage = ({ addToCart }) => {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden py-20 px-4 rounded-3xl wood-texture">
        <div className="absolute inset-0 bg-natural-900/40 backdrop-blur-sm"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <h2 className="text-5xl font-display font-bold mb-6 text-natural-100">Welcome to Bira&apos;s Family Business</h2>
          <p className="text-xl max-w-2xl mx-auto text-natural-200">
            We&apos;re a creative family bringing art, crafts, and knowledge to our lovely town. 
            From woodworking to paper crafts, juggling to painting, we create with love.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 btn-primary"
          >
            Explore Our Work
          </motion.button>
        </motion.div>
      </section>

      <section className="card p-12">
        <h3 className="text-3xl font-display font-bold mb-8 text-center">Featured Products</h3>
        <ProductGrid limit={3} addToCart={addToCart} />
      </section>

      <section className="card p-12">
        <h3 className="text-3xl font-display font-bold mb-8 text-center">Our Services</h3>
        <ServiceTabs />
      </section>

      <section className="card p-12">
        <h3 className="text-3xl font-display font-bold mb-8 text-center">Latest from Our Gallery</h3>
        <GalleryGrid limit={4} />
      </section>

      <section className="card p-12">
        <h3 className="text-3xl font-display font-bold mb-8 text-center">Community Forum</h3>
        <CommunityForum />
      </section>
    </div>
  );
};

export default HomePage;