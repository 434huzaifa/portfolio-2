'use client';

import { useState } from 'react';
import { MdContentCopy, MdCheck } from 'react-icons/md';

interface CopyEmailButtonProps {
  email?: string;
  copyText?: string;
  children: React.ReactNode;
  className?: string;
}

export default function CopyEmailButton({ email, copyText, children, className = '' }: CopyEmailButtonProps) {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);

  const textToCopy = copyText || email || '';

  const handleMouseEnter = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setShowCopy(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setShowCopy(false), 1000);
    setHideTimeout(timeout);
  };

  const handleTouchStart = () => {
    const timeout = setTimeout(() => setShowCopy(true), 500);
    setTouchTimeout(timeout);
  };

  const handleTouchEnd = () => {
    if (touchTimeout) clearTimeout(touchTimeout);
    const timeout = setTimeout(() => setShowCopy(false), 1000);
    setHideTimeout(timeout);
  };

  const copyEmail = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {showCopy && (
        <button
          onClick={copyEmail}
          onTouchEnd={copyEmail}
          className="absolute right-0 -top-1/2 -translate-y-1/2 w-7 h-7 bg-accent-primary text-white rounded-full hover:bg-accent-secondary transition-all shadow-lg flex items-center justify-center z-10"
          aria-label={copied ? 'Copied!' : 'Copy email'}
        >
          {copied ? <MdCheck size={16} /> : <MdContentCopy size={14} />}
        </button>
      )}
    </div>
  );
}
