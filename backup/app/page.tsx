'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import portfolioData from '@/portfolio-data.json';
import { validatePortfolioData } from '@/lib/portfolio-utils';
import { PortfolioData } from '@/lib/types';

export default function Home() {
  // Validate portfolio data
  const isValid = validatePortfolioData(portfolioData);
  
  if (!isValid) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h1>Portfolio Data Invalid</h1>
        <p>Please check the console for validation errors.</p>
      </div>
    );
  }

  const data = portfolioData as PortfolioData;

  return (
    <ThemeProvider>
      <Navigation />
      <main>
        {data.sectionOrder.map((section) => {
          switch (section) {
            case 'hero':
              return <Hero key={section} />;
            case 'about':
              return <About key={section} />;
            case 'skills':
              return <Skills key={section} />;
            case 'experience':
              return <Experience key={section} />;
            case 'projects':
              return <Projects key={section} />;
            case 'awards':
              return data.awards.visible ? <Awards key={section} /> : null;
            case 'contact':
              return <Contact key={section} />;
            default:
              return null;
          }
        })}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
