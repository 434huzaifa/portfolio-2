'use client';

import portfolioData from "@/portfolio-data.json5";
import Image from "next/image";
import CopyEmailButton from './CopyEmailButton';

export default function Hero() {
  const { hero } = portfolioData;

  return (
    <section id="hero" className="flex items-center py-5 bg-bg-primary">
      <div className="container">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
          {/* Profile Card - Takes 2 columns on desktop */}
          <div className="md:col-span-2 bento-card">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Image */}
              {hero.showPhoto && hero.photo && (
                <div className="flex-shrink-0">
                  <div className="relative group">
                    {/* Backlight glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-blue-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    {/* Photo */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-accent-primary shadow-xl">
                      <Image
                        src={hero.photo}
                        alt={hero.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-text-tertiary">👋 Welcome</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                  {hero.name}
                </h1>
                <p className="text-base text-accent-primary mb-4 font-medium">
                  {hero.title}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {hero.description}
                </p>

                {/* Email */}
                <CopyEmailButton email={hero.socialLinks.email.replace("mailto:", "")} className="inline-block">
                  <a
                    href={`mailto:${hero.socialLinks.email}`}
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                    {hero.socialLinks.email.replace("mailto:", "")}
                  </a>
                </CopyEmailButton>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="bento-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-text-tertiary font-medium">
                🔗 Connect
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CopyEmailButton copyText={hero.socialLinks.github}>
                <a
                  href={hero.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl hover:bg-bg-primary transition-colors border border-border-color"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-text-primary"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-xs font-medium text-text-secondary">
                    GitHub
                  </span>
                </a>
              </CopyEmailButton>

              <CopyEmailButton copyText={hero.socialLinks.linkedin}>
                <a
                  href={hero.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl hover:bg-bg-primary transition-colors border border-border-color"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-text-primary"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-xs font-medium text-text-secondary">
                    LinkedIn
                  </span>
                </a>
              </CopyEmailButton>

              <CopyEmailButton copyText={hero.socialLinks.whatsapp}>
                <a
                  href={hero.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl hover:bg-bg-primary transition-colors border border-border-color"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-500"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-xs font-medium text-text-secondary">
                    WhatsApp
                  </span>
                </a>
              </CopyEmailButton>

              <a
                href="/Huzaifa_Engineer.pdf"
                download
                className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl hover:bg-bg-primary transition-colors border border-border-color"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-text-primary"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="text-xs font-medium text-text-secondary">
                  Resume
                </span>
              </a>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-2 bento-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-text-tertiary font-medium">
                💼 Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hero.primaryTech.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="bento-card flex flex-col gap-3">
            <a href={hero.cta.primary.link} className="btn btn-primary w-full">
              {hero.cta.primary.text}
            </a>
            <a
              href={hero.cta.secondary.link}
              className="btn btn-secondary w-full"
            >
              {hero.cta.secondary.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
