'use client';

import { useEffect, useState } from 'react';
import { ultimateData } from '@/data/ultimateDataTS';
import { QuoteSection } from '@/components/QuoteSection';
import { TopicCard } from '@/components/TopicCard';
import { FaArrowRight, FaChartLine, FaCode, FaLightbulb, FaLaptopCode, FaBrain, FaRocket, FaSearch, FaLock, FaTools, FaGraduationCap, FaLayerGroup, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { Topic } from '@/types';
import { getOrganizedTopics } from '@/utils/topicOrganizer';

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    completedQuestions: 0,
    totalTopics: 0
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const organizedTopics = getOrganizedTopics();
    setTopics(organizedTopics);
    
    // Calculate stats
    const totalQuestions = ultimateData.data.header.totalQuestions || 456;
    const completedQuestions = ultimateData.data.header.completedQuestions || 0;
    
    setStats({
      totalQuestions,
      completedQuestions,
      totalTopics: organizedTopics.length
    });

    // Auto-rotate featured topics
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null; // Return nothing during SSR to avoid hydration errors
  }

  const featuredTopics = [
    {
      title: "Master Algorithms",
      description: "Learn essential algorithms with step-by-step guidance and practice problems.",
      icon: <FaCode className="text-white text-3xl" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Ace Interviews",
      description: "Prepare for technical interviews with curated problem sets and solutions.",
      icon: <FaLock className="text-white text-3xl" />,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Build Skills",
      description: "Develop problem-solving skills through progressive challenges and exercises.",
      icon: <FaTools className="text-white text-3xl" />,
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section with animated background */}
      <section className="relative py-20 overflow-hidden circle-pattern">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="animate-float absolute top-10 left-10 w-20 h-20 rounded-full bg-primary opacity-10"></div>
          <div className="animate-float absolute top-20 right-20 w-32 h-32 rounded-full bg-accent opacity-10" style={{animationDelay: '1s'}}></div>
          <div className="animate-float absolute bottom-10 left-1/4 w-24 h-24 rounded-full bg-secondary opacity-10" style={{animationDelay: '2s'}}></div>
          <div className="animate-spin-slow absolute top-1/3 right-1/4 w-40 h-40 rounded-full border-4 border-dashed border-primary/20"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in text-shadow">
            DSA Learning Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Master Data Structures and Algorithms with organized topics, questions, and resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link 
              href="/topics" 
              className="px-6 py-3 gradient-bg text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
            >
              <FaRocket /> Explore Topics
            </Link>
            <Link 
              href="/search" 
              className="px-6 py-3 frosted-glass text-gray-800 dark:text-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors shadow-lg"
            >
              <FaSearch /> Search Questions
            </Link>
          </div>
        </div>

        {/* Featured Topics Carousel */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative h-48 overflow-hidden rounded-xl">
            {featuredTopics.map((topic, index) => (
              <div 
                key={index}
                className={`absolute inset-0 p-8 bg-gradient-to-r ${topic.color} rounded-xl transition-all duration-500 flex items-center ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < activeIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-6 animate-pulse-slow">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{topic.title}</h3>
                  <p className="text-white/90">{topic.description}</p>
                </div>
              </div>
            ))}
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {featuredTopics.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="frosted-glass rounded-lg p-6 text-center animate-fade-in shadow-lg hover-lift">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <FaGraduationCap />
            </div>
            <div className="text-4xl font-bold gradient-text mb-2">{stats.totalQuestions}</div>
            <p className="text-gray-700 dark:text-gray-300">Total Questions</p>
          </div>
          
          <div className="frosted-glass rounded-lg p-6 text-center animate-fade-in shadow-lg hover-lift" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <FaLayerGroup />
            </div>
            <div className="text-4xl font-bold gradient-text mb-2">{stats.totalTopics}</div>
            <p className="text-gray-700 dark:text-gray-300">DSA Topics</p>
          </div>
          
          <div className="frosted-glass rounded-lg p-6 text-center animate-fade-in shadow-lg hover-lift" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-2xl mx-auto mb-4">
              <FaCheck />
            </div>
            <div className="text-4xl font-bold gradient-text mb-2">{stats.completedQuestions}</div>
            <p className="text-gray-700 dark:text-gray-300">Completed Questions</p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <QuoteSection quotes={ultimateData.data.header.motivationalQuotes} />

      {/* Features Section */}
      <section className="py-16 dotted-pattern">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text text-shadow">
          Why Choose DSA Learning Hub?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-card dark:bg-card-dark p-8 rounded-lg shadow-lg gradient-border animate-fade-in hover-rotate">
            <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-dark/20 flex items-center justify-center mb-6 animate-pulse-slow">
              <FaCode className="text-primary dark:text-primary-dark text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-shadow">Structured Learning</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Browse through carefully categorized DSA topics from fundamentals to advanced algorithms.
            </p>
          </div>
          
          <div className="bg-card dark:bg-card-dark p-8 rounded-lg shadow-lg gradient-border animate-fade-in hover-rotate" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 rounded-full bg-accent/10 dark:bg-accent-dark/20 flex items-center justify-center mb-6 animate-bounce-slow">
              <FaBrain className="text-accent dark:text-accent-dark text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-shadow">Curated Questions</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Access hand-picked questions with links to popular platforms like LeetCode and GeeksForGeeks.
            </p>
          </div>
          
          <div className="bg-card dark:bg-card-dark p-8 rounded-lg shadow-lg gradient-border animate-fade-in hover-rotate" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 rounded-full bg-secondary/10 dark:bg-secondary-dark/20 flex items-center justify-center mb-6 animate-ripple">
              <FaChartLine className="text-secondary dark:text-secondary-dark text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-shadow">Progress Tracking</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Mark questions as complete, add notes, and bookmark important problems for later review.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold gradient-text text-shadow">
            Popular Topics
          </h2>
          <Link 
            href="/topics" 
            className="flex items-center text-accent dark:text-accent-dark hover:underline group"
          >
            View All <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {topics.slice(0, 6).map((topic, index) => (
            <div key={topic.contentPath} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <TopicCard topic={topic} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl max-w-6xl mx-auto mb-10 px-4">
        <div className="relative rounded-2xl overflow-hidden animate-pulse-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark opacity-90"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
          </div>
          <div className="relative z-10 text-white p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shadow">Ready to master DSA?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Explore our comprehensive collection of DSA topics and questions to enhance your coding skills and ace technical interviews.
            </p>
            <Link 
              href="/topics" 
              className="inline-block bg-white text-primary dark:text-primary-dark font-medium px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover-scale"
            >
              Start Learning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 