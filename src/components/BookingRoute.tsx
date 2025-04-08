import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingSystem from './BookingSystem';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type?: string;
  bookingDetails?: {
    serviceId: string;
    offering: string;
    date: string;
    time: string;
    participants: number;
  };
}

interface BookingRouteProps {
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
}

const BookingRoute: React.FC<BookingRouteProps> = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.selectedService) {
      navigate('/services');
    }
  }, [location, navigate]);

  return <BookingSystem addToCart={addToCart} />;
};

export default BookingRoute; 