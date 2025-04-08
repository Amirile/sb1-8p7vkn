import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Offering {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  offerings: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    price: string;
  }>;
  price: string;
}

interface BookingSystemProps {
  addToCart: (product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    type: string;
    bookingDetails: {
      serviceId: string;
      offering: string;
      date: string;
      time: string;
      participants: number;
      customMessage: string;
    };
  }) => void;
}

// Booking Rules Configuration
const BOOKING_RULES = {
  startTime: '08:00',
  endTime: '19:00',
  fridayEndTime: '14:00',
  interval: 60, // minutes between slots
  excludedDays: ['Saturday'], // Days where booking is not allowed
  specialDays: ['Friday'] // Days with special hours
};

// Helper function to generate time slots
const generateTimeSlots = (date: string): string[] => {
  if (!date) return [];

  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

  // Check if booking is allowed on this day
  if (BOOKING_RULES.excludedDays.includes(dayOfWeek)) {
    return [];
  }

  const startTime = BOOKING_RULES.startTime;
  const endTime = BOOKING_RULES.specialDays.includes(dayOfWeek) 
    ? BOOKING_RULES.fridayEndTime 
    : BOOKING_RULES.endTime;

  const slots: string[] = [];
  let currentTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  while (currentTime < endDateTime) {
    // Only add future time slots if booking for today
    const now = new Date();
    if (selectedDate.toDateString() !== now.toDateString() || currentTime > now) {
      slots.push(currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      }));
    }
    currentTime = new Date(currentTime.getTime() + BOOKING_RULES.interval * 60000);
  }

  return slots;
};

// Extract price from string (e.g., "Starting at $199" -> 199)
const extractPrice = (priceString: string): number => {
  const match = priceString.match(/\d+/);
  if (!match) {
    console.error('Invalid price format:', priceString);
    return 49; // Default fallback price
  }
  return parseInt(match[0]);
};

// Add these validation functions at the top of the file
const validateDate = (date: string): string | null => {
  if (!date) return 'Date is required';
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return 'Please select a future date';
  }
  return null;
};

const validateTime = (time: string, date: string): string | null => {
  if (!time) return 'Time is required';
  
  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  
  if (selectedDateTime < now) {
    return 'Please select a future time';
  }
  return null;
};

const validateParticipants = (count: number): string | null => {
  if (count < 1) return 'At least one participant is required';
  if (count > 10) return 'Maximum 10 participants allowed';
  return null;
};

// Custom error classes
class BookingValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookingValidationError';
  }
}

class BookingSystemError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookingSystemError';
  }
}

const BookingSystem: React.FC<BookingSystemProps> = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    date?: string;
    time?: string;
    participants?: string;
  }>({});
  const [error, setError] = useState<Error | null>(null);

  const selectedService = location.state?.selectedService as Service;
  const selectedOffering = selectedService?.offerings[0];

  // Reset form when service changes
  useEffect(() => {
    setSelectedDate('');
    setSelectedTime('');
    setParticipants(1);
    setBookingStatus('');
    setCustomMessage('');
    setShowSummary(false);
  }, [selectedService]);

  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      setAvailableSlots(slots);
      
      // Clear selected time if it's no longer available
      if (selectedTime && !slots.includes(selectedTime)) {
        setSelectedTime('');
      }
    }
  }, [selectedDate]);

  // Add validation on date change
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
    
    const dateError = validateDate(date);
    setErrors(prev => ({
      ...prev,
      date: dateError || undefined,
      time: undefined // Clear time error when date changes
    }));

    const selectedDay = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    
    if (BOOKING_RULES.excludedDays.includes(selectedDay)) {
      setBookingStatus(`Booking is not available on ${selectedDay}s.`);
    } else if (BOOKING_RULES.specialDays.includes(selectedDay)) {
      setBookingStatus(`Note: On ${selectedDay}s, bookings are only available until ${BOOKING_RULES.fridayEndTime}.`);
    } else {
      setBookingStatus('');
    }
  };

  // Add validation on time change
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    const timeError = validateTime(time, selectedDate);
    setErrors(prev => ({
      ...prev,
      time: timeError || undefined
    }));
  };

  // Add validation on participants change
  const handleParticipantsChange = (count: number) => {
    setParticipants(count);
    const participantsError = validateParticipants(count);
    setErrors(prev => ({
      ...prev,
      participants: participantsError || undefined
    }));
  };

  // Error handler
  const handleError = (error: Error) => {
    console.error('Booking system error:', error);
    setError(error);
    setIsLoading(false);

    if (error instanceof BookingValidationError) {
      setBookingStatus(error.message);
    } else {
      setBookingStatus('An unexpected error occurred. Please try again.');
    }
  };

  // Validate booking time
  const validateBookingTime = (date: string, time: string): void => {
    try {
      const bookingDateTime = new Date(`${date}T${time}`);
      const now = new Date();
      
      if (bookingDateTime < now) {
        throw new BookingValidationError('Please select a future date and time.');
      }

      const dayOfWeek = bookingDateTime.toLocaleDateString('en-US', { weekday: 'long' });
      if (BOOKING_RULES.excludedDays.includes(dayOfWeek)) {
        throw new BookingValidationError(`Booking is not available on ${dayOfWeek}s.`);
      }

      const timeStr = bookingDateTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });

      const startTime = new Date(`${date}T${BOOKING_RULES.startTime}`);
      const endTime = new Date(`${date}T${
        BOOKING_RULES.specialDays.includes(dayOfWeek) 
          ? BOOKING_RULES.fridayEndTime 
          : BOOKING_RULES.endTime
      }`);

      if (bookingDateTime < startTime || bookingDateTime > endTime) {
        throw new BookingValidationError(
          `Booking time must be between ${BOOKING_RULES.startTime} and ${
            BOOKING_RULES.specialDays.includes(dayOfWeek) 
              ? BOOKING_RULES.fridayEndTime 
              : BOOKING_RULES.endTime
          }`
        );
      }
    } catch (err) {
      if (err instanceof BookingValidationError) {
        throw err;
      }
      throw new BookingSystemError('Invalid date or time format.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBookingStatus('');
    
    try {
      // Validate all fields before submission
      const dateError = validateDate(selectedDate);
      const timeError = validateTime(selectedTime, selectedDate);
      const participantsError = validateParticipants(participants);

      const newErrors = {
        date: dateError || undefined,
        time: timeError || undefined,
        participants: participantsError || undefined
      };

      setErrors(newErrors);

      // Check if there are any errors
      if (Object.values(newErrors).some(error => error)) {
        throw new BookingValidationError('Please fix the errors before submitting.');
      }

      // Validate booking time
      validateBookingTime(selectedDate, selectedTime);

      if (!selectedOffering) {
        throw new BookingValidationError('Please select a service to book.');
      }

      setIsLoading(true);

      const basePrice = extractPrice(selectedOffering.price);

      // Create booking product
      const bookingProduct = {
        id: `booking-${Date.now()}`,
        name: `${selectedOffering.title}`,
        description: `${selectedDate} at ${selectedTime} - ${participants} participant(s)${
          customMessage ? `\nNote: ${customMessage}` : ''
        }`,
        price: basePrice * participants,
        image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        type: 'booking',
        bookingDetails: {
          serviceId: selectedService?.id || 'default',
          offering: selectedOffering.title,
          date: selectedDate,
          time: selectedTime,
          participants: participants,
          customMessage: customMessage
        }
      };

      // Simulate a delay to show loading state (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add to cart
      addToCart(bookingProduct);

      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setParticipants(1);
      setCustomMessage('');
      setShowSummary(false);
      setBookingStatus('success');

      // Navigate back to services
      navigate('/services');
    } catch (error) {
      handleError(error instanceof Error ? error : new Error('An unexpected error occurred'));
    }
  };

  if (!selectedService) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg text-center">
        <h3 className="text-2xl font-bold mb-4">No Service Selected</h3>
        <p className="text-gray-600 mb-6">Please select a service from our services page to proceed with booking.</p>
        <button
          onClick={() => navigate('/services')}
          className="bg-earth-600 text-natural-100 px-6 py-3 rounded-lg hover:bg-earth-700 transition-colors"
        >
          View Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      {error && error instanceof BookingSystemError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          <h4 className="font-medium mb-2">System Error</h4>
          <p>{error.message}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Book {selectedService.title}</h3>
        <p className="text-gray-600">{selectedService.description}</p>
        <div className="mt-4 p-4 bg-earth-50 rounded-lg">
          <h4 className="font-semibold mb-2">Booking Rules:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Regular booking hours: {BOOKING_RULES.startTime} - {BOOKING_RULES.endTime}</li>
            <li>• Friday hours: {BOOKING_RULES.startTime} - {BOOKING_RULES.fridayEndTime}</li>
            <li>• No bookings available on Saturdays</li>
            <li>• Sessions are {BOOKING_RULES.interval} minutes long</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Selected Service</label>
            <div className="p-4 bg-earth-50 rounded-lg">
              <h5 className="text-xl font-semibold mb-2">{selectedOffering?.title}</h5>
              <p className="text-gray-600 mb-2">{selectedOffering?.description}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedOffering?.duration}</span>
                </div>
                <span className="font-medium text-earth-600">{selectedOffering?.price}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-2">Select Date</label>
              <p className="text-gray-600 text-sm mb-3">Choose your preferred date</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.date 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-200 focus:border-earth-500'
                }`}
                required
              />
              {errors.date && (
                <p className="mt-1 text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Choose Time</label>
              <p className="text-gray-600 text-sm mb-3">Select an available time slot</p>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {availableSlots.map((time) => (
                    <motion.button
                      key={time}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTimeChange(time)}
                      className={`p-4 rounded-lg border-2 text-left ${
                        selectedTime === time
                          ? errors.time
                            ? 'border-red-500 bg-red-50'
                            : 'border-earth-600 bg-earth-50'
                          : 'border-gray-200 hover:border-earth-400'
                      }`}
                    >
                      <Clock className="w-5 h-5 mb-2" />
                      <div className="font-medium">{time}</div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 p-4 border-2 border-gray-200 rounded-lg">
                  {selectedDate 
                    ? "No available time slots for the selected date" 
                    : "Please select a date first"}
                </div>
              )}
              {errors.time && (
                <p className="mt-1 text-red-500 text-sm">{errors.time}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Number of Participants</label>
            <p className="text-gray-600 text-sm mb-3">Select how many people will attend (max 10)</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleParticipantsChange(Math.max(1, participants - 1))}
                className={`p-2 rounded-lg border-2 ${
                  errors.participants 
                    ? 'border-red-500' 
                    : 'border-gray-200 hover:border-earth-400'
                }`}
              >
                -
              </button>
              <span className="text-xl font-medium w-12 text-center">{participants}</span>
              <button
                type="button"
                onClick={() => handleParticipantsChange(Math.min(10, participants + 1))}
                className={`p-2 rounded-lg border-2 ${
                  errors.participants 
                    ? 'border-red-500' 
                    : 'border-gray-200 hover:border-earth-400'
                }`}
              >
                +
              </button>
            </div>
            {errors.participants && (
              <p className="mt-1 text-red-500 text-sm">{errors.participants}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Special Requests or Notes</label>
            <p className="text-gray-600 text-sm mb-3">Add any special requirements or messages for your booking</p>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-earth-500 min-h-[100px]"
              placeholder="E.g., Dietary restrictions, accessibility needs, or any specific preferences..."
            />
          </div>
        </div>

        {bookingStatus && (
          <div className={`text-center p-3 rounded-lg ${
            bookingStatus.includes('not available') 
              ? 'bg-red-50 text-red-700' 
              : 'bg-blue-50 text-blue-700'
          }`}>
            {bookingStatus}
          </div>
        )}

        {selectedOffering && selectedDate && selectedTime && (
          <div className="bg-earth-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-lg mb-2">Booking Summary</h4>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium">Service:</span> {selectedOffering.title}</li>
              <li><span className="font-medium">Duration:</span> {selectedOffering.duration}</li>
              <li><span className="font-medium">Date:</span> {selectedDate}</li>
              <li><span className="font-medium">Time:</span> {selectedTime}</li>
              <li><span className="font-medium">Participants:</span> {participants}</li>
              <li><span className="font-medium">Price per person:</span> {selectedOffering.price}</li>
              <li><span className="font-medium">Total Price:</span> ${extractPrice(selectedOffering.price) * participants}</li>
              {customMessage && (
                <li><span className="font-medium">Special Requests:</span> {customMessage}</li>
              )}
            </ul>
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full bg-earth-600 text-natural-100 py-4 rounded-lg font-medium transition-colors relative ${
            isLoading ? 'bg-earth-400 cursor-not-allowed' : 'hover:bg-earth-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-natural-100 border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            'Add to Cart'
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default BookingSystem;