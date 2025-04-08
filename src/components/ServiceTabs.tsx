import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Scissors, PenTool, Palette, Code } from 'lucide-react';

const services = [
  {
    id: 'wood',
    icon: Hammer,
    title: 'Wood Crafts',
    description: 'From delicate jewelry to custom furniture, we create unique wooden pieces with love and skill. Join our workshops to learn traditional woodworking techniques.',
    offerings: [
      'Custom wood art and decor',
      'Handcrafted wood jewelry',
      'Weekend woodworking courses',
      'Custom furniture requests'
    ],
    price: 'Starting at $39'
  },
  {
    id: 'paper',
    icon: PenTool,
    title: 'Paper Crafts',
    description: 'Discover our handmade paper creations, perfect for special occasions or as unique gifts. Custom orders welcome for personalized designs.',
    offerings: [
      'Handmade cards and invitations',
      'Custom memory albums',
      'Decorative boxes and packaging',
      'Artisanal bookmarks'
    ],
    price: 'Starting at $12'
  },
  {
    id: 'juggling',
    icon: Scissors,
    title: 'Juggling',
    description: 'Learn the art of juggling or book us for your next event. We offer beginner-friendly equipment and professional entertainment services.',
    offerings: [
      'Beginner juggling sets',
      'Private and group lessons',
      'Event entertainment packages',
      'Children\'s party performances'
    ],
    price: 'Sets from $24, Lessons from $49'
  },
  {
    id: 'art',
    icon: Palette,
    title: 'Art & Painting',
    description: 'Express yourself through various art forms. We offer original paintings and workshops in different techniques.',
    offerings: [
      'Original paintings',
      'Mixed media artwork',
      'Art technique workshops',
      'Custom commissions'
    ],
    price: 'Starting at $89'
  },
  {
    id: 'software',
    icon: Code,
    title: 'Software & Teaching',
    description: 'Get personalized guidance in software development or join our coding workshops. We specialize in making technology accessible.',
    offerings: [
      'Programming basics courses',
      'Web development consulting',
      'Custom software solutions',
      'One-on-one mentoring'
    ],
    price: 'Consulting from $149/hour'
  }
];

const ServiceTabs = ({ onBookService }) => {
  const [activeTab, setActiveTab] = useState(services[0].id);

  const handleBookNow = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    onBookService(service);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {services.map((service) => (
          <motion.button
            key={service.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(service.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === service.id
                ? 'bg-earth-600 text-natural-100'
                : 'bg-natural-200 text-natural-800 hover:bg-natural-300'
            }`}
          >
            <service.icon className="w-5 h-5" />
            {service.title}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {services.map((service) => (
          activeTab === service.id && (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <service.icon className="w-16 h-16 mx-auto mb-4 text-earth-600" />
              <h4 className="text-2xl font-display font-bold">{service.title}</h4>
              <p className="text-natural-700 max-w-2xl mx-auto">{service.description}</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto my-8">
                {service.offerings.map((offering, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-natural-50 p-4 rounded-lg text-natural-800"
                  >
                    {offering}
                  </motion.div>
                ))}
              </div>

              <p className="text-xl font-semibold text-earth-700">{service.price}</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBookNow(service.id)}
                className="btn-primary mt-6"
              >
                Book Now
              </motion.button>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ServiceTabs;