import React, { useState } from 'react';
import {
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  CartItem,
  ClientOrderInfo,
  Language,
  OrderUrgency,
  SERVICES_DATA,
  TRANSLATIONS,
} from '../data/siteData';
import {
  buildCartWhatsAppMessage,
  buildWhatsAppRedirectUrl,
} from '../utils/whatsappFormatter';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  cart: CartItem[];
  onUpdateQty: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  clientInfo: ClientOrderInfo;
  onUpdateClientInfo: (updates: Partial<ClientOrderInfo>) => void;
  onNavigateToServices: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  clientInfo,
  onUpdateClientInfo,
  onNavigateToServices,
}) => {
  const t = TRANSLATIONS[lang].drawer;
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formattedMessage = buildCartWhatsAppMessage(cart, clientInfo, lang);
  const whatsappUrl = buildWhatsAppRedirectUrl(formattedMessage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard blocked
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content using 100dvh for accurate mobile browser viewport */}
      <aside className="relative z-10 w-full max-w-xl bg-[var(--bg-surface)] text-[var(--text-primary)] h-[100dvh] flex flex-col border-s border-[var(--border-subtle)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[var(--border-muted)] bg-[var(--bg-primary)] shrink-0">
          <div className="min-w-0">
            <h2 className="text-base sm:text-xl font-bold text-[var(--text-primary)] truncate">
              {t.title}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">
              {t.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {cart.length === 0 ? (
            <div className="py-14 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-[#F59C3B]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {t.emptyTitle}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto px-4">
                {t.emptyDesc}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToServices();
                }}
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-lg bg-brand-gradient text-[#0B1619] font-semibold text-sm cursor-pointer"
              >
                <span>{t.browseServicesBtn}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Selected Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    {t.selectedItemsHeading} ({cart.length})
                  </h3>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-[#CA5628] hover:underline cursor-pointer py-1 px-2"
                  >
                    {t.clearAll}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item, idx) => {
                    const service = SERVICES_DATA.find(
                      (s) => s.id === item.serviceId
                    );
                    if (!service) return null;
                    const optText =
                      service.options[item.optionIndex]?.[lang] ||
                      service.options[0][lang];
                    const specText =
                      service.specs[item.specIndex]?.[lang] ||
                      service.specs[0][lang];

                    return (
                      <div
                        key={item.cartItemId}
                        className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-muted)] space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                            <span className="font-mono tabular-nums text-[#F59C3B]">
                              {idx + 1}.
                            </span>{' '}
                            {service.shortTitle[lang]}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartItemId)}
                            title={t.removeItem}
                            className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-red-400 transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs text-[var(--text-secondary)] space-y-1">
                          <p>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {t.optionPrefix}
                            </span>{' '}
                            {optText}
                          </p>
                          <p>
                            <span className="font-semibold text-[var(--text-primary)]">
                              {t.specPrefix}
                            </span>{' '}
                            {specText}
                          </p>
                          {item.itemNote && (
                            <p>
                              <span className="font-semibold text-[var(--text-primary)]">
                                {t.notePrefix}
                              </span>{' '}
                              {item.itemNote}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(
                                item.cartItemId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-subtle)] border border-transparent cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono tabular-nums text-sm font-bold px-2">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.cartItemId, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-subtle)] border border-transparent cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Client Details & Confirmed Phase 1 Enhancements */}
              <div className="space-y-3.5 pt-3 border-t border-[var(--border-muted)]">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  {t.clientSectionHeading}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      {t.clientNameLabel}
                    </label>
                    <input
                      type="text"
                      value={clientInfo.clientName}
                      onChange={(e) =>
                        onUpdateClientInfo({ clientName: e.target.value })
                      }
                      placeholder={t.clientNamePlaceholder}
                      className="w-full min-h-[44px] rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3 py-2 text-base sm:text-sm text-[var(--text-primary)] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={clientInfo.phone}
                      onChange={(e) =>
                        onUpdateClientInfo({ phone: e.target.value })
                      }
                      placeholder={t.phonePlaceholder}
                      className="w-full min-h-[44px] rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3 py-2 text-base sm:text-sm text-[var(--text-primary)] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      {t.districtLabel}
                    </label>
                    <input
                      type="text"
                      value={clientInfo.district}
                      onChange={(e) =>
                        onUpdateClientInfo({ district: e.target.value })
                      }
                      placeholder={t.districtPlaceholder}
                      className="w-full min-h-[44px] rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3 py-2 text-base sm:text-sm text-[var(--text-primary)] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      {t.urgencyLabel}
                    </label>
                    <select
                      value={clientInfo.urgency}
                      onChange={(e) =>
                        onUpdateClientInfo({
                          urgency: e.target.value as OrderUrgency,
                        })
                      }
                      className="w-full min-h-[44px] truncate rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3 py-2 text-base sm:text-sm text-[var(--text-primary)] outline-none"
                    >
                      <option value="standard">
                        {t.urgencyOptions.standard}
                      </option>
                      <option value="express">
                        {t.urgencyOptions.express}
                      </option>
                      <option value="event_date">
                        {t.urgencyOptions.event_date}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    {t.designLinkLabel}
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={clientInfo.designLink}
                    onChange={(e) =>
                      onUpdateClientInfo({ designLink: e.target.value })
                    }
                    placeholder={t.designLinkPlaceholder}
                    className="w-full min-h-[44px] rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3 py-2 text-base sm:text-sm text-[var(--text-primary)] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    {t.additionalNotesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={clientInfo.additionalNotes}
                    onChange={(e) =>
                      onUpdateClientInfo({ additionalNotes: e.target.value })
                    }
                    placeholder={t.additionalNotesPlaceholder}
                    className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3 py-2 text-base sm:text-sm text-[var(--text-primary)] outline-none resize-none"
                  />
                </div>
              </div>

              {/* Live Message Preview */}
              <div className="space-y-2 pt-3 border-t border-[var(--border-muted)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[var(--text-secondary)] truncate">
                    {t.livePreviewHeading}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F59C3B] hover:underline cursor-pointer shrink-0 py-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.copiedMessage}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyMessage}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-muted)] text-xs text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed font-sans max-h-40 overflow-y-auto">
                  {formattedMessage}
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[var(--border-muted)] bg-[var(--bg-primary)] shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-brand-gradient text-[#0B1619] font-bold text-sm sm:text-base shadow-lg hover:opacity-95 transition-opacity"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>{t.sendViaWhatsApp}</span>
            </a>
          </div>
        )}
      </aside>
    </div>
  );
};
