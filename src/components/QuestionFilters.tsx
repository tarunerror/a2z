'use client';

import React from 'react';
import { DifficultyLevel } from '@/types';
import { FaFilter } from 'react-icons/fa';

interface QuestionFiltersProps {
  currentFilter: DifficultyLevel;
  setFilter: (filter: DifficultyLevel) => void;
  showBookmarksOnly: boolean;
  toggleBookmarksFilter: () => void;
}

export const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  currentFilter,
  setFilter,
  showBookmarksOnly,
  toggleBookmarksFilter,
}) => {
  const filters: { label: string; value: DifficultyLevel }[] = [
    { label: 'All', value: 'all' },
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex items-center">
        <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilter(filter.value)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              currentFilter === filter.value
                ? 'bg-accent dark:bg-accent-dark text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
        
        <button
          onClick={toggleBookmarksFilter}
          className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center gap-1 ${
            showBookmarksOnly
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span>Bookmarks</span>
        </button>
      </div>
    </div>
  );
}; 