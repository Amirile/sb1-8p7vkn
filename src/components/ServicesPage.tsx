import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceTabs from './ServiceTabs';

interface Offering {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
}

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleBookService = (offering: Offering) => {
    navigate('/book', { 
      state: { 
        selectedService: {
          id: offering.id,
          title: offering.title,
          description: offering.description,
          offerings: [offering],
          price: offering.price
        }
      } 
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <ServiceTabs onBookService={handleBookService} />
    </div>
  );
};

export default ServicesPage;