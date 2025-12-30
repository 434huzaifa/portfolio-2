'use client';

import { useState } from 'react';
import portfolioData from '@/portfolio-data.json';
import { getVisibleItems } from '@/lib/portfolio-utils';

export default function Experience() {
  const { experience } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  
  const visiblePositions = getVisibleItems(experience.positions);
  const displayPositions = showAll ? experience.positions : visiblePositions;

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">{experience.title}</h2>

        <div className="max-w-4xl mx-auto relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-border-color">
          {displayPositions.map((position, index) => (
            <div key={index} className="relative pl-10 mb-12 before:content-[''] before:absolute before:left-[-6px] before:top-0 before:w-3.5 before:h-3.5 before:rounded-full before:bg-accent-primary before:border-[3px] before:border-bg-primary before:shadow-[0_0_0_3px_var(--accent-primary)]">
              <div className="bg-bg-secondary rounded-xl p-8 border border-border-color transition-all hover:translate-x-1 hover:shadow-xl">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-text-primary m-0">
                    {position.position}
                  </h3>
                  <span className="text-sm text-text-tertiary font-medium bg-bg-tertiary px-3 py-1 rounded-full">
                    {position.duration}
                  </span>
                </div>
                
                <div className="flex gap-4 mb-4 flex-wrap">
                  <span className="text-lg font-semibold text-accent-primary">
                    {position.company}
                  </span>
                  <span className="text-base text-text-tertiary">
                    {position.location}
                  </span>
                </div>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {position.description}
                </p>

                <ul className="list-none p-0 mb-6">
                  {position.highlights.map((highlight, idx) => (
                    <li key={idx} className="py-2 pl-6 relative text-text-secondary leading-relaxed before:content-['▸'] before:absolute before:left-0 before:text-accent-primary before:font-bold">
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {position.techStack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {experience.positions.some(pos => pos.showInSeeMore) && (
          <div className="text-center mt-8">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="btn btn-secondary"
            >
              {showAll ? 'Show Less Experience' : 'Show More Experience'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
