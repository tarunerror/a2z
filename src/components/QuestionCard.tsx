'use client';

import React, { useState } from 'react';
import { Question } from '@/types';
import { useUser } from '@/context/UserContext';
import { FaBookmark, FaRegBookmark, FaCheck, FaUpRightFromSquare, FaNoteSticky } from 'react-icons/fa6';

interface QuestionCardProps {
  question: Question;
  difficulty: 'easy' | 'medium' | 'hard';
  categoryId: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, difficulty, categoryId }) => {
  const { isCompleted, isBookmarked, toggleQuestionComplete, toggleBookmark, getNote, saveNote } = useUser();
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState(getNote(question.questionId));
  const [isHovered, setIsHovered] = useState(false);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handleNoteSave = () => {
    saveNote(question.questionId, noteText);
    setShowNotes(false);
  };

  const difficultyColors = {
    easy: {
      bg: 'bg-difficulty-easy',
      text: 'text-difficulty-easy',
      gradient: 'linear-gradient(135deg, #4caf50, #8bc34a)'
    },
    medium: {
      bg: 'bg-difficulty-medium',
      text: 'text-difficulty-medium',
      gradient: 'linear-gradient(135deg, #ff9800, #ffc107)'
    },
    hard: {
      bg: 'bg-difficulty-hard',
      text: 'text-difficulty-hard',
      gradient: 'linear-gradient(135deg, #f44336, #ff5722)'
    },
  };

  const hasExternalLinks = question.questionLink || question.gfgLink || question.leetCodeLink || question.youTubeLink;

  return (
    <div 
      className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-lg shadow-card dark:shadow-card-dark overflow-hidden card-hover transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Difficulty indicator strip */}
      <div 
        className="h-1.5" 
        style={{ background: difficultyColors[difficulty].gradient }}
      ></div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {isCompleted(question.questionId) ? (
              <div className="w-5 h-5 rounded-full bg-difficulty-easy flex items-center justify-center mr-3 text-white text-xs">
                <FaCheck size={10} />
              </div>
            ) : (
              <div 
                className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-3 cursor-pointer hover:border-difficulty-easy transition-colors"
                onClick={() => toggleQuestionComplete(question.questionId)}
              />
            )}
            <h4 className={`text-lg font-medium ${isCompleted(question.questionId) ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
              {question.questionHeading}
            </h4>
          </div>
          <div>
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ background: difficultyColors[difficulty].gradient }}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>

        {/* Links section with animation */}
        {hasExternalLinks && (
          <div className="flex flex-wrap gap-2 mt-4 overflow-hidden">
            <div className={`flex flex-wrap gap-2 transition-all duration-500 ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              {question.questionLink && (
                <a 
                  href={question.questionLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaUpRightFromSquare size={10} />
                  <span>Question</span>
                </a>
              )}
              
              {question.gfgLink && (
                <a 
                  href={question.gfgLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaUpRightFromSquare size={10} />
                  <span>GeeksForGeeks</span>
                </a>
              )}
              
              {question.leetCodeLink && (
                <a 
                  href={question.leetCodeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaUpRightFromSquare size={10} />
                  <span>LeetCode</span>
                </a>
              )}
              
              {question.youTubeLink && (
                <a 
                  href={question.youTubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaUpRightFromSquare size={10} />
                  <span>YouTube</span>
                </a>
              )}
            </div>
            
            {!isHovered && hasExternalLinks && (
              <button 
                className="text-xs text-accent dark:text-accent-dark hover:underline"
                onClick={() => setIsHovered(true)}
              >
                View resources
              </button>
            )}
          </div>
        )}

        {showNotes && (
          <div className="mt-4 animate-fade-in">
            <textarea
              value={noteText}
              onChange={handleNoteChange}
              className="w-full p-3 border border-border dark:border-border-dark rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark focus:outline-none"
              rows={3}
              placeholder="Add your notes here..."
            />
            <div className="flex justify-end mt-2 gap-2">
              <button
                onClick={() => setShowNotes(false)}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNoteSave}
                className="px-3 py-1 text-sm text-white rounded"
                style={{ background: difficultyColors[difficulty].gradient }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-4 border-t border-border dark:border-border-dark pt-3">
          <button
            onClick={() => toggleQuestionComplete(question.questionId)}
            className={`flex items-center gap-1 text-sm ${
              isCompleted(question.questionId)
                ? 'text-difficulty-easy'
                : 'text-gray-500 dark:text-gray-400'
            } hover:opacity-80 transition-opacity`}
          >
            <FaCheck />
            <span>{isCompleted(question.questionId) ? 'Completed' : 'Mark Complete'}</span>
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`flex items-center gap-1 text-sm ${
                getNote(question.questionId)
                  ? 'text-accent dark:text-accent-dark'
                  : 'text-gray-500 dark:text-gray-400'
              } hover:opacity-80 transition-opacity`}
            >
              <FaNoteSticky />
              <span>{getNote(question.questionId) ? 'Edit Notes' : 'Add Notes'}</span>
            </button>
            
            <button
              onClick={() => toggleBookmark(question.questionId)}
              className={`flex items-center gap-1 text-sm ${
                isBookmarked(question.questionId)
                  ? 'text-yellow-500'
                  : 'text-gray-500 dark:text-gray-400'
              } hover:opacity-80 transition-opacity`}
            >
              {isBookmarked(question.questionId) ? <FaBookmark className="animate-pulse-slow" /> : <FaRegBookmark />}
              <span>{isBookmarked(question.questionId) ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 