'use client';

import { useEffect, useState } from 'react';
import { ultimateData } from '@/data/ultimateDataTS';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionFilters } from '@/components/QuestionFilters';
import { SearchBar } from '@/components/SearchBar';
import { DifficultyLevel, Question } from '@/types';
import { mapCategoryToDifficulty } from '@/utils/difficultyMapper';
import { useUser } from '@/context/UserContext';
import { FaBookmark } from 'react-icons/fa';

interface BookmarkedQuestion extends Question {
  topicName: string;
  categoryName: string;
  categoryId: number;
}

export default function BookmarksPage() {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<BookmarkedQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<BookmarkedQuestion[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<DifficultyLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { userProgress } = useUser();

  useEffect(() => {
    setIsClient(true);
    loadBookmarkedQuestions();
  }, []);

  // Re-load bookmarked questions when user progress changes
  useEffect(() => {
    if (isClient) {
      loadBookmarkedQuestions();
    }
  }, [userProgress, isClient]);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [bookmarkedQuestions, currentFilter, searchQuery]);

  const loadBookmarkedQuestions = () => {
    const bookmarked: BookmarkedQuestion[] = [];

    // Loop through all topics and categories to find bookmarked questions
    ultimateData.data.content.forEach((topic) => {
      topic.categoryList.forEach((category) => {
        category.questionList.forEach((question) => {
          if (userProgress.bookmarkedQuestions[question.questionId]) {
            bookmarked.push({
              ...question,
              topicName: topic.contentHeading,
              categoryName: category.categoryName,
              categoryId: category.categoryId,
            });
          }
        });
      });
    });

    setBookmarkedQuestions(bookmarked);
    setFilteredQuestions(bookmarked);
  };

  const applyFilters = () => {
    let filtered = [...bookmarkedQuestions];

    // Apply difficulty filter
    if (currentFilter !== 'all') {
      filtered = filtered.filter(
        (question) => mapCategoryToDifficulty(question.categoryId) === currentFilter
      );
    }

    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (question) =>
          question.questionHeading.toLowerCase().includes(lowerCaseQuery) ||
          question.topicName.toLowerCase().includes(lowerCaseQuery) ||
          question.categoryName.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredQuestions(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (!isClient) {
    return null; // Return nothing during SSR to avoid hydration errors
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
          Bookmarked Questions
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Your saved questions for later review
        </p>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search bookmarked questions..." />

      <QuestionFilters
        currentFilter={currentFilter}
        setFilter={setCurrentFilter}
        showBookmarksOnly={false}
        toggleBookmarksFilter={() => {}}
      />

      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.questionId}
              question={question}
              difficulty={mapCategoryToDifficulty(question.categoryId)}
              categoryId={question.categoryId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card dark:bg-card-dark rounded-lg shadow-card dark:shadow-card-dark">
          <FaBookmark className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No bookmarked questions
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {bookmarkedQuestions.length > 0
              ? 'Try adjusting your search or filters'
              : 'Bookmark questions to save them for later'}
          </p>
        </div>
      )}
    </div>
  );
} 