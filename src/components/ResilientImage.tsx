import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  driveFileId: string;
  primaryUrl: string;
  fallbackUrl: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  badgeNumber?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  driveFileId,
  primaryUrl,
  fallbackUrl,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  badgeNumber,
}) => {
  const [attempt, setAttempt] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setAttempt(0);
    setLoaded(false);
  }, [primaryUrl, driveFileId]);

  const urls = [
    primaryUrl,
    fallbackUrl,
    `https://drive.google.com/uc?export=view&id=${driveFileId}`,
  ];

  const handleError = () => {
    if (attempt < urls.length - 1) {
      setAttempt((prev) => prev + 1);
    } else {
      setAttempt(urls.length);
    }
  };

  if (attempt >= urls.length) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#192E35] to-[#0B1619] text-[#FAF6F0] ${className}`}
      >
        <Layers className="w-10 h-10 text-[#F59C3B] mb-3 opacity-80" />
        {badgeNumber && (
          <span className="text-xs font-mono tabular-nums text-[#F59C3B] mb-1">
            {badgeNumber}
          </span>
        )}
        <p className="text-sm font-medium line-clamp-2 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[var(--bg-elevated)] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[var(--bg-elevated)] via-[var(--bg-surface)] to-[var(--bg-elevated)]" />
      )}
      <img
        src={urls[attempt]}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`${imgClassName} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
