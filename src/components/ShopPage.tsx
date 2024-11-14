import React from 'react';
import ProductGrid from './ProductGrid';

const ShopPage = ({ addToCart }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
      <ProductGrid addToCart={addToCart} />
    </div>
  );
};

export default ShopPage;