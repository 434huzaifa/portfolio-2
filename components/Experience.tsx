'use client';

import { useState } from 'react';
import portfolioData from '@/portfolio-data.json';
import Image from 'next/image';

export default function Experience() {
  const { experience } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  
  // Show only first position initially
  const displayPositions = showAll ? experience.positions : experience.positions.slice(0, 1);

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">{experience.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {displayPositions.map((position, index) => (
            <div key={index} className="bento-card group hover:-translate-y-1 transition-all">
              {/* Company Logo Section */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-color">
                <div className="w-12 h-12 rounded-xl bg-bg-tertiary border border-border-color flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-accent-primary">
                    {position.company.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-text-primary leading-tight">
                    {position.company}
                  </h3>
                  <p className="text-xs text-text-tertiary">{position.location}</p>
                </div>
              </div>

              {/* Position Info */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-accent-primary">
                    {position.position}
                  </h4>
                  <span className="text-[10px] text-text-tertiary font-medium bg-bg-tertiary px-2 py-1 rounded-full whitespace-nowrap">
                    {position.duration}
                  </span>
                </div>
              </div>

              <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                {position.description}
              </p>

              {/* Highlights - Show only first 2 */}
              <ul className="list-none p-0 mb-4 space-y-1.5">
                {position.highlights.slice(0, 2).map((highlight, idx) => (
                  <li key={idx} className="text-xs text-text-tertiary leading-relaxed flex items-start gap-2">
                    <span className="text-accent-primary mt-0.5 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {position.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-bg-tertiary text-text-secondary rounded-lg text-[10px] font-medium border border-border-color">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {experience.positions.length > 1 && (
          <div className="text-center mt-6">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="btn btn-secondary text-sm"
            >
              {showAll ? 'Show Less' : 'See More Experience'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
