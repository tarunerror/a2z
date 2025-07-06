'use client';

import { useEffect, useState } from 'react';
import { ultimateData } from '@/data/ultimateDataTS';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionFilters } from '@/components/QuestionFilters';
import { SearchBar } from '@/components/SearchBar';
import { DifficultyLevel } from '@/types';
import { mapCategoryToDifficulty } from '@/utils/difficultyMapper';
import { useUser } from '@/context/UserContext';
import { FaSearch } from 'react-icons/fa';

interface SearchResult {
  questionId: string;
  questionHeading: string;
  questionLink: string;
  gfgLink: string;
  leetCodeLink: string;
  youTubeLink: string;
  isDone: boolean;
  isBookmarked: boolean;
  userNotes: string;
  questionIndex: number;
  topicName: string;
  categoryName: string;
  categoryId: number;
}

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<DifficultyLevel>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { isBookmarked } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (searchResults.length > 0) {
      applyFilters();
    }
  }, [searchResults, currentFilter, showBookmarksOnly]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setFilteredResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const lowerCaseQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search through all topics and categories
    ultimateData.data.content.forEach((topic) => {
      topic.categoryList.forEach((category) => {
        category.questionList.forEach((question) => {
          if (question.questionHeading.toLowerCase().includes(lowerCaseQuery)) {
            results.push({
              ...question,
              topicName: topic.contentHeading,
              categoryName: category.categoryName,
              categoryId: category.categoryId,
            });
          }
        });
      });
    });

    setSearchResults(results);
    applyFilters(results);
  };

  const applyFilters = (results = searchResults) => {
    let filtered = [...results];

    // Apply difficulty filter
    if (currentFilter !== 'all') {
      filtered = filtered.filter(
        (result) => mapCategoryToDifficulty(result.categoryId) === currentFilter
      );
    }

    // Apply bookmarks filter
    if (showBookmarksOnly) {
      filtered = filtered.filter((result) => isBookmarked(result.questionId));
    }

    setFilteredResults(filtered);
  };

  const toggleBookmarksFilter = () => {
    setShowBookmarksOnly(!showBookmarksOnly);
  };

  if (!isClient) {
    return null; // Return nothing during SSR to avoid hydration errors
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
          Search Questions
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Find questions across all DSA topics
        </p>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search for questions..." />

      {hasSearched && (
        <>
          <QuestionFilters
            currentFilter={currentFilter}
            setFilter={setCurrentFilter}
            showBookmarksOnly={showBookmarksOnly}
            toggleBookmarksFilter={toggleBookmarksFilter}
          />

          {filteredResults.length > 0 ? (
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400">
                Found {filteredResults.length} result{filteredResults.length !== 1 && 's'}
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredResults.map((result) => (
                  <div key={result.questionId} className="bg-card dark:bg-card-dark rounded-lg shadow-card dark:shadow-card-dark p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {result.topicName} &gt; {result.categoryName}
                    </div>
                    <QuestionCard
                      question={result}
                      difficulty={mapCategoryToDifficulty(result.categoryId)}
                      categoryId={result.categoryId}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 bg-card dark:bg-card-dark rounded-lg shadow-card dark:shadow-card-dark">
              <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try searching with different keywords or adjusting your filters
              </p>
            </div>
          )}
        </>
      )}

      {!hasSearched && (
        <div className="text-center py-16">
          <FaSearch className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search for DSA questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Enter keywords above to find questions across all topics
          </p>
        </div>
      )}
    </div>
  );
} 