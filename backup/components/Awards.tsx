import portfolioData from '@/portfolio-data.json';

export default function Awards() {
  const { awards } = portfolioData;

  return (
    <section id="awards" className="section">
      <div className="container">
        <h2 className="section-title">{awards.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {awards.items.map((award, index) => (
            <div key={index} className="bg-bg-secondary rounded-xl p-8 border border-border-color text-center transition-all flex flex-col items-center hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-accent-primary">
              <div className="text-5xl mb-4 animate-bounce">
                🏆
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 leading-snug">
                {award.title}
              </h3>
              <p className="text-base font-semibold text-accent-primary mb-4">
                {award.issuer}
              </p>
              <p className="text-text-secondary leading-relaxed mb-4 flex-grow">
                {award.description}
              </p>
              <span className="inline-block bg-bg-tertiary text-text-tertiary px-4 py-2 rounded-full font-semibold text-sm">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
