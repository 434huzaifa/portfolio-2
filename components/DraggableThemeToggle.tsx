"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Position {
  x: number;
  y: number;
}

const STORAGE_KEY = "draggable-theme-toggle-position";

export default function DraggableThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [position, setPosition] = useState<Position>({ x: 16, y: 80 });
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragData = useRef<{ offsetX: number; offsetY: number } | null>(null);

  // Load saved position
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Position;
        setPosition(parsed);
      } catch {
        /* ignore */
      }
    } else {
      // Default bottom-right placement
      setPosition({ x: window.innerWidth - 72, y: window.innerHeight - 140 });
    }
  }, []);

  // Clamp and persist position
  const updatePosition = (x: number, y: number) => {
    const maxX = window.innerWidth - 64;
    const maxY = window.innerHeight - 64;
    const clamped: Position = {
      x: Math.max(8, Math.min(x, maxX)),
      y: Math.max(8, Math.min(y, maxY)),
    };
    setPosition(clamped);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clamped));
  };

  // Keep the toggle visible when the viewport size changes
  useEffect(() => {
    const handleResize = () => {
      updatePosition(position.x, position.y);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position.x, position.y]);

  const startDrag = (clientX: number, clientY: number) => {
    const node = dragRef.current;
    if (!node) return;
    dragData.current = {
      offsetX: clientX - position.x,
      offsetY: clientY - position.y,
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", endDrag);
  };

  const onMove = (e: MouseEvent) => {
    if (!dragData.current) return;
    e.preventDefault();
    updatePosition(e.clientX - dragData.current.offsetX, e.clientY - dragData.current.offsetY);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!dragData.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    updatePosition(touch.clientX - dragData.current.offsetX, touch.clientY - dragData.current.offsetY);
  };

  const endDrag = () => {
    dragData.current = null;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", endDrag);
  };

  return (
    <div
      ref={dragRef}
      className="fixed z-50 select-none touch-none"
      style={{ left: position.x, top: position.y }}
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
      }}
    >
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold border border-border-color bg-bg-secondary hover:bg-bg-tertiary transition-all active:scale-95"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
