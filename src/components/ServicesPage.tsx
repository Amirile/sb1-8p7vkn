import React, { useState } from 'react';
import ServiceTabs from './ServiceTabs';
import BookingSystem from './BookingSystem';
import { AnimatePresence } from 'framer-motion';

const ServicesPage = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      
      <AnimatePresence mode="wait">
        {!showBooking ? (
          <ServiceTabs onBookService={handleBookService} />
        ) : (
          <div className="space-y-6">
            <button 
              onClick={() => setShowBooking(false)}
              className="btn-secondary mb-8"
            >
              ← Back to Services
            </button>
            <BookingSystem selectedService={selectedService} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;