import portfolioData from '@/portfolio-data.json';

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="section bg-bg-secondary">
      <div className="container">
        <h2 className="section-title">{about.title}</h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-text-secondary mb-12 text-center leading-relaxed">
            {about.summary}
          </p>

          <div className="bg-bg-primary rounded-2xl p-8 mb-8 border border-border-color shadow-lg">
            <h3 className="text-2xl mb-6 text-text-primary flex items-center gap-3">
              <span className="w-1 h-8 bg-accent-primary rounded-full"></span>
              Key Achievements
            </h3>
            <ul className="list-none p-0 space-y-3">
              {about.highlights.map((highlight, index) => (
                <li key={index} className="py-2 pl-6 relative text-text-secondary leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-accent-primary before:font-bold">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl mb-6 text-text-primary flex items-center gap-3 justify-center">
              <span className="w-1 h-8 bg-accent-primary rounded-full"></span>
              Focus Areas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {about.focus.map((area) => (
                <div key={area} className="bg-bg-primary border border-border-color rounded-2xl p-6 text-center font-semibold text-text-primary shadow-lg transition-all hover:border-accent-primary hover:bg-accent-primary/5 hover:-translate-y-1 hover:shadow-xl">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
