'use client';

import { useState } from 'react';
import portfolioData from '@/portfolio-data.json5';
import { getVisibleItems } from '@/lib/portfolio-utils';
import Image from 'next/image';

export default function Skills() {
  const { skills } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  
  const visibleCategories = getVisibleItems(skills.categories);
  const displayCategories = showAll ? skills.categories : visibleCategories;

  const getIconUrl = (icon: string | undefined) => {
    if (!icon) return null;
    
    // If icon starts with http/https, it's an external URL
    if (icon.startsWith('http://') || icon.startsWith('https://')) {
      return icon;
    }
    
    // If icon starts with /, it's a local file path
    if (icon.startsWith('/')) {
      return icon;
    }
    
    // Otherwise, use skill-icons from GitHub
    return `https://skillicons.dev/icons?i=${icon}`;
  };

  return (
    <section id="skills" className="section bg-bg-primary">
      <div className="container">
        <h2 className="section-title">{skills.title}</h2>

        {/* Main Skills Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {displayCategories.map((category) => (
            <div key={category.name} className="bento-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💼</span>
                <h3 className="text-base font-semibold text-text-primary">{category.name}</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {category.items.map((skill) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  const skillIcon = typeof skill === 'object' && 'icon' in skill && skill.icon ? skill.icon : undefined;
                  const iconUrl = getIconUrl(skillIcon);
                  
                  return (
                    <div key={skillName} className="flex flex-col items-center gap-2 group">
                      <div className="w-12 h-12 rounded-xl bg-bg-tertiary border border-border-color flex items-center justify-center group-hover:scale-110 transition-transform">
                        {iconUrl ? (
                          <Image 
                            src={iconUrl}
                            alt={skillName}
                            width={32}
                            height={32}
                            className="w-8 h-8"
                          />
                        ) : (
                          <span className="text-lg font-bold text-accent-primary">
                            {skillName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-text-tertiary text-center leading-tight">{skillName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {skills.categories.some(cat => cat.showInSeeMore) && (
          <div className="text-center">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="btn btn-secondary"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
