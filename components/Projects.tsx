'use client';

import { useState } from 'react';
import portfolioData from '@/portfolio-data.json';
import { getVisibleItems } from '@/lib/portfolio-utils';
import { Project } from '@/lib/types';
import Image from 'next/image';

export default function Projects() {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="projects" className="section bg-bg-secondary">
      <div className="container">
        <h2 className="section-title">{projects.title}</h2>

        {projects.categories.map((category) => {
          const visibleProjects = getVisibleItems(category.projects as Project[]);
          const displayProjects = showAll ? category.projects : visibleProjects;

          return (
            <div key={category.name} className="mb-12">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {category.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {displayProjects.map((project) => (
                  <div key={project.name} className="bento-card flex flex-col group hover:-translate-y-1 transition-all">
                    {/* Thumbnail */}
                    {project.thumbnail && (
                      <div className="relative w-full h-48 bg-bg-tertiary overflow-hidden rounded-2xl mb-4">
                        {!imageErrors[project.name] ? (
                          <Image 
                            src={project.thumbnail}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={() => setImageErrors(prev => ({ ...prev, [project.name]: true }))}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center p-4">
                              <div className="text-4xl mb-2 opacity-20">🖼️</div>
                              <p className="text-xs text-text-tertiary opacity-50">Image not available</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-col flex-1">
                      <div className="mb-3">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="text-lg font-bold text-text-primary">
                            {project.name}
                          </h4>
                          <span className="text-[10px] font-semibold text-accent-primary bg-accent-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
                            {project.type}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-text-tertiary text-xs leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-bg-tertiary text-text-secondary rounded-lg text-[10px] font-medium border border-border-color">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 text-text-tertiary text-[10px]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        {Object.entries(project.githubLink).map(([label, url]) => (
                          <a 
                            key={label}
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 text-center px-3 py-2 rounded-full font-medium text-xs transition-all bg-bg-tertiary text-text-primary border border-border-color hover:border-accent-primary hover:bg-accent-primary/5"
                          >
                            {label}
                          </a>
                        ))}
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-3 py-2 rounded-full font-medium text-xs transition-all bg-accent-primary text-white hover:bg-accent-secondary"
                        >
                          Demo
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {projects.categories.some(cat => 
          (cat.projects as Project[]).some(proj => proj.showInSeeMore)
        ) && (
          <div className="text-center mt-8">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="btn btn-secondary"
            >
              {showAll ? 'Show Less Projects' : 'Show More Projects'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
