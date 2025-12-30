'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import portfolioData from '@/portfolio-data.json';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigation } = portfolioData;

  return (
    <nav className="sticky top-0 z-50 bg-bg-primary border-b border-border-color backdrop-blur-lg shadow-md">
      <div className="container flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-accent-primary">
          <a href="#hero">{navigation.logo}</a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none gap-8 m-0">
          {navigation.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-text-primary font-medium hover:text-accent-primary transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="bg-bg-secondary border border-border-color rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-xl transition-all hover:bg-bg-tertiary hover:rotate-[20deg]"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-none border-none text-2xl text-text-primary cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-bg-primary border-b border-border-color shadow-lg">
            <ul className="list-none py-4">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-5 text-text-primary font-medium hover:bg-bg-secondary hover:text-accent-primary transition-colors"
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
