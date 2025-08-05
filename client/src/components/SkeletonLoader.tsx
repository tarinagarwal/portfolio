import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'image';
  lines?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  variant = 'text',
  lines = 1 
}) => {
  const pulseAnimation = {
    animate: {
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  if (variant === 'text') {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          //@ts-ignore
          <motion.div
            key={index}
            className={`bg-gray-700 rounded h-4 mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
            {...pulseAnimation}
          />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 ${className}`}
        {...pulseAnimation}
      >
        <div className="bg-gray-700 rounded h-48 mb-4" />
        <div className="bg-gray-700 rounded h-6 mb-2" />
        <div className="bg-gray-700 rounded h-4 w-3/4" />
      </motion.div>
    );
  }

  if (variant === 'avatar') {
    return (
      <motion.div
        className={`bg-gray-700 rounded-full ${className}`}
        {...pulseAnimation}
      />
    );
  }

  if (variant === 'image') {
    return (
      <motion.div
        className={`bg-gray-700 rounded-lg ${className}`}
        {...pulseAnimation}
      />
    );
  }

  return (
    <motion.div
      className={`bg-gray-700 rounded ${className}`}
      {...pulseAnimation}
    />
  );
};

export default SkeletonLoader;