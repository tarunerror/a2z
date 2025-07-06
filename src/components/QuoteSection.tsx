'use client';

import React, { useState, useEffect } from 'react';
import { Quote } from '@/types';
import { FaQuoteLeft, FaQuoteRight, FaRandom, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface QuoteSectionProps {
  quotes: Quote[];
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ quotes }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [animation, setAnimation] = useState<'slideLeft' | 'slideRight' | 'fade'>('fade');

  const getRandomQuoteIndex = () => {
    if (quotes.length <= 1) return 0;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex);
    return newIndex;
  };

  const handleNewQuote = () => {
    setFadeIn(false);
    setAnimation('fade');
    setTimeout(() => {
      setCurrentQuoteIndex(getRandomQuoteIndex());
      setFadeIn(true);
    }, 300);
  };

  const handlePrevQuote = () => {
    setFadeIn(false);
    setAnimation('slideRight');
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
      );
      setFadeIn(true);
    }, 300);
  };

  const handleNextQuote = () => {
    setFadeIn(false);
    setAnimation('slideLeft');
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
      setFadeIn(true);
    }, 300);
  };

  // Change quote automatically every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextQuote();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [currentQuoteIndex]);

  if (!quotes || quotes.length === 0) {
    return null;
  }

  const currentQuote = quotes[currentQuoteIndex];

  const getAnimationClass = () => {
    if (!fadeIn) return 'opacity-0';
    
    switch (animation) {
      case 'slideLeft':
        return 'opacity-100 animate-slide-left';
      case 'slideRight':
        return 'opacity-100 animate-slide-right';
      default:
        return 'opacity-100 animate-fade-in';
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 dotted-pattern"></div>
      <div className="max-w-4xl mx-auto px-6">
        <div className="frosted-glass rounded-xl shadow-xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent dark:from-primary-dark dark:to-accent-dark"></div>
          <div className="absolute -left-6 -top-6 w-20 h-20 text-primary/10 dark:text-primary-dark/10">
            <FaQuoteLeft className="w-full h-full" />
          </div>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 text-primary/10 dark:text-primary-dark/10">
            <FaQuoteRight className="w-full h-full" />
          </div>
          
          <div className={`transition-all duration-300 ${getAnimationClass()}`}>
            <p className="text-2xl md:text-3xl font-medium italic text-gray-800 dark:text-gray-200 text-center mb-6">
              "{currentQuote.quote}"
            </p>
            <p className="text-right text-lg font-semibold gradient-text">
              — {currentQuote.author}
            </p>
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePrevQuote}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous quote"
            >
              <FaChevronLeft />
            </button>
            
            <div className="flex items-center">
              {Array.from({ length: Math.min(quotes.length, 5) }).map((_, idx) => {
                const dotIndex = (currentQuoteIndex + idx - 2 + quotes.length) % quotes.length;
                const isActive = dotIndex === currentQuoteIndex;
                return (
                  <div
                    key={dotIndex}
                    className={`w-2 h-2 mx-1 rounded-full transition-all ${
                      isActive 
                        ? 'bg-primary dark:bg-primary-dark scale-150' 
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                );
              })}
            </div>
            
            <button
              onClick={handleNextQuote}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next quote"
            >
              <FaChevronRight />
            </button>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleNewQuote}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent dark:from-primary-dark dark:to-accent-dark text-white px-5 py-2 rounded-md hover:opacity-90 transition-opacity shadow-md"
            >
              <FaRandom className="animate-spin-slow" />
              <span>Random Quote</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 