'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MdAccessibility } from 'react-icons/md';
import portfolioData from '@/portfolio-data.json';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { navigation } = portfolioData;

  useEffect(() => {
    // Load saved font size from localStorage
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccessibilityOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('fontSize', newSize.toString());
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 150);
    handleFontSizeChange(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80);
    handleFontSizeChange(newSize);
  };

  const resetFontSize = () => {
    handleFontSizeChange(100);
  };

  return (
    <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border-color">
      <div className="container flex justify-between items-center py-3">
        <div className="text-lg font-bold text-accent-primary">
          <a href="#hero">{navigation.logo}</a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none gap-6 m-0">
          {navigation.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-text-secondary font-medium hover:text-accent-primary transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Accessibility Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
              className="bg-bg-secondary border border-border-color rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-base transition-all hover:bg-bg-tertiary hover:scale-110"
              aria-label="Accessibility settings"
              title="Accessibility"
            >
              <MdAccessibility size={20} />
            </button>

            {/* Accessibility Dropdown Menu */}
            {isAccessibilityOpen && (
              <div className="absolute right-0 top-12 w-72 bg-bg-secondary border border-border-color rounded-2xl shadow-2xl backdrop-blur-xl z-50">
                <div className="p-4 border-b border-border-color">
                  <h3 className="text-base font-semibold text-text-primary">Accessibility</h3>
                </div>
                
                <div className="p-4">
                  {/* Font Size Control */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-text-primary mb-3">
                      Font Size
                    </label>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <button
                        onClick={decreaseFontSize}
                        disabled={fontSize <= 80}
                        className="bg-bg-tertiary border border-border-color rounded-lg w-12 h-12 flex items-center justify-center cursor-pointer transition-all hover:bg-accent-primary hover:text-white hover:border-accent-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-bg-tertiary disabled:hover:text-current"
                        aria-label="Decrease font size"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <text x="2" y="18" fontSize="16" fontWeight="bold" fill="currentColor">A-</text>
                        </svg>
                      </button>
                      
                      <span className="text-lg font-semibold text-accent-primary min-w-16 text-center">
                        {fontSize}%
                      </span>
                      
                      <button
                        onClick={increaseFontSize}
                        disabled={fontSize >= 150}
                        className="bg-bg-tertiary border border-border-color rounded-lg w-12 h-12 flex items-center justify-center cursor-pointer transition-all hover:bg-accent-primary hover:text-white hover:border-accent-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-bg-tertiary disabled:hover:text-current"
                        aria-label="Increase font size"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <text x="2" y="18" fontSize="20" fontWeight="bold" fill="currentColor">A+</text>
                        </svg>
                      </button>
                    </div>
                    
                    <button
                      onClick={resetFontSize}
                      className="w-full py-2 px-4 bg-bg-tertiary border border-border-color rounded-lg text-sm font-medium text-text-primary transition-all hover:bg-accent-primary hover:text-white hover:border-accent-primary"
                    >
                      Reset to Default
                    </button>
                  </div>

                  <div className="pt-3 border-t border-border-color">
                    <p className="text-xs text-text-secondary">
                      Adjust font size for better readability
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-bg-secondary border border-border-color rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-base transition-all hover:bg-bg-tertiary hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-none border-none text-xl text-text-primary cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-bg-primary/95 backdrop-blur-xl border-b border-border-color shadow-xl">
            <ul className="list-none py-2">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-5 text-sm text-text-secondary font-medium hover:bg-bg-secondary hover:text-accent-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
