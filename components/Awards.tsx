import portfolioData from "@/portfolio-data.json5";

export default function Awards() {
  const { awards } = portfolioData;

  return (
    <section id="awards" className="section bg-bg-primary">
      <div className="container">
        <h2 className="section-title">{awards.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {awards.items.map((award, index) => {
            const Wrapper: React.ElementType = award.link ? 'a' : 'div';
            const wrapperProps = award.link
              ? {
                  href: award.link,
                  target: '_blank',
                  rel: 'noreferrer noopener',
                }
              : {};

            return (
              <Wrapper
                key={index}
                className="bento-card text-center transition hover:-translate-y-0.5 hover:shadow-lg"
                {...wrapperProps}
              >
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-bold text-text-primary mb-2 leading-snug">
                  {award.title}
                </h3>
                <p className="text-sm font-semibold text-accent-primary mb-3">
                  {award.organization}
                </p>
                {award.description && (
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {award.description}
                  </p>
                )}
                <span className="inline-block bg-bg-tertiary text-text-tertiary px-3 py-1.5 rounded-full text-xs font-medium">
                  {award.date}
                </span>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
