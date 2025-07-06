'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ui/ThemeToggle';
import { useUser } from '@/context/UserContext';
import { FaSearch, FaBookmark, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaBars, FaTimes, FaHome, FaLayerGroup, FaCode } from 'react-icons/fa';

export const Navigation = () => {
  const pathname = usePathname();
  const { user, login, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, email);
    setShowLoginModal(false);
    setUsername('');
    setEmail('');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome className="w-4 h-4" /> },
    { name: 'Topics', path: '/topics', icon: <FaLayerGroup className="w-4 h-4" /> },
    { name: 'Bookmarks', path: '/bookmarks', icon: <FaBookmark className="w-4 h-4" /> },
    { name: 'Search', path: '/search', icon: <FaSearch className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-card-dark/90 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-card-dark'
      }`}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                <div className="w-9 h-9 bg-primary dark:bg-primary-dark rounded-lg flex items-center justify-center shadow-md">
                  <FaCode className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark">
                  DSA Learning Hub
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`px-4 py-2 rounded-lg inline-flex items-center space-x-2 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
                {user.isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center">
                        <FaUserCircle className="w-5 h-5 text-primary dark:text-primary-dark" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.username}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="inline-flex items-center space-x-1 text-sm text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary dark:bg-primary-dark text-white hover:bg-primary-dark dark:hover:bg-primary transition-colors"
                  >
                    <FaSignInAlt className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden border-t border-gray-200 dark:border-gray-700 ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {user.isLoggedIn ? (
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center">
                    <FaUserCircle className="w-5 h-5 text-primary dark:text-primary-dark" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-white bg-primary dark:bg-primary-dark rounded-lg hover:bg-primary-dark dark:hover:bg-primary transition-colors"
              >
                <FaSignInAlt className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div 
            className="bg-white dark:bg-card-dark rounded-xl shadow-xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back</h2>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary rounded-lg transition-colors"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 