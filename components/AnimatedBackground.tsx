'use client';

import { useEffect, useRef } from 'react';
import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
  const starsRef = useRef<HTMLDivElement>(null);
  const stars2Ref = useRef<HTMLDivElement>(null);
  const stars3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate random box-shadows for stars with rainbow colors
    const generateStars = (count: number) => {
      let shadows = '';
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 100%, 70%)`;
        shadows += `${x}px ${y}px ${color}${i < count - 1 ? ', ' : ''}`;
      }
      return shadows;
    };

    if (starsRef.current) {
      starsRef.current.style.boxShadow = generateStars(700);
    }
    if (stars2Ref.current) {
      stars2Ref.current.style.boxShadow = generateStars(200);
    }
    if (stars3Ref.current) {
      stars3Ref.current.style.boxShadow = generateStars(100);
    }
  }, []);

  return (
    <div className={styles.starsBackground}>
      <div ref={starsRef} className={styles.stars}></div>
      <div ref={stars2Ref} className={styles.stars2}></div>
      <div ref={stars3Ref} className={styles.stars3}></div>
    </div>
  );
}
