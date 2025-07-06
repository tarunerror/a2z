import { DifficultyLevel } from '@/types';

// Maps category IDs to difficulty levels
export const mapCategoryToDifficulty = (categoryId: number): DifficultyLevel => {
  // In the original data structure:
  // - Category 1 is typically "Easy"
  // - Category 2 is typically "Medium"
  // - Category 3 is typically "Hard"
  
  switch (categoryId) {
    case 1:
      return 'easy';
    case 2:
      return 'medium';
    case 3:
      return 'hard';
    default:
      return 'medium'; // Default to medium if unknown
  }
};

// Function to check if a question matches the current filter
export const matchesDifficultyFilter = (categoryId: number, filter: DifficultyLevel): boolean => {
  if (filter === 'all') {
    return true;
  }
  
  return mapCategoryToDifficulty(categoryId) === filter;
}; 