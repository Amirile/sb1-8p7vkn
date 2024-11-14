import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Send } from 'lucide-react';

const ArtistSubmission = () => {
  const [images, setImages] = useState([]);
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic
    console.log('Submitted images:', images);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Share Your Art With Us</h3>
        <p className="text-gray-600">
          We love supporting local artists! Submit your artwork for consideration in our store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-lg font-medium">About You</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-4">Your Artwork</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="artwork-upload"
            />
            <label
              htmlFor="artwork-upload"
              className="cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium">Drop your images here</p>
                <p className="text-sm text-gray-500">or click to upload</p>
              </motion.div>
            </label>
          </div>
          {images.length > 0 && (
            <div className="mt-4 flex gap-4 flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                  <span className="text-sm text-gray-600 block mt-1">
                    {image.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            placeholder="Tell us about your artwork..."
            rows={4}
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
          ></textarea>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Submit Artwork
        </motion.button>
      </form>
    </div>
  );
};

export default ArtistSubmission;