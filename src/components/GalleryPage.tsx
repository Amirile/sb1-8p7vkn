import React from 'react';
import GalleryGrid from './GalleryGrid';

const GalleryPage = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center mb-12">Our Gallery</h2>
      <GalleryGrid />
    </div>
  );
};

export default GalleryPage;