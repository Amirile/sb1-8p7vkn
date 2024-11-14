import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">Our Story</h2>
        <p className="text-xl text-gray-600">
          Since 1980, the Bira family has been bringing creativity and craftsmanship to our community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Family Workshop"
            className="w-full h-64 object-cover rounded-xl"
          />
          <h3 className="text-2xl font-bold">Our Values</h3>
          <p className="text-gray-600">
            We believe in quality craftsmanship, sustainable practices, and passing down traditional skills
            while embracing modern innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <img
            src="https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Family Portrait"
            className="w-full h-64 object-cover rounded-xl"
          />
          <h3 className="text-2xl font-bold">Our Team</h3>
          <p className="text-gray-600">
            Each member of our family brings unique skills and passion to our business,
            from traditional carpentry to modern software development.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;