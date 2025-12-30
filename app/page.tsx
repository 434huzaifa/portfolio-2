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
import AnimatedBackground from '@/components/AnimatedBackground';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { ThemeProvider } from '@/contexts/ThemeContext';
import portfolioData from '@/portfolio-data.json';
import { validatePortfolioData } from '@/lib/portfolio-utils';

export default function Home() {
  // Validate portfolio data
  const validationResult = validatePortfolioData(portfolioData);
  
  if (!validationResult.isValid) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bento-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">⚠️</span>
              <h1 className="text-3xl font-bold text-accent-primary">Portfolio Data Validation Errors</h1>
            </div>
            
            <p className="text-text-secondary mb-6">
              There are {validationResult.errors.length} issue(s) with your portfolio data. 
              Please fix the following errors in <code className="px-2 py-1 bg-bg-tertiary rounded text-accent-primary">portfolio-data.json</code>:
            </p>
            
            <div className="space-y-3">
              {validationResult.errors.map((error, index) => (
                <div key={index} className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">{index + 1}.</span>
                    <div className="flex-1">
                      <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-accent-primary/10 border border-accent-primary/30 rounded-xl">
              <h3 className="text-sm font-semibold text-accent-primary mb-2">💡 Quick Fix Guide:</h3>
              <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
                <li>Check the field path (e.g., "hero → name") to locate the issue</li>
                <li>Ensure all required fields have valid values</li>
                <li>Verify URLs are properly formatted (must start with http:// or https://)</li>
                <li>Check that arrays have at least one item where required</li>
                <li>Make sure email addresses are valid</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                🔄 Reload After Fixing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const data = validationResult.data!;

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <AccessibilityPanel />
      <Navigation />
      <main>
        {data.sectionOrder.map((section: string) => {
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
