'use client';

import React from 'react';
import Link from 'next/link';
import { Topic } from '@/types';
import { FaChevronRight, FaCode, FaLaptopCode, FaNetworkWired, FaTree, FaDatabase, FaLayerGroup, FaSort, FaSearch, FaLink, FaListAlt, FaRecycle, FaProjectDiagram, FaRegObjectGroup, FaAlignLeft, FaChartBar } from 'react-icons/fa';

interface TopicCardProps {
  topic: Topic;
}

// Map topic names to icons
const topicIcons: Record<string, React.ReactElement> = {
  'Basics': <FaCode />,
  'Sorting Techniques': <FaSort />,
  'Arrays': <FaLayerGroup />,
  'Binary Search': <FaSearch />,
  'Strings': <FaAlignLeft />,
  'Linked List': <FaLink />,
  'Recursion': <FaRecycle />,
  'Two Pointers': <FaListAlt />,
  'Bit Manipulation': <FaNetworkWired />,
  'Stack & Queue': <FaLayerGroup />,
  'Heaps': <FaChartBar />,
  'Greedy Algorithms': <FaLaptopCode />,
  'Binary Tree': <FaTree />,
  'Binary Search Tree': <FaTree />,
  'Graphs': <FaProjectDiagram />,
  'Dynamic Programming': <FaRegObjectGroup />,
  'Tries': <FaTree />,
  'Strings (Hard Problems and Standard Algorithms)': <FaAlignLeft />,
};

// Function to generate a unique gradient for each topic
const getTopicGradient = (topicName: string): string => {
  const hash = topicName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;
  
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 50%))`;
};

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const slug = topic.contentPath.replace('/', '');
  const icon = topicIcons[topic.contentHeading] || <FaCode />;
  const gradient = getTopicGradient(topic.contentHeading);
  
  // Calculate completion percentage
  const completionPercentage = topic.contentTotalQuestions > 0 
    ? Math.round((topic.contentCompletedQuestions / topic.contentTotalQuestions) * 100) 
    : 0;
  
  return (
    <Link href={`/topics/${slug}`}>
      <div className="card-hover bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-lg shadow-card dark:shadow-card-dark overflow-hidden">
        <div 
          className="h-2" 
          style={{ background: gradient }}
        ></div>
        
        <div className="p-5">
          <div className="flex items-center mb-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white"
              style={{ background: gradient }}
            >
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {topic.contentHeading}
            </h3>
          </div>
          
          {topic.contentSubHeading && (
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {topic.contentSubHeading}
            </p>
          )}
          
          <div className="mt-4 mb-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${completionPercentage}%`,
                  background: gradient
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                {topic.contentCompletedQuestions}/{topic.contentTotalQuestions} Questions
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {completionPercentage}% Complete
              </span>
            </div>
          </div>
          
          <div className="flex justify-end items-center mt-4 text-sm">
            <span className="flex items-center text-accent dark:text-accent-dark font-medium">
              Explore <FaChevronRight className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}; 