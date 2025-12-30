import portfolioData from '@/portfolio-data.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { siteMetadata } = portfolioData;

  return (
    <footer className="bg-bg-primary border-t border-border-color py-6 mt-12">
      <div className="container">
        <div className="text-center">
          <p className="text-text-secondary mb-1 text-xs">
            © {currentYear} {siteMetadata.author}. All rights reserved.
          </p>
          <p className="text-text-tertiary text-xs">
            Built with Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
