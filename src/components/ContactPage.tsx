import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Get in Touch</h3>
          <p className="text-gray-600">
            Have questions about our products or services? We'd love to hear from you!
          </p>
          
          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Address:</span>
              123 Craft Lane, Artisan Town, AT 12345
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Phone:</span>
              (555) 123-4567
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              info@birasfamily.com
            </p>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            ></textarea>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-700 text-amber-50 py-3 px-6 rounded-lg hover:bg-green-800 transition-colors"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;