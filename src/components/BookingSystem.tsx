import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string;
  offerings: string[];
  price: string;
}

interface BookingSystemProps {
  addToCart: (product: any) => void;
}

const availableTimeSlots = [
  '09:00', '11:00', '14:00', '16:00'
];

const defaultService = {
  id: 'default',
  title: 'General Booking',
  description: 'Book a session with us',
  offerings: ['Individual Session', 'Group Session', 'Workshop', 'Custom Project'],
  price: 'Starting from $49'
};

const BookingSystem: React.FC<BookingSystemProps> = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');

  const selectedService = location.state?.selectedService || defaultService;

  // Extract numeric price from string (e.g., "Starting from $49" -> 49)
  const basePrice = parseInt(selectedService.price.match(/\d+/)[0]);

  // Reset form when service changes
  useEffect(() => {
    setSelectedDate('');
    setSelectedTime('');
    setParticipants(1);
    setBookingStatus('');
    setSelectedOffering('');
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedDate || !selectedTime || !selectedOffering) {
      setBookingStatus('Please select date, time, and the specific service you want to book.');
      return;
    }

    // Create booking product
    const bookingProduct = {
      id: `booking-${Date.now()}`,
      name: `${selectedOffering} - ${selectedService.title}`,
      description: `${selectedDate} at ${selectedTime} - ${participants} participant(s)`,
      price: basePrice * participants,
      image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'booking',
      bookingDetails: {
        serviceId: selectedService.id,
        offering: selectedOffering,
        date: selectedDate,
        time: selectedTime,
        participants: participants
      }
    };

    // Add to cart
    addToCart(bookingProduct);

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setParticipants(1);
    setSelectedOffering('');
    setBookingStatus('success');

    // Navigate back to services
    navigate('/services');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Book {selectedService.title}</h3>
        <p className="text-gray-600">{selectedService.description}</p>
        <p className="text-earth-600 font-semibold mt-2">
          Base price: {selectedService.price} per person
        </p>
        {participants > 1 && (
          <p className="text-earth-600 font-semibold mt-1">
            Total: ${basePrice * participants}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Select Service Type</label>
          <div className="grid grid-cols-1 gap-4">
            {selectedService.offerings.map((offering) => (
              <motion.button
                key={offering}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedOffering(offering)}
                className={`p-4 rounded-lg border-2 text-left ${
                  selectedOffering === offering
                    ? 'border-earth-600 bg-earth-50'
                    : 'border-gray-200 hover:border-earth-400'
                }`}
              >
                <div className="font-medium">{offering}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-earth-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Choose Time</label>
          <div className="grid grid-cols-2 gap-4">
            {availableTimeSlots.map((time) => (
              <motion.button
                key={time}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTime(time)}
                className={`p-4 rounded-lg border-2 text-left ${
                  selectedTime === time
                    ? 'border-earth-600 bg-earth-50'
                    : 'border-gray-200 hover:border-earth-400'
                }`}
              >
                <Clock className="w-5 h-5 mb-2" />
                <div className="font-medium">{time}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Number of Participants</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setParticipants(Math.max(1, participants - 1))}
              className="p-2 rounded-lg border-2 border-gray-200 hover:border-earth-400"
            >
              -
            </button>
            <span className="text-xl font-medium w-12 text-center">{participants}</span>
            <button
              type="button"
              onClick={() => setParticipants(Math.min(10, participants + 1))}
              className="p-2 rounded-lg border-2 border-gray-200 hover:border-earth-400"
            >
              +
            </button>
          </div>
        </div>

        {bookingStatus && bookingStatus !== 'success' && (
          <p className="text-red-500 text-center">{bookingStatus}</p>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-earth-600 text-natural-100 py-4 rounded-lg font-medium hover:bg-earth-700 transition-colors"
        >
          Add to Cart
        </motion.button>
      </form>
    </div>
  );
};

export default BookingSystem;