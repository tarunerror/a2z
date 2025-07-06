'use client';

import { useEffect, useState } from 'react';
import { ultimateData } from '@/data/ultimateDataTS';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionFilters } from '@/components/QuestionFilters';
import { SearchBar } from '@/components/SearchBar';
import { Topic, Category, Question, DifficultyLevel } from '@/types';
import { mapCategoryToDifficulty } from '@/utils/difficultyMapper';
import { useUser } from '@/context/UserContext';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

export default function TopicDetailPage({ params }: { params: { slug: string } }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<DifficultyLevel>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isBookmarked } = useUser();

  useEffect(() => {
    setIsClient(true);
    // Find the topic that matches the slug
    const foundTopic = ultimateData.data.content.find(
      (t) => t.contentPath.replace('/', '') === params.slug
    );
    setTopic(foundTopic || null);
  }, [params.slug]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleBookmarksFilter = () => {
    setShowBookmarksOnly(!showBookmarksOnly);
  };

  if (!isClient) {
    return null; // Return nothing during SSR to avoid hydration errors
  }

  if (!topic) {
    return (
      <div className="text-center py-10">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Topic Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The topic you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/topics"
          className="inline-flex items-center text-accent dark:text-accent-dark hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back to Topics
        </Link>
      </div>
    );
  }

  // Filter questions based on search query, difficulty, and bookmarks
  const filteredCategories = topic.categoryList.map((category) => {
    const filteredQuestions = category.questionList.filter((question) => {
      const matchesSearch = !searchQuery || 
        question.questionHeading.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = currentFilter === 'all' || 
        mapCategoryToDifficulty(category.categoryId) === currentFilter;
      
      const matchesBookmark = !showBookmarksOnly || 
        isBookmarked(question.questionId);
      
      return matchesSearch && matchesDifficulty && matchesBookmark;
    });

    return {
      ...category,
      filteredQuestions,
    };
  });

  const hasQuestions = filteredCategories.some((category) => category.filteredQuestions.length > 0);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/topics"
          className="inline-flex items-center text-accent dark:text-accent-dark hover:underline mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Topics
        </Link>
        
        <h1 className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
          {topic.contentHeading}
        </h1>
        
        {topic.contentSubHeading && (
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            {topic.contentSubHeading}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{topic.contentTotalQuestions} Questions</span>
          <span>{topic.contentCompletedQuestions} Completed</span>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search questions..." />

      <QuestionFilters
        currentFilter={currentFilter}
        setFilter={setCurrentFilter}
        showBookmarksOnly={showBookmarksOnly}
        toggleBookmarksFilter={toggleBookmarksFilter}
      />

      {hasQuestions ? (
        <div className="space-y-8">
          {filteredCategories.map((category) => {
            if (category.filteredQuestions.length === 0) return null;
            
            return (
              <div key={category.categoryId} className="bg-card dark:bg-card-dark rounded-lg shadow-card dark:shadow-card-dark p-6">
                <h2 className="text-xl font-semibold text-primary dark:text-primary-dark mb-4 pb-2 border-b border-border dark:border-border-dark">
                  {category.categoryName}
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.filteredQuestions.map((question) => (
                    <QuestionCard
                      key={question.questionId}
                      question={question}
                      difficulty={mapCategoryToDifficulty(category.categoryId)}
                      categoryId={category.categoryId}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-card dark:bg-card-dark rounded-lg shadow-card dark:shadow-card-dark">
          <FaExclamationTriangle className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No questions found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
} 