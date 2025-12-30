'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import portfolioData from '@/portfolio-data.json';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigation } = portfolioData;

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
