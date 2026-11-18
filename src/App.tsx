import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  Compass,
  ExternalLink,
  Eye,
  FolderOpen,
  Globe,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  Send,
  ShoppingBag,
  Sun,
  Target,
  X,
} from 'lucide-react';
import {
  CartItem,
  ClientOrderInfo,
  Language,
  OFFICIAL_CONTACT,
  SERVICES_DATA,
  SERVICE_CATEGORIES,
  ServiceCategoryKey,
  ServiceItem,
  TRANSLATIONS,
  ThemeMode,
} from './data/siteData';
import { BrandLogo } from './components/BrandLogo';
import { ResilientImage } from './components/ResilientImage';
import { ServiceCard } from './components/ServiceCard';
import { OrderDrawer } from './components/OrderDrawer';
import { LightboxModal } from './components/LightboxModal';
import { buildQuickInquiryWhatsAppUrl } from './utils/whatsappFormatter';

const STORAGE_KEYS = {
  LANG: 'funun_alrisha_lang_v1',
  THEME: 'funun_alrisha_theme_v1',
  CART: 'funun_alrisha_cart_v1',
  CLIENT: 'funun_alrisha_client_v1',
};

export default function App() {
  // 1. Language state (Default: 'ar' per Phase 1 user confirmation)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      return saved === 'en' || saved === 'ar' ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  // 2. Theme state (Default: 'dark' per Phase 1 user confirmation)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  // 3. Order Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Client Order Info state
  const [clientInfo, setClientInfo] = useState<ClientOrderInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLIENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      clientName: '',
      phone: '',
      district: '',
      urgency: 'standard',
      designLink: '',
      additionalNotes: '',
    };
  });

  // 5. Filter & UI states
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategoryKey>('all');
  const [portfolioCategory, setPortfolioCategory] =
    useState<ServiceCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [lightboxService, setLightboxService] = useState<ServiceItem | null>(
    null
  );

  // 6. Quick Inquiry Form state
  const [quickName, setQuickName] = useState<string>('');
  const [quickPhone, setQuickPhone] = useState<string>('');
  const [quickTypeIdx, setQuickTypeIdx] = useState<number>(0);
  const [quickMessage, setQuickMessage] = useState<string>('');

  // Sync <html lang dir data-theme class> & localStorage
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.lang = lang;
    htmlEl.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLIENT, JSON.stringify(clientInfo));
    } catch {
      // ignore
    }
  }, [clientInfo]);

  const t = TRANSLATIONS[lang];
  const heroService = SERVICES_DATA[0];

  // Filtered services for the 12-Service Configurator
  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SERVICES_DATA.filter((service) => {
      const matchesCat =
        activeCategory === 'all' || service.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;

      const haystack = [
        service.title.ar,
        service.title.en,
        service.description.ar,
        service.description.en,
        service.materialsTag.ar,
        service.materialsTag.en,
        ...service.options.map((o) => `${o.ar} ${o.en}`),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [activeCategory, searchQuery]);

  // Filtered items for the Dedicated Portfolio Section
  const filteredPortfolio = useMemo(() => {
    return SERVICES_DATA.filter(
      (service) =>
        portfolioCategory === 'all' || service.category === portfolioCategory
    );
  }, [portfolioCategory]);

  // Cart manipulation handlers
  const handleAddToCart = (
    serviceId: string,
    optionIndex: number,
    specIndex: number,
    quantity: number,
    itemNote: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.serviceId === serviceId &&
          item.optionIndex === optionIndex &&
          item.specIndex === specIndex &&
          item.itemNote.trim() === itemNote.trim()
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: `${serviceId}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 6)}`,
          serviceId,
          optionIndex,
          specIndex,
          quantity,
          itemNote,
        },
      ];
    });
  };

  const handleUpdateCartQty = (cartItemId: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateClientInfo = (updates: Partial<ClientOrderInfo>) => {
    setClientInfo((prev) => ({ ...prev, ...updates }));
  };

  // Count how many items of a service are in the cart
  const getServiceCartCount = (serviceId: string): number => {
    return cart
      .filter((i) => i.serviceId === serviceId)
      .reduce((acc, curr) => acc + curr.quantity, 0);
  };

  // Lightbox navigation
  const handlePrevLightbox = () => {
    if (!lightboxService) return;
    const idx = SERVICES_DATA.findIndex((s) => s.id === lightboxService.id);
    const prevIdx = (idx - 1 + SERVICES_DATA.length) % SERVICES_DATA.length;
    setLightboxService(SERVICES_DATA[prevIdx]);
  };

  const handleNextLightbox = () => {
    if (!lightboxService) return;
    const idx = SERVICES_DATA.findIndex((s) => s.id === lightboxService.id);
    const nextIdx = (idx + 1) % SERVICES_DATA.length;
    setLightboxService(SERVICES_DATA[nextIdx]);
  };

  const handleSelectServiceFromLightbox = (service: ServiceItem) => {
    setLightboxService(null);
    setActiveCategory('all');
    setSearchQuery('');
    setTimeout(() => {
      const el = document.getElementById(service.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inquiryType =
      t.contact.quickTypes[quickTypeIdx] || t.contact.quickTypes[0];
    const url = buildQuickInquiryWhatsAppUrl(
      quickName,
      quickPhone,
      inquiryType,
      quickMessage,
      lang
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#F59C3B] selection:text-[#0B1619]">
      {/* =====================================================================
          SECTION 1: STICKY RESPONSIVE HEADER
      ===================================================================== */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg-glass)] border-b border-[var(--border-muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Official PNG Logo + Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-3 shrink-0 focus:outline-none"
          >
            <BrandLogo theme={theme} lang={lang} size="md" showText={true} />
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]">
            <a
              href="#home"
              className="hover:text-[#F59C3B] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.home}
            </a>
            <a
              href="#profile"
              className="hover:text-[#F59C3B] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.profile}
            </a>
            <a
              href="#services"
              className="hover:text-[#F59C3B] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#portfolio"
              className="hover:text-[#F59C3B] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.portfolio}
            </a>
            <a
              href="#contact"
              className="hover:text-[#F59C3B] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Language Switcher, Theme Toggle & Smart Order Cart Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Bilingual Toggle (AR | EN) */}
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
              title={t.controls.switchLangTitle}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] hover:border-[var(--border-subtle)] border border-[var(--border-muted)] text-xs font-bold text-[var(--text-primary)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[#F59C3B]" />
              <span>{t.controls.switchLang}</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={() =>
                setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
              }
              title={
                theme === 'dark' ? t.controls.lightMode : t.controls.darkMode
              }
              aria-label={
                theme === 'dark' ? t.controls.lightMode : t.controls.darkMode
              }
              className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:border-[var(--border-subtle)] border border-[var(--border-muted)] text-[var(--text-primary)] transition-colors cursor-pointer shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#F59C3B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#CA5628]" />
              )}
            </button>

            {/* Order Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gradient text-[#0B1619] text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>{t.nav.myOrder}</span>
              <span className="font-mono tabular-nums px-1.5 py-0.5 rounded bg-[#0B1619]/15 text-[#0B1619] text-xs font-extrabold">
                {cart.length}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] text-[var(--text-primary)] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border-muted)] bg-[var(--bg-surface)] px-4 py-4 space-y-2">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="block w-full text-start px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] text-sm font-medium"
            >
              {t.nav.home}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('profile')}
              className="block w-full text-start px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] text-sm font-medium"
            >
              {t.nav.profile}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="block w-full text-start px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] text-sm font-medium"
            >
              {t.nav.services}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-start px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] text-sm font-medium"
            >
              {t.nav.portfolio}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="block w-full text-start px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] text-sm font-medium"
            >
              {t.nav.contact}
            </button>
          </div>
        )}
      </header>

      {/* =====================================================================
          SECTION 2: HERO SECTION & HEADQUARTERS SHOWCASE
      ===================================================================== */}
      <section
        id="home"
        className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[var(--border-muted)] overflow-hidden"
      >
        {/* Subtle Architectural Golden Feather Curve Background Motif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -end-40 w-[520px] h-[520px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, #F59C3B 0%, #CA5628 50%, transparent 75%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 2-Column Split with items-stretch */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Hero Text & Primary CTA Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-xs sm:text-sm font-medium text-[#F59C3B] tracking-wide">
                {t.hero.kicker}
              </p>

              <h1
                className="font-display font-bold text-[var(--text-primary)] leading-[1.2] tracking-tight"
                style={{
                  fontSize: 'clamp(1.95rem, 3.6vw, 3.25rem)',
                  textWrap: 'balance',
                }}
              >
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {t.hero.subheadline}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-gradient text-[#0B1619] font-bold text-sm sm:text-base shadow-lg hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>{t.hero.primaryCta}</span>
                </a>

                <a
                  href="#profile"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>
            </div>

            {/* Headquarters & Commercial Signage Visual Showcase (01) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative flex-1 rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-brand-card bg-[var(--bg-surface)] min-h-[290px] sm:min-h-[380px] group">
                <ResilientImage
                  driveFileId={heroService.driveFileId}
                  primaryUrl={heroService.imageUrl}
                  fallbackUrl={heroService.fallbackImageUrl}
                  alt={t.hero.imageCaption}
                  badgeNumber="01"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />

                {/* Measured Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Enlarge HQ Button */}
                <button
                  type="button"
                  onClick={() => setLightboxService(heroService)}
                  title={t.hero.zoomHqBtn}
                  className="absolute top-4 end-4 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B1619]/85 hover:bg-[#CA5628] text-[#FAF6F0] text-xs font-semibold border border-[#FAF6F0]/15 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t.hero.zoomHqBtn}</span>
                </button>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 inset-x-5 flex items-center justify-between gap-4 text-xs text-[#FAF6F0]/90 pointer-events-none">
                  <span>{t.hero.imageCaption}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {t.hero.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] flex flex-col justify-between gap-1.5"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-2xl sm:text-3xl tabular-nums text-[#F59C3B]">
                    {metric.value}
                  </span>
                  <span className="text-sm font-bold text-[var(--text-primary)]">
                    {metric.unit}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: CORPORATE PROFILE (ABOUT, VISION, MISSION, VALUES, WORKFLOW)
      ===================================================================== */}
      <section
        id="profile"
        className="py-16 sm:py-24 border-b border-[var(--border-muted)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-[#F59C3B]">
              {t.profile.sectionKicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.profile.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {t.profile.sectionSubtitle}
            </p>
          </div>

          {/* Asymmetric Bento Grid: About Us (col-span-6) + Vision & Mission (col-span-6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* About Us Card */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <BrandLogo
                    theme={theme}
                    lang={lang}
                    size="sm"
                    showText={false}
                  />
                  <span className="text-xs text-[var(--text-secondary)]">
                    {OFFICIAL_CONTACT.address[lang]}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {t.profile.aboutTitle}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {t.profile.aboutBody}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-muted)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
                <span>
                  {lang === 'ar'
                    ? 'تصميم الهوية · اللوحات 3D · الأوفست · الليزر · اليوفي UV · المعارض'
                    : 'Branding · 3D Signage · Offset · Laser · Flatbed UV · Exhibitions'}
                </span>
                <a
                  href={OFFICIAL_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#F59C3B] hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar' ? 'موقع المقر بالرياض' : 'Riyadh HQ Map'}
                  </span>
                </a>
              </div>
            </div>

            {/* Vision & Mission Stack */}
            <div className="lg:col-span-6 grid grid-cols-1 gap-6">
              {/* Vision */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-muted)] space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#F59C3B]">
                  <Eye className="w-5 h-5 shrink-0" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    {t.profile.visionTitle}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {t.profile.visionBody}
                </p>
              </div>

              {/* Mission */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-muted)] space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#CA5628]">
                  <Target className="w-5 h-5 shrink-0" />
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    {t.profile.missionTitle}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {t.profile.missionBody}
                </p>
              </div>
            </div>
          </div>

          {/* Core Values (4 Columns) */}
          <div className="space-y-5">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {t.profile.valuesTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.profile.values.map((val) => (
                <div
                  key={val.num}
                  className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                    <span className="font-mono tabular-nums font-bold text-[#F59C3B]">
                      {val.num}.
                    </span>
                    <span>{val.subtitle}</span>
                  </div>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Step Execution Workflow */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
            <div className="space-y-1">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                {t.profile.workflowTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {t.profile.workflowSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.profile.workflowSteps.map((wf) => (
                <div
                  key={wf.step}
                  className="relative p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-muted)] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono tabular-nums text-lg font-extrabold text-[#F59C3B]">
                      {wf.step}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {wf.enTitle}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    {wf.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: 12 INTERACTIVE SERVICE CATEGORIES & ORDER CONFIGURATOR
      ===================================================================== */}
      <section
        id="services"
        className="py-16 sm:py-24 border-b border-[var(--border-muted)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-[#F59C3B]">
                {t.services.sectionKicker}
              </p>
              <h2
                className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                {t.services.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {t.services.sectionSubtitle}
              </p>
            </div>

            {/* Instant Search Input */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[var(--text-secondary)] absolute start-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.services.searchPlaceholder}
                  className="w-full rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] ps-10 pe-9 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/65 outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    title={t.services.clearSearch}
                    className="absolute end-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Segmented Control */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-brand-gradient text-[#0B1619] shadow-sm'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-muted)]'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>

          {/* 12 Service Cards Grid */}
          {filteredServices.length === 0 ? (
            <div className="p-12 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-muted)] text-center space-y-3">
              <p className="text-base text-[var(--text-secondary)]">
                {t.services.noResults}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-xs font-semibold text-[#F59C3B] cursor-pointer"
              >
                {SERVICE_CATEGORIES[0].label[lang]}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  lang={lang}
                  inCartCount={getServiceCartCount(service.id)}
                  onAddToCart={handleAddToCart}
                  onOpenLightbox={(srv) => setLightboxService(srv)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: DEDICATED INTERACTIVE PORTFOLIO SHOWCASE (CONFIRMED IN PHASE 1)
      ===================================================================== */}
      <section
        id="portfolio"
        className="py-16 sm:py-24 border-b border-[var(--border-muted)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header & Official Drive Assets Folder Link */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-[#F59C3B]">
                {t.portfolio.sectionKicker}
              </p>
              <h2
                className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                {t.portfolio.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {t.portfolio.sectionSubtitle}
              </p>
            </div>

            <a
              href={OFFICIAL_CONTACT.driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm font-semibold text-[#F59C3B] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              <FolderOpen className="w-4 h-4 shrink-0" />
              <span>{t.portfolio.driveLinkText}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* Portfolio Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = portfolioCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setPortfolioCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-muted)]'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>

          {/* Portfolio Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item) => (
              <div
                key={`portfolio-${item.id}`}
                onClick={() => setLightboxService(item)}
                className="group rounded-xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-muted)] hover:border-[var(--border-subtle)] transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--bg-elevated)]">
                  <ResilientImage
                    driveFileId={item.driveFileId}
                    primaryUrl={item.imageUrl}
                    fallbackUrl={item.fallbackImageUrl}
                    alt={item.title[lang]}
                    badgeNumber={item.number}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-3 end-3 p-2 rounded-lg bg-[#0B1619]/80 text-[#FAF6F0] group-hover:bg-[#CA5628] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-3 inset-x-4 text-[#FAF6F0]">
                    <p className="text-xs font-mono tabular-nums text-[#F59C3B]">
                      {item.number} · {t.portfolio.viewFullSize}
                    </p>
                    <h3 className="text-sm sm:text-base font-bold leading-snug mt-0.5">
                      {item.shortTitle[lang]}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-[#F59C3B] font-medium">
                      {item.materialsTag[lang]}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {item.portfolioSummary[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: CONTACT & LOCATION HUB + QUICK WHATSAPP INQUIRY FORM
      ===================================================================== */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-[#F59C3B]">
              {t.contact.sectionKicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.contact.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {t.contact.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: 4 Interactive Direct Contact Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 1. Direct Phone & WhatsApp Card */}
              <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center text-[#F59C3B]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {t.contact.phoneCardTitle}
                  </h3>
                  <p
                    dir="ltr"
                    className="font-mono tabular-nums text-lg font-bold text-[#F59C3B] text-start"
                  >
                    {OFFICIAL_CONTACT.phoneDisplay}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {t.contact.phoneCardDesc}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={OFFICIAL_CONTACT.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-brand-gradient text-[#0B1619] text-xs font-bold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.whatsappAction}</span>
                  </a>
                  <a
                    href={OFFICIAL_CONTACT.telUrl}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-muted)]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F59C3B]" />
                    <span>{t.contact.callAction}</span>
                  </a>
                </div>
              </div>

              {/* 2. Email Card */}
              <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center text-[#CA5628]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {t.contact.emailCardTitle}
                  </h3>
                  <p
                    dir="ltr"
                    className="font-mono text-sm font-semibold text-[#F59C3B] break-all text-start"
                  >
                    {OFFICIAL_CONTACT.email}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {t.contact.emailCardDesc}
                  </p>
                </div>

                <a
                  href={OFFICIAL_CONTACT.mailtoUrl}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-muted)]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F59C3B]" />
                  <span>{t.contact.emailAction}</span>
                </a>
              </div>

              {/* 3. Headquarters & Google Maps Card */}
              <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center text-[#F59C3B]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {t.contact.addressCardTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {t.contact.addressCardDesc}
                  </p>
                </div>

                <a
                  href={OFFICIAL_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[#F59C3B] text-xs font-bold border border-[var(--border-subtle)]"
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>{t.contact.mapsAction}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              {/* 4. Official Social Media (TikTok & Snapchat) */}
              <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-muted)] flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center text-[#F59C3B]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {t.contact.socialCardTitle}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {t.contact.socialCardDesc}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={OFFICIAL_CONTACT.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between px-3.5 py-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-muted)]"
                  >
                    <span>{t.contact.tiktokAction}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F59C3B]" />
                  </a>
                  <a
                    href={OFFICIAL_CONTACT.snapchatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between px-3.5 py-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-muted)]"
                  >
                    <span>{t.contact.snapchatAction}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F59C3B]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Quick WhatsApp Inquiry Form */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between">
              <div className="space-y-2 mb-6">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {t.contact.quickFormTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t.contact.quickFormSubtitle}
                </p>
              </div>

              <form onSubmit={handleQuickInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                      {t.contact.quickNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder={t.contact.quickNamePlaceholder}
                      className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                      {t.contact.quickPhoneLabel}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      required
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder={t.contact.quickPhonePlaceholder}
                      className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    {t.contact.quickTypeLabel}
                  </label>
                  <select
                    value={quickTypeIdx}
                    onChange={(e) => setQuickTypeIdx(Number(e.target.value))}
                    className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none"
                  >
                    {t.contact.quickTypes.map((qt, i) => (
                      <option key={i} value={i}>
                        {qt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    {t.contact.quickMessageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder={t.contact.quickMessagePlaceholder}
                    className="w-full rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-muted)] focus:border-[var(--accent-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-gradient text-[#0B1619] font-bold text-sm sm:text-base shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>{t.contact.quickSubmitBtn}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: QUIET CORPORATE FOOTER
      ===================================================================== */}
      <footer className="border-t border-[var(--border-muted)] bg-[var(--bg-surface)] py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-3">
              <BrandLogo theme={theme} lang={lang} size="md" showText={true} />
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
                {t.footer.description}
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">
                {t.footer.quickLinksTitle}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li>
                  <a href="#home" className="hover:text-[#F59C3B]">
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#profile" className="hover:text-[#F59C3B]">
                    {t.nav.profile}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#F59C3B]">
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-[#F59C3B]">
                    {t.nav.portfolio}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#F59C3B]">
                    {t.nav.contact}
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">
                {t.footer.contactTitle}
              </h4>
              <p>{OFFICIAL_CONTACT.address[lang]}</p>
              <p dir="ltr" className="font-mono tabular-nums text-start">
                {OFFICIAL_CONTACT.phoneDisplay} · {OFFICIAL_CONTACT.email}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-[#F59C3B]">
                <a
                  href={OFFICIAL_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Google Maps
                </a>
                <span>·</span>
                <a
                  href={OFFICIAL_CONTACT.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  TikTok
                </a>
                <span>·</span>
                <a
                  href={OFFICIAL_CONTACT.snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Snapchat ({OFFICIAL_CONTACT.snapchatHandle})
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-muted)] text-center text-xs text-[var(--text-secondary)]">
            {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING STICKY BOTTOM ORDER BAR (Appears when Cart > 0)
      ===================================================================== */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 inset-x-4 z-30 max-w-3xl mx-auto">
          <div className="px-4 sm:px-6 py-3 rounded-2xl bg-[var(--bg-surface)]/95 backdrop-blur-md border border-[#F59C3B]/50 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-gradient text-[#0B1619] font-mono tabular-nums font-extrabold text-sm flex items-center justify-center">
                {cart.length}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                {t.drawer.floatingBarItems}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-brand-gradient text-[#0B1619] font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{t.drawer.floatingBarAction}</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          SLIDE-OVER ORDER DRAWER & LIGHTBOX MODAL
      ===================================================================== */}
      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lang={lang}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        clientInfo={clientInfo}
        onUpdateClientInfo={handleUpdateClientInfo}
        onNavigateToServices={() => scrollToSection('services')}
      />

      <LightboxModal
        service={lightboxService}
        lang={lang}
        onClose={() => setLightboxService(null)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        onSelectForOrder={handleSelectServiceFromLightbox}
      />
    </div>
  );
}
