import portfolioData from '@/portfolio-data.json';

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="section bg-bg-primary">
      <div className="container">
        <h2 className="section-title">{about.title}</h2>
        
        <div className="max-w-5xl mx-auto">
          {/* Summary as bullet points */}
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 text-base text-text-secondary leading-relaxed">
              <span className="text-accent-primary mt-1 text-xl">•</span>
              <p>{about.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Achievements Card */}
            <div className="bento-card md:col-span-2">
              <h3 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {about.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                    <span className="text-accent-primary mt-0.5">→</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Areas Cards */}
            {about.focus.map((area) => (
              <div key={area} className="bento-card text-center">
                <div className="text-2xl mb-2">💼</div>
                <p className="text-sm font-medium text-text-primary">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
