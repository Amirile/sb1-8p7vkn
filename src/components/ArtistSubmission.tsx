import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Send } from 'lucide-react';

interface SubmissionForm {
  name: string;
  email: string;
  description: string;
  images: File[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ArtistSubmission: React.FC = () => {
  const [form, setForm] = useState<SubmissionForm>({
    name: '',
    email: '',
    description: '',
    images: []
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG and WebP images are allowed');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File size should not exceed 5MB');
      return false;
    }
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError('');
    
    const validFiles = files.filter(validateFile);
    if (validFiles.length !== files.length) {
      return;
    }

    setForm(prev => ({
      ...prev,
      images: validFiles
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate form
      if (!form.name || !form.email || !form.description) {
        setError('Please fill in all required fields');
        return;
      }

      if (form.images.length === 0) {
        setError('Please upload at least one image');
        return;
      }

      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitted form:', {
        ...form,
        images: form.images.map(img => ({
          name: img.name,
          size: img.size,
          type: img.type
        }))
      });

      setSuccess('Your submission has been received! We will review it and get back to you soon.');
      
      // Reset form
      setForm({
        name: '',
        email: '',
        description: '',
        images: []
      });
      
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while submitting your work. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Share Your Art With Us</h3>
        <p className="text-gray-600">
          We love supporting local artists! Submit your artwork for consideration in our store.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-earth-500 focus:ring-earth-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-earth-500 focus:ring-earth-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description of Your Work *
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-earth-500 focus:ring-earth-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Images *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-earth-600 hover:text-earth-500">
                  <span>Upload files</span>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          </div>
          {form.images.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">{form.images.length} file(s) selected</p>
              <ul className="mt-2 divide-y divide-gray-200">
                {form.images.map((file, index) => (
                  <li key={index} className="py-2 flex items-center">
                    <ImageIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-earth-600 hover:bg-earth-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-earth-500"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Artwork
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtistSubmission;