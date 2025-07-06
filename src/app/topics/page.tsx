'use client';

import { useEffect, useState } from 'react';
import { ultimateData } from '@/data/ultimateDataTS';
import { TopicCard } from '@/components/TopicCard';
import { SearchBar } from '@/components/SearchBar';
import { Topic } from '@/types';
import { FaBook } from 'react-icons/fa';
import { getOrganizedTopics } from '@/utils/topicOrganizer';

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Use the organized topics instead of directly from ultimateData
    const organizedTopics = getOrganizedTopics();
    setTopics(organizedTopics);
    setFilteredTopics(organizedTopics);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTopics(topics);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = topics.filter(
      (topic) =>
        topic.contentHeading.toLowerCase().includes(lowerCaseQuery) ||
        topic.contentSubHeading.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTopics(filtered);
  };

  if (!isClient) {
    return null; // Return nothing during SSR to avoid hydration errors
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
          DSA Topics
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Browse all Data Structures and Algorithms topics
        </p>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search topics..." />

      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.contentPath} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <FaBook className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No topics found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
} 