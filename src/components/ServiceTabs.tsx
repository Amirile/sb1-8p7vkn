import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Scissors, PenTool, Palette, Code, Clock, LucideIcon } from 'lucide-react';

interface Offering {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
}

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  offerings: Offering[];
  price: string;
}

interface ServiceTabsProps {
  onBookService: (offering: Offering) => void;
}

const services: Service[] = [
  {
    id: 'wood',
    icon: Hammer,
    title: 'Wood Crafts',
    description: 'From delicate jewelry to custom furniture, we create unique wooden pieces with love and skill.',
    offerings: [
      {
        id: 'wood-art',
        title: 'Custom wood art and decor',
        description: 'Unique wooden art pieces and decorative items crafted to your specifications.',
        duration: '2-4 weeks',
        price: 'Starting at $199'
      },
      {
        id: 'wood-jewelry',
        title: 'Handcrafted wood jewelry',
        description: 'Beautiful wooden jewelry pieces including necklaces, bracelets, and earrings.',
        duration: '1-2 weeks',
        price: 'Starting at $39'
      },
      {
        id: 'wood-course',
        title: 'Weekend woodworking courses',
        description: 'Learn the basics of woodworking in our weekend courses.',
        duration: '2 days',
        price: '$299 per person'
      }
    ],
    price: 'Starting at $39'
  },
  {
    id: 'paper',
    icon: PenTool,
    title: 'Paper Crafts',
    description: 'Discover our handmade paper creations, perfect for special occasions or as unique gifts. Custom orders welcome for personalized designs.',
    offerings: [
      {
        id: 'paper-cards',
        title: 'Handmade cards and invitations',
        description: 'Custom designed cards and invitations for weddings, birthdays, and special events. Each piece is handcrafted with premium papers and materials.',
        duration: '1-2 weeks',
        price: 'Starting at $12'
      },
      {
        id: 'paper-albums',
        title: 'Custom memory albums',
        description: 'Beautifully crafted photo albums and scrapbooks, perfect for preserving your precious memories. Personalized to your style and preferences.',
        duration: '2-3 weeks',
        price: 'Starting at $89'
      },
      {
        id: 'paper-boxes',
        title: 'Decorative boxes and packaging',
        description: 'Unique gift boxes and packaging solutions for special occasions. Custom sizes and designs available.',
        duration: '1-2 weeks',
        price: 'Starting at $29'
      },
      {
        id: 'paper-bookmarks',
        title: 'Artisanal bookmarks',
        description: 'Hand-crafted bookmarks using various paper crafting techniques. Perfect as gifts or personal accessories.',
        duration: '3-5 days',
        price: 'Starting at $15'
      }
    ],
    price: 'Starting at $12'
  },
  {
    id: 'juggling',
    icon: Scissors,
    title: 'Juggling',
    description: 'Learn the art of juggling or book us for your next event. We offer beginner-friendly equipment and professional entertainment services.',
    offerings: [
      {
        id: 'juggling-sets',
        title: 'Beginner juggling sets',
        description: 'High-quality juggling equipment sets for beginners, including balls, clubs, and rings. Comes with basic instruction guide.',
        duration: 'Immediate',
        price: 'Starting at $24'
      },
      {
        id: 'juggling-lessons',
        title: 'Private and group lessons',
        description: 'Learn juggling from experienced performers. Available for all skill levels, from complete beginners to advanced practitioners.',
        duration: '1 hour',
        price: '$49 per session'
      },
      {
        id: 'juggling-events',
        title: 'Event entertainment packages',
        description: 'Professional juggling performances for corporate events, parties, and festivals. Customizable shows to suit your event.',
        duration: '1-2 hours',
        price: 'Starting at $299'
      },
      {
        id: 'juggling-parties',
        title: 'Children\'s party performances',
        description: 'Interactive juggling shows and workshops perfect for children\'s parties. Includes basic juggling instruction for kids.',
        duration: '45-60 minutes',
        price: '$199 per party'
      }
    ],
    price: 'Starting at $24'
  },
  {
    id: 'art',
    icon: Palette,
    title: 'Art & Painting',
    description: 'Express yourself through various art forms. We offer original paintings and workshops in different techniques.',
    offerings: [
      {
        id: 'art-paintings',
        title: 'Original paintings',
        description: 'Commission unique paintings in various styles and mediums. Perfect for home decor or special gifts.',
        duration: '2-4 weeks',
        price: 'Starting at $299'
      },
      {
        id: 'art-mixed',
        title: 'Mixed media artwork',
        description: 'Unique pieces combining different artistic mediums and techniques. Each piece tells a story through various materials.',
        duration: '3-5 weeks',
        price: 'Starting at $199'
      },
      {
        id: 'art-workshops',
        title: 'Art technique workshops',
        description: 'Learn various painting techniques in our hands-on workshops. All materials included.',
        duration: '3 hours',
        price: '$89 per session'
      },
      {
        id: 'art-commission',
        title: 'Custom commissions',
        description: 'Commission custom artwork tailored to your vision and space. Consultation included.',
        duration: '3-6 weeks',
        price: 'Starting at $499'
      }
    ],
    price: 'Starting at $89'
  },
  {
    id: 'software',
    icon: Code,
    title: 'Software & Teaching',
    description: 'Get personalized guidance in software development or join our coding workshops. We specialize in making technology accessible.',
    offerings: [
      {
        id: 'software-basics',
        title: 'Programming basics courses',
        description: 'Introduction to programming fundamentals. Perfect for beginners wanting to start their coding journey.',
        duration: '6 weeks',
        price: '$499 per course'
      },
      {
        id: 'software-web',
        title: 'Web development consulting',
        description: 'Expert consultation for your web development projects. Get guidance on best practices and solutions.',
        duration: 'Flexible',
        price: '$149 per hour'
      },
      {
        id: 'software-custom',
        title: 'Custom software solutions',
        description: 'Tailored software development for your specific needs. Includes planning, development, and deployment.',
        duration: 'Project-based',
        price: 'Starting at $999'
      },
      {
        id: 'software-mentoring',
        title: 'One-on-one mentoring',
        description: 'Personalized mentoring sessions to help you achieve your programming goals.',
        duration: '1 hour',
        price: '$99 per session'
      }
    ],
    price: 'Starting at $149'
  }
];

const ServiceTabs: React.FC<ServiceTabsProps> = ({ onBookService }) => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  
  const activeService = services.find(service => service.id === activeTab) || services[0];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {services.map((service) => (
          <motion.button
            key={service.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(service.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === service.id
                ? 'bg-earth-600 text-natural-100'
                : 'bg-natural-200 text-natural-800 hover:bg-natural-300'
            }`}
          >
            <service.icon className="w-5 h-5" />
            {service.title}
          </motion.button>
        ))}
      </div>

      <motion.div
        key={activeService.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-center space-y-6"
      >
        <activeService.icon className="w-16 h-16 mx-auto mb-4 text-earth-600" />
        <h4 className="text-2xl font-display font-bold">{activeService.title}</h4>
        <p className="text-natural-700 max-w-2xl mx-auto">{activeService.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto my-8">
          {activeService.offerings.map((offering) => (
            <motion.div
              key={offering.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-md border-2 border-natural-200 hover:border-earth-400 transition-colors"
            >
              <h5 className="text-xl font-semibold mb-3">{offering.title}</h5>
              <p className="text-natural-600 mb-4">{offering.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{offering.duration}</span>
                </div>
                <span className="font-semibold text-earth-600">{offering.price}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBookService(offering)}
                className="w-full mt-4 bg-earth-600 text-natural-100 py-2 rounded-lg hover:bg-earth-700 transition-colors"
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceTabs;