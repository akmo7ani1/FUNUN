import React, { useState } from 'react';
import {
  Check,
  Maximize2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
} from 'lucide-react';
import { Language, ServiceItem, TRANSLATIONS } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import {
  buildSingleServiceWhatsAppMessage,
  buildWhatsAppRedirectUrl,
} from '../utils/whatsappFormatter';

interface ServiceCardProps {
  service: ServiceItem;
  lang: Language;
  inCartCount: number;
  onAddToCart: (
    serviceId: string,
    optionIndex: number,
    specIndex: number,
    quantity: number,
    itemNote: string
  ) => void;
  onOpenLightbox: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  lang,
  inCartCount,
  onAddToCart,
  onOpenLightbox,
}) => {
  const t = TRANSLATIONS[lang].services;
  const [optionIndex, setOptionIndex] = useState<number>(0);
  const [specIndex, setSpecIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [itemNote, setItemNote] = useState<string>('');
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(service.id, optionIndex, specIndex, quantity, itemNote);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const instantWhatsAppUrl = buildWhatsAppRedirectUrl(
    buildSingleServiceWhatsAppMessage(
      service,
      optionIndex,
      specIndex,
      quantity,
      itemNote,
      lang
    )
  );

  return (
    <article
      id={service.id}
      className="flex flex-col rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] hover:border-[var(--border-subtle)] transition-colors duration-200 overflow-hidden shadow-brand-card"
    >
      {/* Image Header with Lightbox Zoom Trigger */}
      <div className="relative aspect-[16/10] w-full group overflow-hidden bg-[var(--bg-elevated)]">
        <ResilientImage
          driveFileId={service.driveFileId}
          primaryUrl={service.imageUrl}
          fallbackUrl={service.fallbackImageUrl}
          alt={service.title[lang]}
          badgeNumber={service.number}
          className="w-full h-full"
          imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Measured Gradient Scrim at bottom for clean contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

        {/* Editorial Numbering & Materials Line (Zero-Pill Unboxed Metadata) */}
        <div className="absolute bottom-3 inset-x-4 flex items-center justify-between gap-2 text-xs text-[#FAF6F0]/90 pointer-events-none">
          <span className="font-mono tabular-nums font-semibold text-[#F59C3B]">
            {service.number}. {service.shortTitle[lang]}
          </span>
          {inCartCount > 0 && (
            <span className="font-mono tabular-nums text-[#F59C3B] font-semibold">
              {t.inCartCount} {inCartCount}
            </span>
          )}
        </div>

        {/* Zoom / Lightbox Button */}
        <button
          type="button"
          onClick={() => onOpenLightbox(service)}
          title={t.zoomImage}
          aria-label={t.zoomImage}
          className="absolute top-3 end-3 p-2.5 rounded-lg bg-[#0B1619]/80 hover:bg-[#CA5628] text-[#FAF6F0] border border-[#FAF6F0]/15 transition-colors duration-150 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content & Interactive Configurator */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
        <div>
          <p className="text-xs text-[var(--text-secondary)] mb-1.5">
            {service.materialsTag[lang]}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-snug mb-2">
            {service.number}. {service.title[lang]}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {service.description[lang]}
          </p>
        </div>

        {/* Hairline Divider */}
        <div className="h-px w-full bg-[var(--border-muted)]" />

        {/* Configuration Form */}
        <div className="space-y-3.5 mt-auto">
          {/* Option Dropdown 1 */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              {t.optionLabel}
            </label>
            <select
              value={optionIndex}
              onChange={(e) => setOptionIndex(Number(e.target.value))}
              className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors"
            >
              {service.options.map((opt, idx) => (
                <option key={idx} value={idx}>
                  {opt[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Spec Dropdown 2 */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              {t.specLabel}
            </label>
            <select
              value={specIndex}
              onChange={(e) => setSpecIndex(Number(e.target.value))}
              className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors"
            >
              {service.specs.map((spec, idx) => (
                <option key={idx} value={idx}>
                  {spec[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Stepper & Optional Item Note */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {t.qtyLabel}
              </label>
              <div className="flex items-center justify-between rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min={1}
                  max={9999}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  className="w-12 text-center bg-transparent text-sm font-semibold tabular-nums text-[var(--text-primary)] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="sm:col-span-7">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                {t.noteLabel}
              </label>
              <input
                type="text"
                value={itemNote}
                onChange={(e) => setItemNote(e.target.value)}
                placeholder={t.notePlaceholder}
                className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-2.5">
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-gradient text-[#0B1619] hover:opacity-95'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{t.addedToOrder}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span>{t.addToOrder}</span>
                </>
              )}
            </button>

            <a
              href={instantWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#F59C3B] shrink-0" />
              <span>{t.instantWhatsApp}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
