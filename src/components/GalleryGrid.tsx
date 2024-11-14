import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    id: 1,
    title: 'Handcrafted Chair',
    category: 'Carpentry',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Mountain Landscape',
    category: 'Painting',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Web Application',
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Juggling Performance',
    category: 'Juggling',
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const GalleryGrid = ({ limit }) => {
  const displayedItems = limit ? galleryItems.slice(0, limit) : galleryItems;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {displayedItems.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02 }}
          className="relative group overflow-hidden rounded-xl shadow-lg"
        >
          <div className="aspect-video">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-amber-50">
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-amber-200">{item.category}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;