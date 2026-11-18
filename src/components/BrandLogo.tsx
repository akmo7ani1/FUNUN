import React, { useState, useEffect } from 'react';
import { BRAND_LOGOS, ThemeMode, Language } from '../data/siteData';

interface BrandLogoProps {
  theme: ThemeMode;
  lang: Language;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme,
  lang,
  size = 'md',
  showText = true,
}) => {
  const logoConfig = theme === 'dark' ? BRAND_LOGOS.dark : BRAND_LOGOS.light;
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    setAttempt(0);
  }, [theme]);

  const urls = [
    logoConfig.primaryUrl,
    logoConfig.fallbackUrl,
    `https://drive.google.com/uc?export=view&id=${logoConfig.fileId}`,
  ];

  const sizeClasses = {
    sm: 'h-10 sm:h-11 max-w-[150px]',
    md: 'h-11 sm:h-13 max-w-[180px]',
    lg: 'h-14 sm:h-16 max-w-[220px]',
  }[size];

  return (
    <div className="flex items-center gap-3 shrink-0">
      {attempt < urls.length ? (
        <img
          src={urls[attempt]}
          alt={
            lang === 'ar'
              ? 'شعار شركة فنون الريشة للدعاية والإعلان'
              : 'Funun Al-Risha Advertising & Printing Co. Logo'
          }
          referrerPolicy="no-referrer"
          onError={() => setAttempt((prev) => prev + 1)}
          className={`${sizeClasses} w-auto object-contain select-none transition-transform duration-200`}
        />
      ) : null}
      {showText && (
        <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0">
          {lang === 'ar' ? 'فنون الريشة للدعاية والإعلان' : 'FUNUN AL RISHA'}
        </span>
      )}
    </div>
  );
};
