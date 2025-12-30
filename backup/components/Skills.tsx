'use client';

import { useState } from 'react';
import portfolioData from '@/portfolio-data.json';
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

        {/* Main Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {displayCategories.map((category) => (
            <div 
              key={category.name} 
              className="bg-bg-secondary rounded-2xl p-8 border border-border-color shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
                <span className="w-1 h-8 bg-accent-primary rounded-full"></span>
                {category.name}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {category.items.map((skill) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name;
                  const skillIcon = typeof skill === 'object' && 'icon' in skill && skill.icon ? skill.icon : undefined;
                  const iconUrl = getIconUrl(skillIcon);
                  
                  return (
                    <div 
                      key={skillName} 
                      className="flex items-center gap-3 bg-bg-primary rounded-xl px-4 py-3 border border-border-color hover:border-accent-primary hover:-translate-y-1 transition-all duration-200 group"
                    >
                      {iconUrl ? (
                        <div className="w-8 h-8 relative flex-shrink-0 transition-transform group-hover:scale-110">
                          <Image 
                            src={iconUrl}
                            alt={skillName}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center bg-accent-primary/10 rounded-lg flex-shrink-0">
                          <span className="text-lg font-bold text-accent-primary">
                            {skillName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium text-text-primary">{skillName}</span>
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
