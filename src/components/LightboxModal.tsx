import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShoppingBag,
  X,
} from 'lucide-react';
import { Language, ServiceItem, TRANSLATIONS } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface LightboxModalProps {
  service: ServiceItem | null;
  lang: Language;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectForOrder: (service: ServiceItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  service,
  lang,
  onClose,
  onPrev,
  onNext,
  onSelectForOrder,
}) => {
  if (!service) return null;

  const t = TRANSLATIONS[lang].lightbox;
  const driveViewUrl = `https://drive.google.com/file/d/${service.driveFileId}/view?usp=drivesdk`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-[var(--bg-primary)] border-b border-[var(--border-muted)]">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] truncate">
            <span className="font-mono tabular-nums text-[#F59C3B]">
              {service.number}.
            </span>
            <span className="truncate">{service.title[lang]}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              title={t.prev}
              className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
            </button>
            <button
              type="button"
              onClick={onNext}
              title={t.next}
              className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title={t.close}
              className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[#CA5628] text-[var(--text-primary)] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full 16:9 Image Viewport */}
        <div className="relative flex-1 bg-[#070E10] flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[440px]">
          <ResilientImage
            driveFileId={service.driveFileId}
            primaryUrl={service.imageUrl}
            fallbackUrl={service.fallbackImageUrl}
            alt={service.title[lang]}
            badgeNumber={service.number}
            className="w-full h-full max-h-[65vh]"
            imgClassName="w-full h-full object-contain max-h-[65vh]"
          />
        </div>

        {/* Details & Quick Action Footer */}
        <div className="p-5 bg-[var(--bg-surface)] border-t border-[var(--border-muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <p className="text-xs text-[#F59C3B] font-medium">
              {service.materialsTag[lang]}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {service.portfolioSummary[lang]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={driveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-muted)] transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#F59C3B]" />
              <span>{t.openDriveOriginal}</span>
            </a>

            <button
              type="button"
              onClick={() => onSelectForOrder(service)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-gradient text-[#0B1619] text-xs sm:text-sm font-bold cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.selectThisService}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
