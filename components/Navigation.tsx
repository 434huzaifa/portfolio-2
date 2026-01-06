'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MdAccessibility } from 'react-icons/md';
import portfolioData from '@/portfolio-data.json5';
import { TiMinus, TiPlus } from 'react-icons/ti';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(true);
  const [fontSize, setFontSize] = useState(100);
  const [isMonochrome, setIsMonochrome] = useState(false);
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

    // Load saved monochrome preference
    const savedMonochrome = localStorage.getItem('monochrome');
    if (savedMonochrome === 'true') {
      setIsMonochrome(true);
      document.documentElement.classList.add('monochrome-mode');
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

  const toggleMonochrome = () => {
    const newMonochrome = !isMonochrome;
    setIsMonochrome(newMonochrome);
    
    if (newMonochrome) {
      document.documentElement.classList.add('monochrome-mode');
      localStorage.setItem('monochrome', 'true');
    } else {
      document.documentElement.classList.remove('monochrome-mode');
      localStorage.setItem('monochrome', 'false');
    }
  };

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border-color">
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
          <li>
            <a href="/blog" className="text-sm text-text-secondary font-medium hover:text-accent-primary transition-colors">
              Blog
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {/* Accessibility Dropdown - Hidden on Mobile */}
          <div className="hidden md:block relative" ref={dropdownRef}>
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
              <div className="absolute right-0 top-12 w-64 bg-white/95 dark:bg-black/95 border border-black/20 dark:border-white/20 rounded-xl shadow-2xl backdrop-blur-xl z-50">
                <div className="px-3 py-2 border-b border-border-color">
                  <h3 className="text-sm font-semibold text-text-primary">Accessibility</h3>
                </div>
                
                <div className="p-3">
                  {/* Font Size Control */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-text-primary mb-2">
                      Font Size
                    </label>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <button
                        onClick={decreaseFontSize}
                        disabled={fontSize <= 80}
                        className="bg-bg-tertiary border border-border-color rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:bg-accent-primary hover:text-white hover:border-accent-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-bg-tertiary disabled:hover:text-current"
                        aria-label="Decrease font size"
                      >
                        <TiPlus />
                      </button>
                      
                      <span className="text-base font-semibold text-accent-primary min-w-14 text-center">
                        {fontSize}%
                      </span>
                      
                      <button
                        onClick={increaseFontSize}
                        disabled={fontSize >= 150}
                        className="bg-bg-tertiary border border-border-color rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:bg-accent-primary hover:text-white hover:border-accent-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-bg-tertiary disabled:hover:text-current"
                        aria-label="Increase font size"
                      >
                        <TiMinus />
                      </button>
                    </div>
                    
                    <button
                      onClick={resetFontSize}
                      className="w-full py-1.5 px-3 bg-bg-tertiary border border-border-color rounded-lg text-xs font-medium text-text-primary transition-all hover:bg-accent-primary hover:text-white hover:border-accent-primary"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Monochrome Mode */}
                  <div className="mb-3 pb-3 border-b border-border-color">
                    <label className="block text-xs font-medium text-text-primary mb-2">
                      Monochrome
                    </label>
                    <button
                      onClick={toggleMonochrome}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        isMonochrome
                          ? 'bg-accent-primary text-white border-accent-primary'
                          : 'bg-bg-tertiary text-text-primary border-border-color'
                      } border hover:shadow-md`}
                    >
                      {isMonochrome ? '✓ On' : 'Enable'}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-border-color">
                    <p className="text-[10px] text-text-secondary leading-tight">
                      Adjust settings for better readability
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
              <li>
                <a 
                  href="/blog" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-5 text-sm text-text-secondary font-medium hover:bg-bg-secondary hover:text-accent-primary transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
