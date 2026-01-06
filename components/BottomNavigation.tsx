'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { MdAccessibility } from 'react-icons/md';
import portfolioData from '@/portfolio-data.json5';

export default function BottomNavigation() {
  const { theme, toggleTheme } = useTheme();
  const { navigation } = portfolioData;

  const navItems = [
    { label: 'About', href: '#about', icon: '👤' },
    { label: 'Skills', href: '#skills', icon: '💡' },
    { label: 'Projects', href: '#projects', icon: '💼' },
    { label: 'Contact', href: '#contact', icon: '📧' },
    { label: 'Blog', href: '/blog', icon: '📝' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-xl border-t border-border-color pb-safe">
      <div className="overflow-x-auto flex items-center py-2 px-2 gap-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px] text-text-secondary hover:text-accent-primary transition-colors whitespace-nowrap flex-shrink-0"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}
        
        {/* Theme Toggle in Bottom Nav */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px] text-text-secondary hover:text-accent-primary transition-colors flex-shrink-0"
          aria-label="Toggle theme"
        >
          <span className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
          <span className="text-[10px] font-medium">Theme</span>
        </button>
      </div>
    </nav>
  );
}
