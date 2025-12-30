import portfolioData from '@/portfolio-data.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { siteMetadata } = portfolioData;

  return (
    <footer className="bg-bg-secondary border-t border-border-color py-8 mt-16">
      <div className="container">
        <div className="text-center">
          <p className="text-text-secondary mb-2 text-sm">
            © {currentYear} {siteMetadata.author}. All rights reserved.
          </p>
          <p className="text-text-tertiary text-sm">
            Built with Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
