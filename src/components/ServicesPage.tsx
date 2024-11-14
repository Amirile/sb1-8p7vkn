import React from 'react';
import ServiceTabs from './ServiceTabs';

const ServicesPage = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <ServiceTabs />
    </div>
  );
};

export default ServicesPage;