'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserAuth, UserProgress, Question } from '../types';

interface UserContextType {
  user: UserAuth;
  userProgress: UserProgress;
  login: (username: string, email: string) => void;
  logout: () => void;
  toggleQuestionComplete: (questionId: string) => void;
  toggleBookmark: (questionId: string) => void;
  saveNote: (questionId: string, note: string) => void;
  isCompleted: (questionId: string) => boolean;
  isBookmarked: (questionId: string) => boolean;
  getNote: (questionId: string) => string;
}

const defaultUserProgress: UserProgress = {
  completedQuestions: {},
  bookmarkedQuestions: {},
  notes: {},
};

const defaultUser: UserAuth = {
  isLoggedIn: false,
  username: '',
  email: '',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserAuth>(defaultUser);
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultUserProgress);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('dsa_user');
    const storedProgress = localStorage.getItem('dsa_progress');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data from localStorage');
      }
    }

    if (storedProgress) {
      try {
        setUserProgress(JSON.parse(storedProgress));
      } catch (e) {
        console.error('Failed to parse progress data from localStorage');
      }
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dsa_user', JSON.stringify(user));
  }, [user]);

  // Save progress data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dsa_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const login = (username: string, email: string) => {
    setUser({
      isLoggedIn: true,
      username,
      email,
    });
  };

  const logout = () => {
    setUser(defaultUser);
  };

  const toggleQuestionComplete = (questionId: string) => {
    setUserProgress(prev => ({
      ...prev,
      completedQuestions: {
        ...prev.completedQuestions,
        [questionId]: !prev.completedQuestions[questionId],
      },
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setUserProgress(prev => ({
      ...prev,
      bookmarkedQuestions: {
        ...prev.bookmarkedQuestions,
        [questionId]: !prev.bookmarkedQuestions[questionId],
      },
    }));
  };

  const saveNote = (questionId: string, note: string) => {
    setUserProgress(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [questionId]: note,
      },
    }));
  };

  const isCompleted = (questionId: string) => {
    return !!userProgress.completedQuestions[questionId];
  };

  const isBookmarked = (questionId: string) => {
    return !!userProgress.bookmarkedQuestions[questionId];
  };

  const getNote = (questionId: string) => {
    return userProgress.notes[questionId] || '';
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userProgress,
        login,
        logout,
        toggleQuestionComplete,
        toggleBookmark,
        saveNote,
        isCompleted,
        isBookmarked,
        getNote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 