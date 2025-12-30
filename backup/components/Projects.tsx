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
            <div key={category.name} className="mb-16">
              <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-accent-primary rounded-full"></span>
                {category.name}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {displayProjects.map((project) => (
                  <div key={project.name} className="bg-bg-primary rounded-2xl overflow-hidden border border-border-color shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-2 hover:border-accent-primary group">
                    {/* Thumbnail */}
                    {project.thumbnail && (
                      <div className="relative w-full h-56 bg-gradient-to-br from-bg-secondary to-bg-tertiary overflow-hidden">
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
                              <div className="text-5xl mb-3 opacity-20">🖼️</div>
                              <p className="text-xs text-text-tertiary opacity-50">Image not available</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-8 flex flex-col flex-1">
                      <div className="mb-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h4 className="text-2xl font-bold text-text-primary m-0">
                            {project.name}
                          </h4>
                          <span className="text-xs font-semibold text-accent-primary bg-accent-primary/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                            {project.type}
                          </span>
                        </div>
                        <p className="text-base font-medium text-text-secondary">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-text-secondary leading-relaxed mb-5 text-sm">
                        {project.description}
                      </p>

                      {project.problem && (
                        <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-xl p-5 mb-5 border border-border-color">
                          <div className="mb-3 text-sm text-text-secondary leading-relaxed">
                            <strong className="text-accent-primary font-semibold">Problem:</strong> {project.problem}
                          </div>
                          <div className="text-sm text-text-secondary leading-relaxed">
                            <strong className="text-accent-primary font-semibold">Solution:</strong> {project.solution}
                          </div>
                        </div>
                      )}

                      <div className="mb-5">
                        <strong className="text-text-primary font-semibold block mb-3 text-sm">Key Features</strong>
                        <ul className="list-none p-0 m-0 space-y-2">
                          {project.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="py-1 pl-6 relative text-text-secondary text-sm before:content-['→'] before:absolute before:left-0 before:text-accent-primary before:font-bold">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {(project as Project).myRole && (
                        <div className="bg-accent-primary/5 border-l-4 border-accent-primary p-4 rounded-r-lg mb-5 text-sm text-text-secondary leading-relaxed">
                          <strong className="text-accent-primary font-semibold">My Role:</strong> {(project as Project).myRole}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 bg-bg-secondary text-text-primary rounded-lg text-xs font-medium border border-border-color hover:border-accent-primary hover:bg-accent-primary/5 transition-all">{tech}</span>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-auto">
                        {/* GitHub Links */}
                        {Object.entries(project.githubLink).map(([label, url]) => (
                          <a 
                            key={label}
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 text-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-bg-secondary text-text-primary border border-border-color hover:border-accent-primary hover:bg-accent-primary/5 hover:-translate-y-0.5"
                          >
                            {label}
                          </a>
                        ))}
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-accent-primary text-white hover:bg-accent-secondary hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          Live Demo
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
