import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';

const services = [
  { id: 'carpentry', name: 'Carpentry Workshop', duration: 120, price: 79 },
  { id: 'painting', name: 'Painting Class', duration: 90, price: 59 },
  { id: 'juggling', name: 'Juggling Lesson', duration: 60, price: 49 },
  { id: 'software', name: 'Coding Workshop', duration: 120, price: 89 }
];

const availableTimeSlots = [
  '09:00', '11:00', '14:00', '16:00'
];

const BookingSystem = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log({ selectedService, selectedDate, selectedTime, participants });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Choose Activity</label>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <motion.button
                key={service.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedService(service.id)}
                className={`p-4 rounded-lg border-2 text-left ${
                  selectedService === service.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-400'
                }`}
              >
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-gray-600">${service.price}</div>
                <div className="text-sm text-gray-500">{service.duration} mins</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium mb-2">
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Choose Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              <Clock className="inline-block w-5 h-5 mr-2" />
              Choose Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
            >
              <option value="">Select a time</option>
              {availableTimeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">
            <Users className="inline-block w-5 h-5 mr-2" />
            Number of Participants
          </label>
          <input
            type="number"
            min="1"
            max="6"
            value={participants}
            onChange={(e) => setParticipants(Number(e.target.value))}
            className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Book Session
        </motion.button>
      </form>
    </div>
  );
};

export default BookingSystem;