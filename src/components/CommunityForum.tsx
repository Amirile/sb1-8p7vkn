import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2 } from 'lucide-react';

const forumPosts = [
  {
    id: 1,
    author: "Emma W.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    title: "Looking for woodworking tips",
    content: "Hi everyone! I'm interested in starting woodworking. Any recommendations for beginner-friendly projects?",
    likes: 12,
    replies: 5,
    timeAgo: "2h ago"
  },
  {
    id: 2,
    author: "Michael R.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    title: "Sharing my paper craft journey",
    content: "Just finished my first handmade journal! Here's what I learned along the way...",
    likes: 24,
    replies: 8,
    timeAgo: "5h ago"
  },
  {
    id: 3,
    author: "Sarah L.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    title: "Juggling workshop experience",
    content: "Just attended the beginner's juggling workshop. It was amazing! The instructors were so patient...",
    likes: 18,
    replies: 3,
    timeAgo: "1d ago"
  }
];

const CommunityForum = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <p className="text-natural-700">Join our community discussions</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          New Post
        </motion.button>
      </div>

      <div className="space-y-4">
        {forumPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-natural-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{post.author}</h4>
                <span className="text-sm text-natural-600">{post.timeAgo}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-display font-semibold mb-2">{post.title}</h3>
            <p className="text-natural-700 mb-4">{post.content}</p>
            
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-natural-600 hover:text-earth-600">
                <Heart className="w-5 h-5" />
                {post.likes}
              </button>
              <button className="flex items-center gap-2 text-natural-600 hover:text-earth-600">
                <MessageSquare className="w-5 h-5" />
                {post.replies}
              </button>
              <button className="flex items-center gap-2 text-natural-600 hover:text-earth-600">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;