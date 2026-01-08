import portfolioData from '@/portfolio-data.json5';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { siteMetadata } = portfolioData;

  return (
    <footer className="bg-bg-primary border-t border-border-color py-6 pb-20 md:pb-6">
      <div className="container">
        <div className="text-center">
          <p className="text-text-secondary mb-1 text-xs">
            © {currentYear} {siteMetadata.author}. All rights reserved.
          </p>
          <p className="text-text-tertiary text-xs">
            Built with Next.js & TypeScript 
          </p>
          <p className="text-text-tertiary text-xs text-red-300">
            This site uses privacy-friendly analytics to improve user experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
