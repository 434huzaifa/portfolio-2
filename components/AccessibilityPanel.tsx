'use client';

import { useState, useEffect } from 'react';
import styles from './AccessibilityPanel.module.css';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    // Load saved font size from localStorage
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
  }, []);

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('fontSize', newSize.toString());
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 150);
    handleFontSizeChange(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80);
    handleFontSizeChange(newSize);
  };

  const resetFontSize = () => {
    handleFontSizeChange(100);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleButton}
        aria-label="Toggle Accessibility Panel"
        title="Accessibility Options"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
        </svg>
      </button>

      {/* Accessibility Panel */}
      <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3>Accessibility</h3>
          <button
            onClick={() => setIsOpen(false)}
            className={styles.closeButton}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          {/* Font Size Control */}
          <div className={styles.section}>
            <label className={styles.label}>Font Size</label>
            <div className={styles.controls}>
              <button
                onClick={decreaseFontSize}
                className={styles.controlButton}
                disabled={fontSize <= 80}
                aria-label="Decrease font size"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <text x="2" y="18" fontSize="16" fontWeight="bold" fill="currentColor">A-</text>
                </svg>
              </button>
              
              <span className={styles.value}>{fontSize}%</span>
              
              <button
                onClick={increaseFontSize}
                className={styles.controlButton}
                disabled={fontSize >= 150}
                aria-label="Increase font size"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <text x="2" y="18" fontSize="20" fontWeight="bold" fill="currentColor">A+</text>
                </svg>
              </button>
            </div>
            
            <button
              onClick={resetFontSize}
              className={styles.resetButton}
            >
              Reset to Default
            </button>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <p>Adjust font size for better readability</p>
          </div>
        </div>
      </div>
    </>
  );
}
