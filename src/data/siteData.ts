export type Language = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light';

export type ServiceCategoryKey =
  | 'all'
  | 'signage'
  | 'branding'
  | 'exhibitions'
  | 'uniforms_gifts';

export interface BilingualText {
  ar: string;
  en: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  category: Exclude<ServiceCategoryKey, 'all'>;
  driveFileId: string;
  fileName: string;
  imageUrl: string;
  fallbackImageUrl: string;
  title: BilingualText;
  shortTitle: BilingualText;
  description: BilingualText;
  portfolioSummary: BilingualText;
  materialsTag: BilingualText;
  options: BilingualText[];
  specs: BilingualText[];
}

export interface CartItem {
  cartItemId: string;
  serviceId: string;
  optionIndex: number;
  specIndex: number;
  quantity: number;
  itemNote: string;
}

export type OrderUrgency = 'standard' | 'express' | 'event_date';

export interface ClientOrderInfo {
  clientName: string;
  phone: string;
  district: string;
  urgency: OrderUrgency;
  designLink: string;
  additionalNotes: string;
}

export const OFFICIAL_CONTACT = {
  phoneDisplay: '0553352824',
  phoneIntl: '966553352824',
  whatsappBaseUrl: 'https://wa.me/966553352824',
  telUrl: 'tel:0553352824',
  email: 'fnoonalresha@gmail.com',
  mailtoUrl: 'mailto:fnoonalresha@gmail.com',
  address: {
    ar: 'طريق النصر، حي العزيزية، الرياض 14513، المملكة العربية السعودية',
    en: 'Al-Nasr Road, Al-Aziziyah District, Riyadh 14513, Kingdom of Saudi Arabia',
  },
  googleMapsUrl:
    'https://search.google.com/local/writereview?placeid=ChIJkepIKJwJLz4RvWsv9rvkEBI',
  tiktokUrl: 'https://vt.tiktok.com/ZSpaj6y5U/',
  snapchatUrl: 'https://www.snapchat.com/add/fnooon535?src=QR_CODE',
  snapchatHandle: 'fnooon535',
  driveFolderUrl:
    'https://drive.google.com/drive/folders/1QjEMOsmXEawJe2j_XbMyBNN57f7TTvJ1',
};

export const BRAND_LOGOS = {
  light: {
    fileId: '1bRics1IdNSzgORFwn2VbD2WOZJy1NSmN',
    fileName: '00_شعار_فنون_الريشة_الأصلي_مفرغ_PNG.png',
    primaryUrl:
      'https://lh3.googleusercontent.com/d/1bRics1IdNSzgORFwn2VbD2WOZJy1NSmN',
    fallbackUrl:
      'https://drive.google.com/thumbnail?id=1bRics1IdNSzgORFwn2VbD2WOZJy1NSmN&sz=w1000',
    viewUrl:
      'https://drive.google.com/file/d/1bRics1IdNSzgORFwn2VbD2WOZJy1NSmN/view?usp=drivesdk',
  },
  dark: {
    fileId: '16743GRTK7JmZWAMOgtlMScFZx0ujNJsv',
    fileName: '00_شعار_فنون_الريشة_الأبيض_والذهبي_مفرغ_PNG.png',
    primaryUrl:
      'https://lh3.googleusercontent.com/d/16743GRTK7JmZWAMOgtlMScFZx0ujNJsv',
    fallbackUrl:
      'https://drive.google.com/thumbnail?id=16743GRTK7JmZWAMOgtlMScFZx0ujNJsv&sz=w1000',
    viewUrl:
      'https://drive.google.com/file/d/16743GRTK7JmZWAMOgtlMScFZx0ujNJsv/view?usp=drivesdk',
  },
};

export const SERVICE_CATEGORIES: {
  key: ServiceCategoryKey;
  label: BilingualText;
}[] = [
  {
    key: 'all',
    label: {
      ar: 'الكل (12)',
      en: 'All Services (12)',
    },
  },
  {
    key: 'signage',
    label: {
      ar: 'اللوحات والأكريليك والواجهات',
      en: 'Signage & Acrylic',
    },
  },
  {
    key: 'branding',
    label: {
      ar: 'الهوية والمطبوعات والأختام',
      en: 'Branding, Print & Stamps',
    },
  },
  {
    key: 'exhibitions',
    label: {
      ar: 'المعارض والبنرات والاستيكرات',
      en: 'Exhibitions, Banners & Stickers',
    },
  },
  {
    key: 'uniforms_gifts',
    label: {
      ar: 'اليونيفورم والـ UV والدروع والهدايا',
      en: 'Uniforms, UV, Trophies & Gifts',
    },
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'service-01',
    number: '01',
    category: 'signage',
    driveFileId: '14NFQG6Lja5s0ZbCx0pS48lVccNBcVYpj',
    fileName: '01_واجهة_المقر_واللوحات_التجارية_الخارجية_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/14NFQG6Lja5s0ZbCx0pS48lVccNBcVYpj',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=14NFQG6Lja5s0ZbCx0pS48lVccNBcVYpj&sz=w1600',
    title: {
      ar: 'اللوحات التجارية وواجهات المتاجر والاستاندات الخارجية',
      en: 'Commercial Storefront Signage & Outdoor Totems',
    },
    shortTitle: {
      ar: 'اللوحات التجارية وواجهات المتاجر',
      en: 'Commercial Storefront Signage & Outdoor Totems',
    },
    description: {
      ar: 'تصميم وتنفيذ واجهات المتاجر والشركات، تكسية الكلادينج، الحروف البارزة ثلاثية الأبعاد (أكريليك، ستيل، زنكور، شيرينيوم) المضيئة بليد LED، اللوحات الإرشادية الخارجية (Totem Pylons)، واستاندات الأرصفة.',
      en: 'Complete storefront signage execution, aluminum cladding facades, 3D illuminated channel letters (acrylic, stainless steel, zinc), outdoor directional totem pylons, and sidewalk A-frame stands.',
    },
    portfolioSummary: {
      ar: 'تنفيذ معماري متكامل لواجهة المقر واللوحات الخارجية بحروف بارزة مضيئة وتوتم إرشادي خارجي مقاوم للعوامل الجوية.',
      en: 'Complete architectural facade execution featuring 3D illuminated channel letters, exterior cladding, and weather-resistant totem pylon.',
    },
    materialsTag: {
      ar: 'كلادينج ألمنيوم · حروف ستيل وأكريليك 3D · إضاءة LED كورية',
      en: 'Aluminum Cladding · 3D Steel & Acrylic Letters · LED Illumination',
    },
    options: [
      {
        ar: 'واجهة كلادينج + حروف بارزة مضيئة 3D',
        en: 'Cladding Facade + 3D Illuminated Letters',
      },
      {
        ar: 'لوحة واجهة بحروف بارزة وعنصر مجسم',
        en: 'Storefront Sign with 3D Sculpted Emblem',
      },
      {
        ar: 'توتم خارجي إرشادي (Pylon Sign)',
        en: 'Outdoor Directional Totem Pylon',
      },
      {
        ar: 'استاند رصيف حديدي مزدوج (A-Frame)',
        en: 'Outdoor Metal A-Frame Sidewalk Stand',
      },
    ],
    specs: [
      {
        ar: 'طلب معاينة ورفع مقاسات في الرياض',
        en: 'Request Site Survey & Measurement in Riyadh',
      },
      {
        ar: 'واجهة متوسطة (4 - 6 أمتار)',
        en: 'Medium Storefront (4 - 6 Meters)',
      },
      {
        ar: 'واجهة كبيرة (7 - 12 متراً)',
        en: 'Large Storefront (7 - 12 Meters)',
      },
    ],
  },
  {
    id: 'service-02',
    number: '02',
    category: 'branding',
    driveFileId: '1XMlgaTw5yB0XvzN4NRMZK6n0-4yiItFw',
    fileName: '02_الهوية_البصرية_والمطبوعات_الورقية_الرسمية_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XMlgaTw5yB0XvzN4NRMZK6n0-4yiItFw',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1XMlgaTw5yB0XvzN4NRMZK6n0-4yiItFw&sz=w1600',
    title: {
      ar: 'الهوية البصرية والمطبوعات الورقية الرسمية',
      en: 'Visual Identity & Official Corporate Stationery',
    },
    shortTitle: {
      ar: 'الهوية البصرية والمطبوعات الورقية الرسمية',
      en: 'Visual Identity & Official Corporate Stationery',
    },
    description: {
      ar: 'تصميم الشعارات وأدلة الهوية البصرية، وطباعة القرطاسية المكتبية الرسمية: ورق المراسلات الرسمي (A4 Letterhead)، الفولدرات بجيب داخلي، الأظرف الرسمية بجميع المقاسات، الكروت الشخصية، وشهادات الشكر والتقدير.',
      en: 'Logo and brand guideline design alongside official corporate stationery printing: A4 letterheads, presentation folders, C4/DL envelopes, business cards, and appreciation certificates.',
    },
    portfolioSummary: {
      ar: 'منظومة مطبوعات رسمية متكاملة تشمل دليل الهوية، الفولدرات، ورق المراسلات، الأظرف، والكروت الشخصية بتشطيب فاخر.',
      en: 'Cohesive corporate stationery suite featuring brand guidelines book, presentation folders, letterheads, envelopes, and executive cards.',
    },
    materialsTag: {
      ar: 'ورق كوشيه ومقمش فاخر · بصمة حرارية · قص وتقفيل دقيق',
      en: 'Textured & Matte Art Paper · Foil Stamping · Precision Die-Cut',
    },
    options: [
      {
        ar: 'بكج مطبوعات تأسيس شركة متكامل',
        en: 'Complete Corporate Stationery Starter Kit',
      },
      {
        ar: 'تصميم هوية بصرية كاملة + دليل الهوية',
        en: 'Full Brand Identity & Guidelines Book',
      },
      {
        ar: 'ورق رسمي A4 + أظرف رسمية مطبوعة',
        en: 'Official A4 Letterheads & Envelopes',
      },
      {
        ar: 'فولدرات عروض أسعار + شهادات شكر وتقدير',
        en: 'Presentation Folders & Certificates',
      },
    ],
    specs: [
      {
        ar: 'كمية 500 نسخة (تشطيب فاخر)',
        en: '500 Copies (Premium Finish)',
      },
      {
        ar: 'كمية 1000 نسخة (طباعة أوفست)',
        en: '1000 Copies (Offset Print)',
      },
      {
        ar: 'كمية 100 نسخة (طباعة ديجيتال سريعة)',
        en: '100 Copies (Express Digital Print)',
      },
    ],
  },
  {
    id: 'service-03',
    number: '03',
    category: 'branding',
    driveFileId: '1GAY6jHp3jR0_aql7r5I-GbGFZHAZ6TvR',
    fileName: '03_طباعة_الأوفست_والكتالوجات_ودفاتر_الفواتير_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1GAY6jHp3jR0_aql7r5I-GbGFZHAZ6TvR',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1GAY6jHp3jR0_aql7r5I-GbGFZHAZ6TvR&sz=w1600',
    title: {
      ar: 'طباعة الأوفست التجارية، الكتالوجات، ودفاتر الفواتير',
      en: 'Commercial Offset Printing, Catalogs & NCR Books',
    },
    shortTitle: {
      ar: 'طباعة الأوفست والكتالوجات ودفاتر الفواتير',
      en: 'Commercial Offset Printing, Catalogs & NCR Books',
    },
    description: {
      ar: 'طباعة البروفايلات والكتالوجات متعددة الصفحات، البروشورات المطوية (Tri-Fold)، دفاتر الفواتير وسندات القبض والعقود المكربنة (NCR) المرقمة والمخرمة، الكروت المخملية ببصمة ويوفي بارز، وعلب المنتجات.',
      en: 'High-volume commercial offset printing for multi-page company profiles and catalogs, tri-fold brochures, numbered and perforated carbonless NCR invoice/receipt pads, spot-UV business cards, and custom product boxes.',
    },
    portfolioSummary: {
      ar: 'إنتاج طباعي أوفست عالي الدقة للكتالوجات والبروفايلات ودفاتر السندات المكربنة والعلب الكرتونية بتشطيبات مخملية وSpot-UV.',
      en: 'High-volume offset production of multi-page catalogs, numbered carbonless NCR books, tri-fold brochures, and velvet spot-UV packaging.',
    },
    materialsTag: {
      ar: 'طباعة أوفست 4 ألوان · سلوفان مخملي · يوفي بارز · ورق مكربن NCR',
      en: 'CMYK Offset Press · Velvet Lamination · Spot-UV · Carbonless NCR',
    },
    options: [
      {
        ar: 'كتالوج / بروفايل شركة مطبوع متعدد الصفحات',
        en: 'Multi-Page Printed Company Profile / Catalog',
      },
      {
        ar: 'دفاتر فواتير وسندات قبض وعقود مكربنة (NCR)',
        en: 'Carbonless NCR Invoice & Receipt Books',
      },
      {
        ar: 'بروشورات وفلايرات ومنيوهات مطاعم',
        en: 'Brochures, Flyers & Restaurant Menus',
      },
      {
        ar: 'كروت شخصية فاخرة (سلوفان مخملي + UV بارز) + علب كرتونية',
        en: 'Velvet Spot-UV Business Cards & Packaging Boxes',
      },
    ],
    specs: [
      {
        ar: '50 دفتر مكربن (أصل + صورتين)',
        en: '50 NCR Books (Original + 2 Copies)',
      },
      {
        ar: '500 نسخة كتالوج / بروشور',
        en: '500 Catalogs / Brochures',
      },
      {
        ar: '1000 قطعة طباعة أوفست',
        en: '1000 Pieces Offset Batch',
      },
    ],
  },
  {
    id: 'service-04',
    number: '04',
    category: 'branding',
    driveFileId: '1RhWW1stc_gmaWW4Nc-pk3wmUeMhsXJyD',
    fileName: '04_الأختام_الرسمية_وأختام_الكريستال_ليزر_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1RhWW1stc_gmaWW4Nc-pk3wmUeMhsXJyD',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1RhWW1stc_gmaWW4Nc-pk3wmUeMhsXJyD&sz=w1600',
    title: {
      ar: 'الأختام الرسمية وأختام الكريستال ليزر',
      en: 'Official Corporate Stamps & Laser Crystal Stamps',
    },
    shortTitle: {
      ar: 'الأختام الرسمية وأختام الكريستال ليزر',
      en: 'Official Corporate Stamps & Laser Crystal Stamps',
    },
    description: {
      ar: 'تجهيز الأختام المعتمدة للشركات والمؤسسات والمكاتب الهندسية: أختام كريستال فاخرة محفورة بالليزر، أختام أوتوماتيكية ذاتية التحبير (Trodat) مستطيلة ودائرية، وأختام الجيب المعدنية المتنقلة.',
      en: 'Precision-engraved official stamps for corporations and offices: luxury laser-etched optical crystal stamps, automatic self-inking Trodat rectangular and circular stamps, and sleek metal pocket stamps.',
    },
    portfolioSummary: {
      ar: 'حفر ليزر متناهي الدقة لأختام الكريستال الملكية والأختام الأوتوماتيكية ذاتية التحبير وأختام الجيب المعدنية.',
      en: 'Micro-precision laser engraving for optical crystal desk stamps, self-inking Trodat corporate seals, and portable metal pocket stamps.',
    },
    materialsTag: {
      ar: 'كريستال بصري محفور بالليزر · ماكينات Trodat أصلية · ربر ليزر عالي الدقة',
      en: 'Laser-Etched Optical Crystal · Genuine Trodat Mechanisms · High-DPI Rubber',
    },
    options: [
      {
        ar: 'ختم كريستال ملكي محفور بالليزر',
        en: 'Luxury Laser-Engraved Crystal Stamp',
      },
      {
        ar: 'ختم أوتوماتيكي ذاتي التحبير (Trodat) مستطيل / دائري',
        en: 'Automatic Self-Inking Trodat Stamp',
      },
      {
        ar: 'ختم جيب معدني متنقل',
        en: 'Portable Metal Pocket Stamp',
      },
      {
        ar: 'طقم أختام متكامل للإدارة والمحاسبة',
        en: 'Complete Executive & Accounting Stamp Set',
      },
    ],
    specs: [
      {
        ar: 'حبر أزرق رسمي',
        en: 'Official Blue Ink',
      },
      {
        ar: 'حبر أسود / طوبي',
        en: 'Black / Terracotta Ink',
      },
      {
        ar: 'لونين (شعار ملون)',
        en: 'Dual-Color Ink Pad',
      },
    ],
  },
  {
    id: 'service-05',
    number: '05',
    category: 'signage',
    driveFileId: '1ehRU0UMBDxIFiDOWXtL_6s2xnjGsbyUu',
    fileName: '05_قص_وحفر_الأكريليك_واللوحات_الإرشادية_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1ehRU0UMBDxIFiDOWXtL_6s2xnjGsbyUu',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1ehRU0UMBDxIFiDOWXtL_6s2xnjGsbyUu&sz=w1600',
    title: {
      ar: 'قص وحفر الأكريليك وشعارات الاستقبال واللوحات الإرشادية',
      en: '3D Acrylic Reception Logos & Wayfinding Plaques',
    },
    shortTitle: {
      ar: 'قص وحفر الأكريليك واللوحات الإرشادية',
      en: '3D Acrylic Reception Logos & Wayfinding Plaques',
    },
    description: {
      ar: 'تصنيع وتركيب شعارات خلفية الاستقبال البارزة من الأكريليك متعدد الطبقات مع إضاءة LED خلفية دافئة، لوحات التراخيص والسجل التجاري المثبتة بمسامير ستيل ذهبية، واللوحات الإرشادية للمكاتب والأقسام.',
      en: 'Custom 3D laser-cut acrylic reception backdrop logos with warm halo LED lighting, frosted acrylic commercial license plaques with brushed brass standoffs, and directional office door and desk signs.',
    },
    portfolioSummary: {
      ar: 'تصنيع شعارات الاستقبال الجدارية البارزة بإضاءة Halo خلفية ولوحات التراخيص الأكريليك الثلجية واللوحات الإرشادية للمكاتب.',
      en: 'Custom 3D backlit reception wall signs, frosted license plaques with brass standoffs, and modular architectural wayfinding systems.',
    },
    materialsTag: {
      ar: 'أكريليك بسماكات 10-15 مم · إضاءة هالو LED مخفية · مسامير ستيل ذهبية',
      en: '10-15mm Cast Acrylic · Warm LED Halo Backlighting · Brass Standoffs',
    },
    options: [
      {
        ar: 'شعار جداري بارز ومضيء لمدخل الاستقبال',
        en: '3D Backlit Acrylic Reception Wall Logo',
      },
      {
        ar: 'لوحة أكريليك ثلجي للتراخيص بمسامير ذهبية',
        en: 'Frosted Acrylic License Plaque with Gold Standoffs',
      },
      {
        ar: 'منظومة لوحات إرشادية للمكاتب والأقسام',
        en: 'Modular Office & Corridor Wayfinding Signs',
      },
      {
        ar: 'حروف وشعارات أكريليك مكتبية بارزة',
        en: 'Freestanding 3D Acrylic Desk Letters',
      },
    ],
    specs: [
      {
        ar: 'سماكة 10-15 مم مع إضاءة مخفية وتركيب',
        en: '10-15mm Acrylic with LED Halo & Installation',
      },
      {
        ar: 'أكريليك ثلجي / شفاف مع مسامير ستيل',
        en: 'Frosted / Clear Acrylic with Standoff Mounts',
      },
      {
        ar: 'طقم لوحات إرشادية لكامل المقر',
        en: 'Complete Facility Wayfinding Set',
      },
    ],
  },
  {
    id: 'service-06',
    number: '06',
    category: 'exhibitions',
    driveFileId: '18wFbLAV-GEf2u4JAUS7VVEGHdICMYhH8',
    fileName: '06_استاندات_المعارض_والرول_أب_والبوب_أب_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/18wFbLAV-GEf2u4JAUS7VVEGHdICMYhH8',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=18wFbLAV-GEf2u4JAUS7VVEGHdICMYhH8&sz=w1600',
    title: {
      ar: 'تجهيز أجنحة المعارض، الرول أب، البوب أب، وأعلام الريشة',
      en: 'Exhibition Booths, Pop-Up, Roll-Up & Feather Flags',
    },
    shortTitle: {
      ar: 'تجهيز أجنحة المعارض والرول أب والبوب أب',
      en: 'Exhibition Booths, Pop-Up, Roll-Up & Feather Flags',
    },
    description: {
      ar: 'تجهيز أجنحة المعارض والمؤتمرات والفعاليات: خلفيات المسرح والمعارض المنحنية والمستقيمة (Pop-Up 3x3) مع كشافات الإضاءة، استاندات الرول أب الألمنيوم (Roll-Up)، كونتر الاستقبال الترويجي، وأعلام الريشة الخارجية.',
      en: 'Complete event and exhibition booth displays: curved 3x3 magnetic Pop-Up backdrop walls with spotlights, heavy-duty aluminum Roll-Up banner stands, branded portable reception counters, and feather flags.',
    },
    portfolioSummary: {
      ar: 'تجهيز متكامل لأجنحة المعارض والمؤتمرات يشمل خلفية Pop-Up منحنية، كاونتر استقبال، استاندات Roll-Up ألمنيوم، وأعلام الريشة.',
      en: 'Turnkey exhibition display kit including curved magnetic Pop-Up wall, branded reception counter, aluminum Roll-Up stands, and feather flags.',
    },
    materialsTag: {
      ar: 'هياكل ألمنيوم مغناطيسية · طباعة PVC مضادة للانعكاس · شنط نقل مبطنة',
      en: 'Magnetic Aluminum Frames · Anti-Glare PVC Panels · Padded Carry Cases',
    },
    options: [
      {
        ar: 'جناح معرض متكامل (بوب أب + كاونتر + 2 رول أب + أعلام)',
        en: 'Full Exhibition Booth Package (Pop-Up + Counter + 2 Roll-Ups + Flags)',
      },
      {
        ar: 'خلفية بوب أب منحنية أو مستقيمة (Pop-Up 3x3)',
        en: 'Curved or Straight 3x3 Pop-Up Backdrop',
      },
      {
        ar: 'استاند رول أب ألمنيوم فاخر (85×200 أو 120×200 سم)',
        en: 'Deluxe Aluminum Roll-Up Stand (85x200 or 120x200 cm)',
      },
      {
        ar: 'أعلام الريشة الإعلانية مع القاعدة (Feather Flags)',
        en: 'Promotional Feather Flags with Base',
      },
    ],
    specs: [
      {
        ar: 'طباعة عالية الدقة مقاومة للانعكاس مع شنط النقل',
        en: 'Anti-Glare High-Res Print with Padded Carry Cases',
      },
      {
        ar: 'عدد 1 إلى 2 استاند',
        en: '1 to 2 Stands',
      },
      {
        ar: 'تجهيز جناح مؤتمر أو فعالية كامل',
        en: 'Full Event / Conference Setup',
      },
    ],
  },
  {
    id: 'service-07',
    number: '07',
    category: 'exhibitions',
    driveFileId: '1PhxTSnx39pHEBoLKo6ePMeO1qJ2SIwX9',
    fileName: '07_طباعة_البنرات_الإعلانية_ولوحات_الكانفس_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1PhxTSnx39pHEBoLKo6ePMeO1qJ2SIwX9',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1PhxTSnx39pHEBoLKo6ePMeO1qJ2SIwX9&sz=w1600',
    title: {
      ar: 'طباعة البنرات الإعلانية، الهياكل الحديدية، ولوحات الكانفس',
      en: 'Large-Format Banners, Steel Frames & Wall Canvas',
    },
    shortTitle: {
      ar: 'طباعة البنرات والهياكل الحديدية ولوحات الكانفس',
      en: 'Large-Format Banners, Steel Frames & Wall Canvas',
    },
    description: {
      ar: 'طباعة البنرات الإعلانية الخارجية والداخلية بسماكات ثقيلة مقاومة للشمس والرياح مع تفصيل الهياكل والإطارات الحديدية المشدودة، بالإضافة إلى طباعة وشد لوحات الكانفس القماشية (Gallery Canvas) على إطارات خشبية للمكاتب والمعارض.',
      en: 'Heavy-duty indoor/outdoor PVC vinyl banner printing with welded matte-black steel frames and metal grommets, plus gallery-wrapped stretched cotton canvas wall art mounted on hidden wooden frames.',
    },
    portfolioSummary: {
      ar: 'طباعة البنرات الإعلانية العملاقة المشدودة على هياكل حديدية متينة، بجانب لوحات الكانفس الفنية المشدودة على إطارات خشبية مخفية.',
      en: 'Heavy-duty outdoor PVC banners tensioned on welded steel frames alongside gallery-wrapped cotton canvas art on wooden stretchers.',
    },
    materialsTag: {
      ar: 'بنر PVC ثقيل مقاوم للشمس · هياكل حديدية مدهونة · قماش كانفس قطني مشدود',
      en: 'UV-Resistant Heavy PVC Banner · Welded Steel Frames · Cotton Gallery Canvas',
    },
    options: [
      {
        ar: 'بنر إعلاني مشدود على هيكل حديدي مع حلقات',
        en: 'Taut PVC Banner Mounted on Welded Steel Frame',
      },
      {
        ar: 'طقم لوحات كانفس جدارية مشدودة على خشب',
        en: 'Gallery-Wrapped Stretched Wall Canvas Set',
      },
      {
        ar: 'بنر / فلكس خارجي بالمتر المربع',
        en: 'Custom Size Outdoor Vinyl Banner / Backlit Flex',
      },
    ],
    specs: [
      {
        ar: 'شامل تفصيل الهيكل الحديدي والتركيب',
        en: 'Includes Steel Frame Fabrication & Installation',
      },
      {
        ar: 'طقم 3 لوحات كانفس (70×100 سم)',
        en: 'Set of 3 Wall Canvases (70x100 cm)',
      },
      {
        ar: 'مقاس مخصص (يحدد في الملاحظات)',
        en: 'Custom Dimensions (Specify in Notes)',
      },
    ],
  },
  {
    id: 'service-08',
    number: '08',
    category: 'exhibitions',
    driveFileId: '1ZUY5FlUJLnTeufxBtsHRMtTs20xxxB0t',
    fileName: '08_طباعة_وتركيب_الاستيكرات_واستيكرات_الواجهات_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1ZUY5FlUJLnTeufxBtsHRMtTs20xxxB0t',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1ZUY5FlUJLnTeufxBtsHRMtTs20xxxB0t&sz=w1600',
    title: {
      ar: 'طباعة وتركيب الاستيكرات المقصوصة واستيكرات الواجهات',
      en: 'Die-Cut Stickers, Packaging Labels & Window Frosted Vinyl',
    },
    shortTitle: {
      ar: 'طباعة وتركيب الاستيكرات واستيكرات الواجهات',
      en: 'Die-Cut Stickers, Packaging Labels & Window Frosted Vinyl',
    },
    description: {
      ar: 'طباعة وقص شيتات ورولات الاستيكر الإلكتروني (Kiss-Cut / Die-Cut) لتغليف المنتجات والأكياس والعبوات، وتركيب استيكرات الفينيل والاستيكر الثلجي (Frosted Sandblasted Vinyl) والسي ثرو على الواجهات والقواطع الزجاجية.',
      en: 'Precision kiss-cut and die-cut vinyl sticker sheets, roll labels for pouches and product packaging, and architectural frosted sandblasted glass window decals for office partitions and storefronts.',
    },
    portfolioSummary: {
      ar: 'طباعة وقص إلكتروني لشيتات ورولات ملصقات المنتجات المقاومة للماء، وتنفيذ الاستيكر الثلجي المفرغ لواجهات وقواطع المكاتب.',
      en: 'Electronic kiss-cut/die-cut waterproof packaging labels and architectural frosted glass window vinyl graphics for office partitions.',
    },
    materialsTag: {
      ar: 'فينيل PP/PVC مقاوم للماء · قص إلكتروني Kiss-Cut · استيكر ثلجي رملي للزجاج',
      en: 'Waterproof PP/PVC Vinyl · Electronic Kiss-Cut · Frosted Sandblasted Film',
    },
    options: [
      {
        ar: 'شيتات استيكر مقصوصة إلكترونياً (دائري / مربع / مفرغ)',
        en: 'Kiss-Cut & Die-Cut Vinyl Sticker Sheets',
      },
      {
        ar: 'رولات ملصقات تغليف منتجات وأكياس',
        en: 'Printed Roll Labels for Pouches & Packaging',
      },
      {
        ar: 'استيكر ثلجي / فينيل لواجهات وقواطع الزجاج',
        en: 'Frosted Glass & Window Vinyl Decal + Installation',
      },
    ],
    specs: [
      {
        ar: 'فينيل مقاوم للماء والتمزق (مطفي / لامع)',
        en: 'Waterproof PVC/PP Vinyl (Matte / Gloss)',
      },
      {
        ar: '50 شيت / 1000 ملصق',
        en: '50 Sheets / 1000 Labels',
      },
      {
        ar: 'توريد وتركيب ميداني للزجاج بالرياض',
        en: 'Glass Supply & Installation in Riyadh',
      },
    ],
  },
  {
    id: 'service-09',
    number: '09',
    category: 'uniforms_gifts',
    driveFileId: '1QA4E8jBaZN_SYkjsSrMFslBKWMKc4a33',
    fileName: '09_طباعة_الأقمشة_والزي_الموحد_والتطريز_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1QA4E8jBaZN_SYkjsSrMFslBKWMKc4a33',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1QA4E8jBaZN_SYkjsSrMFslBKWMKc4a33&sz=w1600',
    title: {
      ar: 'طباعة الأقمشة، الزي الموحد، والتطريز الإلكتروني',
      en: 'Corporate Uniforms, Textile Printing & Embroidery',
    },
    shortTitle: {
      ar: 'طباعة الأقمشة والزي الموحد والتطريز',
      en: 'Corporate Uniforms, Textile Printing & Embroidery',
    },
    description: {
      ar: 'تجهيز الزي الموحد (Uniforms) للشركات والمصانع والمطاعم والكافيهات: تيشيرتات بولو مطرزة، تيشيرتات قطنية مطبوعة (DTF / سلك سكرين / كبس حراري)، سترات السلامة المهنية العاكسة (Safety Vests)، المرايل، والكابات.',
      en: 'Complete corporate apparel and uniform branding: 3D-embroidered polo shirts, custom printed cotton T-shirts (DTF, screen print, heat press), reflective engineering safety vests, canvas aprons, and embroidered caps.',
    },
    portfolioSummary: {
      ar: 'تجهيز متكامل للزي الموحد يشمل تيشيرتات البولو المطرزة، سترات السلامة العاكسة للمشاريع، المرايل القماشية، والكابات المطرزة.',
      en: 'Complete corporate uniform line featuring embroidered polo shirts, high-visibility safety vests, canvas barista aprons, and caps.',
    },
    materialsTag: {
      ar: 'أقمشة قطن وبيكيه فاخرة · تطريز إلكتروني بارز · طباعة DTF وسلك سكرين ثابتة',
      en: 'Pique & Combed Cotton · High-Density Embroidery · Durable DTF & Screen Print',
    },
    options: [
      {
        ar: 'تيشيرت بولو مع تطريز إلكتروني للشعار',
        en: 'Polo Shirt with High-Density Logo Embroidery',
      },
      {
        ar: 'تيشيرتات قطنية مطبوعة بهوية الشركة',
        en: 'Custom Printed Cotton T-Shirts',
      },
      {
        ar: 'سترات سلامة عاكسة للمشاريع والمهندسين',
        en: 'High-Visibility Reflective Safety Vests',
      },
      {
        ar: 'مرايل وكابات مطرزة للمطاعم والكافيهات',
        en: 'Embroidered Canvas Aprons & Caps',
      },
    ],
    specs: [
      {
        ar: '20 قطعة (مقاسات متنوعة S - XXL)',
        en: '20 Pieces (Assorted Sizes S - XXL)',
      },
      {
        ar: '50 قطعة (سعر جملة للمنشآت)',
        en: '50 Pieces (Corporate Wholesale)',
      },
      {
        ar: '100 قطعة فأكثر',
        en: '100+ Pieces',
      },
    ],
  },
  {
    id: 'service-10',
    number: '10',
    category: 'uniforms_gifts',
    driveFileId: '14n9ikVVmCB-qEA_D1vBo1Dh9Zfnz34U6',
    fileName: '10_طباعة_اليوفي_UV_المباشرة_وخوذ_السلامة_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/14n9ikVVmCB-qEA_D1vBo1Dh9Zfnz34U6',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=14n9ikVVmCB-qEA_D1vBo1Dh9Zfnz34U6&sz=w1600',
    title: {
      ar: 'طباعة اليوفي (UV) المباشرة، خوذ السلامة، والبروشات',
      en: 'Direct Flatbed UV Printing, Safety Helmets & Badges',
    },
    shortTitle: {
      ar: 'طباعة اليوفي UV المباشرة وخوذ السلامة والبروشات',
      en: 'Direct Flatbed UV Printing, Safety Helmets & Badges',
    },
    description: {
      ar: 'طباعة UV رقمية مباشرة وثابتة بالألوان الكاملة والبارزة (Spot-UV) على الأسطح الصلبة: خوذ السلامة الهندسية (Hard Hats)، البروشات المعدنية والأكريليك المغناطيسية لأسماء الموظفين، الأعلام المكتبية الفاخرة، والعلب الصلبة.',
      en: 'Direct flatbed UV and raised spot-UV printing on rigid substrates: engineering safety helmets/hard hats, brushed steel magnetic employee name badges, satin executive desk flags, and rigid luxury packaging cubes.',
    },
    portfolioSummary: {
      ar: 'طباعة UV مباشرة وبارزة على خوذ السلامة الهندسية، بروشات الأسماء المعدنية بالمغناطيس، الأعلام المكتبية، والعلب الصلبة.',
      en: 'Direct flatbed UV printing on engineering hard hats, magnetic brushed metal name badges, executive desk flags, and rigid boxes.',
    },
    materialsTag: {
      ar: 'طباعة Flatbed UV بارزة · بروشات ستيل ومغناطيس · أعلام ستان بقاعدة كروم',
      en: 'Raised Flatbed UV Ink · Magnetic Brushed Steel Badges · Chrome Desk Flags',
    },
    options: [
      {
        ar: 'خوذ سلامة هندسية مطبوعة UV بشعار الشركة',
        en: 'UV-Printed Engineering Safety Helmets',
      },
      {
        ar: 'بروشات أسماء موظفين معدنية / أكريليك بالمغناطيس',
        en: 'Magnetic Brushed Metal / Acrylic Name Badges',
      },
      {
        ar: 'أعلام مكتبية فاخرة بقاعدة كروم',
        en: 'Luxury Satin Executive Desk Flags',
      },
      {
        ar: 'علب وصناديق صلبة بطباعة UV بارزة',
        en: 'Rigid Packaging Boxes with Raised Spot-UV',
      },
    ],
    specs: [
      {
        ar: '10 قطع',
        en: '10 Pieces',
      },
      {
        ar: '25 قطعة',
        en: '25 Pieces',
      },
      {
        ar: '50 قطعة فأكثر',
        en: '50+ Pieces',
      },
    ],
  },
  {
    id: 'service-11',
    number: '11',
    category: 'uniforms_gifts',
    driveFileId: '11w-FT3KXBr80qOoYzUiRdEoJbmIYlutH',
    fileName: '11_الدروع_التذكارية_والاستاندات_المكتبية_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/11w-FT3KXBr80qOoYzUiRdEoJbmIYlutH',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=11w-FT3KXBr80qOoYzUiRdEoJbmIYlutH&sz=w1600',
    title: {
      ar: 'الدروع التذكارية الملكية والكريستال والاستاندات المكتبية',
      en: 'Commemorative Trophies, Plaques & Executive Desk Stands',
    },
    shortTitle: {
      ar: 'الدروع التذكارية الملكية والاستاندات المكتبية',
      en: 'Commemorative Trophies, Plaques & Executive Desk Stands',
    },
    description: {
      ar: 'تصنيع وحفر الدروع التذكارية الفاخرة لتكريم الشركاء والمنسوبين: دروع الكريستال المشطوفة المحفورة بالليزر والمطبوعة UV، الدروع الخشبية الملكية مع صفائح النحاس المحفورة داخل علب قطيفة فاخرة، واستاندات المكاتب القيادية.',
      en: 'Bespoke commemorative awards and desk accessories: bevelled optical crystal trophies with laser engraving and UV print, royal walnut and etched-brass plaques inside velvet presentation boxes, and executive desk nameplates.',
    },
    portfolioSummary: {
      ar: 'تصنيع الدروع التذكارية الملكية من الخشب والنحاس المحفور، ودروع الكريستال المشطوفة، واستاندات الأسماء المكتبية القيادية.',
      en: 'Bespoke royal walnut and etched-brass plaques in velvet boxes, bevelled optical crystal trophies, and executive desk nameplates.',
    },
    materialsTag: {
      ar: 'كريستال بصري مشطوف · خشب جوز ملكي ونحاس محفور · علب قطيفة مبطنة',
      en: 'Bevelled Optical Crystal · Royal Walnut & Etched Brass · Velvet Cases',
    },
    options: [
      {
        ar: 'درع كريستال فاخر محفور بالليزر ومطبوع UV',
        en: 'Bevelled Optical Crystal Award Trophy',
      },
      {
        ar: 'درع خشبي ملكي بصفيحة نحاسية وعلبة قطيفة',
        en: 'Royal Walnut & Brass Shield in Velvet Box',
      },
      {
        ar: 'استاند اسم مكتبي قيادي (خشب + أكريليك + نحاس)',
        en: 'Executive Walnut, Acrylic & Brass Desk Stand',
      },
    ],
    specs: [
      {
        ar: 'درع مفرد بتصميم خاص',
        en: 'Single Custom Trophy / Stand',
      },
      {
        ar: '5 دروع تكريم مع علب فاخرة',
        en: '5 Trophies with Velvet Presentation Boxes',
      },
      {
        ar: '10 دروع فأكثر لحفلات التكريم',
        en: '10+ Trophies for Award Ceremonies',
      },
    ],
  },
  {
    id: 'service-12',
    number: '12',
    category: 'uniforms_gifts',
    driveFileId: '1JCpJKuWjRCqUYHeam4v-5a0uNtJuEQ7S',
    fileName: '12_الهدايا_الدعائية_وبوكسات_هدايا_الشركات_فنون_الريشة.jpg',
    imageUrl: 'https://lh3.googleusercontent.com/d/1JCpJKuWjRCqUYHeam4v-5a0uNtJuEQ7S',
    fallbackImageUrl:
      'https://drive.google.com/thumbnail?id=1JCpJKuWjRCqUYHeam4v-5a0uNtJuEQ7S&sz=w1600',
    title: {
      ar: 'الهدايا الدعائية وتجهيز بوكسات هدايا الشركات',
      en: 'Promotional Giveaways & VIP Corporate Gift Boxes',
    },
    shortTitle: {
      ar: 'الهدايا الدعائية وبوكسات الشركات',
      en: 'Promotional Giveaways & VIP Corporate Gift Boxes',
    },
    description: {
      ar: 'تجهيز بوكسات هدايا الشركات (VIP Gift Sets) المصممة بفوم داخلي مخصص، وتضم: المج الحراري الستيل (Thermal Tumbler)، النوتة الجلدية الفاخرة، القلم المعدني المحفور، الفلاش ميموري، المج السيراميك، الشنطة القماشية (Tote Bag)، وشريط البطاقة (Lanyard).',
      en: 'Custom-foamed magnetic VIP corporate gift boxes and promotional items: matte stainless steel thermal tumblers, stitched leather notebooks, engraved metal pens, USB flash drives, ceramic mugs, canvas tote bags, and ID lanyards.',
    },
    portfolioSummary: {
      ar: 'تصميم وتجهيز بوكسات هدايا الشركات VIP بفوم مقصوص بالليزر يضم المج الحراري، النوتة الجلدية، القلم المحفور، والفلاش ميموري.',
      en: 'Custom-foamed magnetic VIP corporate gift sets containing thermal tumbler, leather notebook, engraved metal pen, USB, and tote bag.',
    },
    materialsTag: {
      ar: 'علب مغناطيس بفوم مخصص · ستيل حافظ للحرارة · جلد طبيعي/صناعي فاخر · حفر ليزر',
      en: 'Magnetic Rigid Box with Custom Foam · Stainless Tumbler · Leather & Laser Etch',
    },
    options: [
      {
        ar: 'بوكس هدايا VIP متكامل (علبة مغناطيس + مج حراري + نوتة + قلم + فلاش)',
        en: 'Full VIP Magnetic Gift Box Set',
      },
      {
        ar: 'مقات حرارية ستيل + أكواب سيراميك مطبوعة',
        en: 'Branded Thermal Tumblers & Ceramic Mugs',
      },
      {
        ar: 'نوتات جلدية فاخرة + أقلام معدنية محفورة',
        en: 'Stitched Leather Notebooks & Engraved Metal Pens',
      },
      {
        ar: 'شنط قماشية (Tote Bags) + حوامل بطاقات (Lanyards)',
        en: 'Printed Canvas Tote Bags & Satin Lanyards',
      },
    ],
    specs: [
      {
        ar: '25 بوكس / طقم هدايا',
        en: '25 Gift Boxes / Sets',
      },
      {
        ar: '50 بوكس / طقم هدايا',
        en: '50 Gift Boxes / Sets',
      },
      {
        ar: '100 قطعة فأكثر',
        en: '100+ Pieces',
      },
    ],
  },
];

export const TRANSLATIONS = {
  ar: {
    brandName: 'فنون الريشة للدعاية والإعلان',
    brandSubName: 'شركة فنون الريشة للطباعة · الرياض',
    nav: {
      home: 'الرئيسية',
      profile: 'من نحن والبروفايل',
      services: 'الخدمات وطلب التسعير',
      portfolio: 'معرض الأعمال',
      contact: 'تواصل معنا',
      myOrder: 'طلبي',
    },
    controls: {
      switchLang: 'EN',
      switchLangTitle: 'Switch to English',
      lightMode: 'الوضع النهاري',
      darkMode: 'الوضع الداكن',
    },
    hero: {
      kicker: 'الرياض · حي العزيزية · طريق النصر · تصميم وتصنيع وتركيب متكامل',
      headline:
        'فنون الريشة للدعاية والإعلان.. نصوغ حضور علامتك التجارية من الفكرة إلى الإنجاز الميداني',
      subheadline:
        'شريكك الإبداعي والتنفيذي المتكامل في الرياض؛ نجمع بين احترافية التصميم ودقة المصنع لتنفيذ اللوحات التجارية، المطبوعات الرسمية والأوفست، الأختام، تجهيز المعارض، الزي الموحد، والدروع والهدايا الدعائية تحت سقف واحد.',
      primaryCta: 'حدد خدماتك وأرسل طلبك عبر واتساب',
      secondaryCta: 'استعراض البروفايل التعريفي',
      imageCaption: 'واجهة المقر الرئيسي لشركة فنون الريشة للدعاية والإعلان — الرياض، طريق النصر',
      zoomHqBtn: 'تكبير صورة المقر الرئيسي',
      metrics: [
        {
          value: '12',
          unit: 'قسماً إنتاجياً',
          label: 'تحت سقف واحد من التصميم إلى التركيب',
        },
        {
          value: '100%',
          unit: 'تصنيع مباشر',
          label: 'مكائن ليزر وأوفست وطباعة UV حديثة',
        },
        {
          value: '4',
          unit: 'مراحل عمل',
          label: 'من المعاينة الميدانية حتى التسليم النهائي',
        },
        {
          value: 'الرياض',
          unit: 'تغطية ميدانية',
          label: 'رفع مقاسات وتركيب لكافة الأحياء والمناطق',
        },
      ],
    },
    profile: {
      sectionKicker: 'البروفايل التعريفي للشركة · Corporate Profile',
      sectionTitle: 'منظومة إبداعية وصناعية متكاملة تخدم علامتك التجارية',
      sectionSubtitle:
        'نغني الشركات والمؤسسات والجهات التجارية في الرياض عن تشتت الموردين عبر دمج استوديو التصميم الإبداعي بخطوط الإنتاج والطباعة والتركيب الميداني.',
      aboutTitle: 'من نحن',
      aboutBody:
        'تأسست شركة فنون الريشة للدعاية والإعلان والطباعة في مدينة الرياض (حي العزيزية — طريق النصر) لتكون وجهة موحدة تغني الشركات والمؤسسات والجهات التجارية عن تشتت الموردين. نمتلك فريق تصميم متخصص وخطوط إنتاج وطباعة حديثة تشمل قص وحفر الليزر، طباعة الأوفست والديجيتال، طباعة الـ UV المباشرة، وتصنيع وتركيب اللوحات المعمارية.',
      visionTitle: 'رؤيتنا',
      visionBody:
        'أن نكون الخيار الأول والشريك الأكثر موثوقية في قطاع الدعاية والإعلان والطباعة المتكاملة في الرياض والمملكة، عبر تقديم حلول بصرية تجمع بين الأصالة الفنية، متانة الخامات، والانضباط في المواعيد.',
      missionTitle: 'رسالتنا',
      missionBody:
        'تمكين العلامات التجارية من إبراز هويتها بأبهى صورة في واجهات المباني، المكاتب، والمعارض، من خلال منظومة إنتاج شاملة تلتزم بأعلى معايير الدقة اللونية والتشطيب المتقن.',
      valuesTitle: 'قيمنا الجوهرية',
      values: [
        {
          num: '01',
          title: 'إتقان التفاصيل والتشطيب',
          subtitle: 'Precision & Craftsmanship',
          desc: 'فحص دقيق لجودة الحفر، ثبات الألوان، ونظافة التقفيل في كل قطعة تخرج من مصنعنا.',
        },
        {
          num: '02',
          title: 'الالتزام الصارم بالمواعيد',
          subtitle: 'On-Time Delivery',
          desc: 'جدولة إنتاجية واضحة تضمن جاهزية مطبوعاتك وجناح معرضك ولوحاتك قبل موعد افتتاحك.',
        },
        {
          num: '03',
          title: 'الشفافية في توصيف الخامات',
          subtitle: 'Material Transparency',
          desc: 'توضيح سماكات الأكريليك، نوع الكلادينج، أوزان الورق، ونوع الإضاءة بدقة في كل عرض سعر.',
        },
        {
          num: '04',
          title: 'الابتكار وتكامل الحلول',
          subtitle: 'Integrated Innovation',
          desc: 'تنفيذ كافة احتياجات المنشأة من الشعار والختم إلى واجهة المبنى وهدايا كبار العملاء.',
        },
      ],
      workflowTitle: 'منهجية العمل في 4 خطوات تنفيذية',
      workflowSubtitle: 'مسار عمل واضح يضمن مطابقة التنفيذ النهائي لتطلعاتك بنسبة 100%',
      workflowSteps: [
        {
          step: '01',
          title: 'المعاينة ورفع المقاسات',
          enTitle: 'Consultation & Site Survey',
          desc: 'فهم متطلبات مشروعك، اقتراح الخامات الأنسب، وزيارة الموقع ميدانياً في الرياض لرفع المقاسات الدقيقة.',
        },
        {
          step: '02',
          title: 'التصميم واعتماد البروفة (3D Mockup)',
          enTitle: 'Design & 3D Mockup Approval',
          desc: 'إعداد التصاميم والنماذج التخيلية ثلاثية الأبعاد (Mockups) لاعتماد الشكل والألوان قبل البدء بالتصنيع.',
        },
        {
          step: '03',
          title: 'التصنيع والطباعة المركزية',
          enTitle: 'In-House Printing & Fabrication',
          desc: 'تنفيذ الطلب داخل خطوط إنتاجنا (أوفست، ديجيتال، ليزر، UV، حروف بارزة، وتطريز) بإشراف فني مباشر.',
        },
        {
          step: '04',
          title: 'التركيب الميداني والتسليم',
          enTitle: 'Field Installation & Delivery',
          desc: 'توريد وتركيب اللوحات والاستيكرات وأجنحة المعارض في موقع العميل أو تسليم المطبوعات والهدايا مغلفة وجاهزة.',
        },
      ],
    },
    services: {
      sectionKicker: 'كتالوج الخدمات الـ 12 ومنسق الطلبات الذكي',
      sectionTitle: 'خصص خدماتك وأرسل طلب التسعير مباشرة عبر واتساب',
      sectionSubtitle:
        'اختر الخدمة المطلوبة، حدد نوع المنتج والمواصفات والكمية، ثم أضفها إلى سلة طلبك لإرسال طلب موحد ومفصل، أو اطلب أي خدمة بشكل فوري.',
      searchPlaceholder: 'ابحث عن خدمة (مثل: كلادينج، أختام، بروشور، رول أب، دروع، بوكسات)...',
      clearSearch: 'مسح البحث',
      noResults: 'لا توجد خدمات مطابقة لبحثك حالياً. جرب كلمات أخرى أو اعرض كافة الأقسام.',
      optionLabel: '1. اختر المنتج الفرعي / الخامة:',
      specLabel: '2. اختر المواصفات / المقاس:',
      qtyLabel: 'الكمية:',
      noteLabel: 'ملاحظة خاصة بالخدمة (اختياري):',
      notePlaceholder: 'مثال: المقاس بالمتر، الألوان المطلوبة، أو تفاصيل إضافية...',
      addToOrder: 'إضافة إلى طلبي ✓',
      addedToOrder: 'تمت الإضافة لطلبك (تحديث / إضافة المزيد)',
      instantWhatsApp: 'طلب فوري عبر واتساب',
      zoomImage: 'تكبير الصورة',
      inCartCount: 'في سلة طلبك:',
    },
    portfolio: {
      sectionKicker: 'معرض الإنتاج والنماذج المعتمدة · Official Mockup Showcase',
      sectionTitle: 'معرض أعمال ونماذج إنتاج فنون الريشة',
      sectionSubtitle:
        'اضغط على أي نموذج لاستعراضه بالدقة الكاملة (16:9) والاطلاع على الخامات والتشطيبات الفنية المعتمدة في خطوط إنتاجنا.',
      viewFullSize: 'عرض بالحجم الكامل',
      configureThisService: 'تخصيص وطلب هذه الخدمة',
      driveLinkText: 'تصفح مجلد الأصول والموكابات الرسمي على Google Drive',
    },
    drawer: {
      title: 'مراجعة الطلب وإرساله عبر واتساب',
      subtitle: 'راجع الخدمات المختارة وأكمل بياناتك ليتم توليد رسالة طلب منسقة تلقائياً',
      emptyTitle: 'سلة طلباتك فارغة حالياً',
      emptyDesc:
        'قم باختيار خدمة واحدة أو أكثر من كتالوج الخدمات الـ 12 وتحديد مواصفاتها لتظهر هنا.',
      browseServicesBtn: 'تصفح الخدمات الـ 12 الآن',
      selectedItemsHeading: 'الخدمات المحددة في طلبك',
      clearAll: 'إفراغ السلة',
      removeItem: 'حذف البند',
      optionPrefix: 'الخيار:',
      specPrefix: 'المواصفات:',
      notePrefix: 'ملاحظة البند:',
      clientSectionHeading: 'بيانات العميل وتفاصيل التسليم',
      clientNameLabel: 'اسم العميل أو اسم الشركة / المنشأة',
      clientNamePlaceholder: 'مثال: شركة الأفق للتجارة / أ. محمد العتيبي',
      phoneLabel: 'رقم الجوال للتواصل',
      phonePlaceholder: '05XXXXXXXX',
      districtLabel: 'الحي / الموقع في الرياض',
      districtPlaceholder: 'مثال: الرياض - حي العليا / حي العزيزية / الملز',
      urgencyLabel: 'درجة استعجال الطلب وموعد التسليم',
      urgencyOptions: {
        standard: 'تنفيذ اعتيادي (حسب الجدول القياسي)',
        express: 'طلب مستعجل (أولوية قصوى للتنفيذ)',
        event_date: 'مرتبط بموعد فعالية / افتتاح محدد (يذكر في الملاحظات)',
      },
      designLinkLabel: 'رابط ملف التصميم أو الشعار الجاهز (اختياري)',
      designLinkPlaceholder: 'رابط Google Drive أو WeTransfer أو Dropbox إن وجد...',
      additionalNotesLabel: 'ملاحظات إضافية أو تفاصيل المقاسات',
      additionalNotesPlaceholder:
        'اكتب أي تفاصيل إضافية، مقاسات خاصة، أو موعد مناسب للمعاينة الميدانية...',
      livePreviewHeading: 'معاينة حية لرسالة واتساب المولّدة تلقائياً',
      copyMessage: 'نسخ نص الرسالة',
      copiedMessage: 'تم نسخ النص بنجاح ✓',
      sendViaWhatsApp: 'إرسال الطلب عبر واتساب الآن',
      floatingBarItems: 'خدمات مختارة في طلبك',
      floatingBarAction: 'مراجعة الطلب وإرساله عبر واتساب',
    },
    contact: {
      sectionKicker: 'تواصل معنا وزر مقرنا في الرياض · Contact & Location Hub',
      sectionTitle: 'نسعد بخدمتكم في مقر شركة فنون الريشة للدعاية والإعلان',
      sectionSubtitle:
        'تواصل معنا مباشرة عبر الواتساب أو الاتصال الهاتفي، أو تفضل بزيارة مقرنا في طريق النصر بحي العزيزية في الرياض.',
      phoneCardTitle: 'الجوال والواتساب المباشر',
      phoneCardDesc: 'خدمة عملاء واستقبال طلبات التسعير والمعاينة الميدانية',
      whatsappAction: 'محادثة واتساب مباشرة',
      callAction: 'اتصال هاتفي مباشر',
      emailCardTitle: 'البريد الإلكتروني الرسمي',
      emailCardDesc: 'لإرسال الملفات التصميمية عالية الدقة وعروض الأسعار الرسمية للشركات',
      emailAction: 'إرسال بريد إلكتروني',
      addressCardTitle: 'المقر الرئيسي والاتجاهات',
      addressCardDesc: 'طريق النصر، حي العزيزية، الرياض 14513، المملكة العربية السعودية',
      mapsAction: 'فتح الموقع والتقييم في خرائط جوجل',
      socialCardTitle: 'الحسابات الرسمية والمنصات',
      socialCardDesc: 'تابع أحدث أعمالنا وتنفيذاتنا الميدانية اليومية على تيك توك وسناب شات',
      tiktokAction: 'حساب تيك توك الرسمي (TikTok)',
      snapchatAction: 'سناب شات الرسمي (fnooon535)',
      quickFormTitle: 'نموذج استفسار سريع أو طلب معاينة ميدانية عبر واتساب',
      quickFormSubtitle:
        'أرسل استفساراً عاماً أو اطلب زيارة فني رفع المقاسات لموقعك في الرياض ليتم تحويلك مباشرة إلى واتساب الشركة.',
      quickNameLabel: 'الاسم الكريم / اسم المنشأة',
      quickNamePlaceholder: 'أدخل اسمك أو اسم شركتك',
      quickPhoneLabel: 'رقم الجوال',
      quickPhonePlaceholder: '05XXXXXXXX',
      quickTypeLabel: 'نوع الطلب السريع',
      quickTypes: [
        'طلب زيارة ميدانية ورفع مقاسات في الرياض',
        'استفسار عن تسعير مطبوعات أو لوحات تجارية',
        'طلب عرض سعر شامل لتأسيس هوية ومطبوعات شركة',
        'استفسار عام / أخرى',
      ],
      quickMessageLabel: 'تفاصيل الاستفسار أو الموقع',
      quickMessagePlaceholder: 'اكتب تفاصيل طلبك أو موقع المحل/المقر في الرياض...',
      quickSubmitBtn: 'إرسال الاستفسار عبر واتساب',
    },
    lightbox: {
      close: 'إغلاق المعاينة',
      prev: 'السابق',
      next: 'التالي',
      selectThisService: 'تخصيص وطلب هذه الخدمة الآن',
      openDriveOriginal: 'معاينة الملف الأصلي في Google Drive',
    },
    footer: {
      description:
        'شركة فنون الريشة للدعاية والإعلان (شركة فنون الريشة للطباعة) — شريكك المتكامل في الرياض لتصميم الهويات البصرية، تصنيع اللوحات التجارية، مطبوعات الأوفست، الأختام، أجنحة المعارض، الزي الموحد، والدروع والهدايا الدعائية.',
      quickLinksTitle: 'روابط سريعة',
      contactTitle: 'بيانات التواصل والمقر',
      rights: 'جميع الحقوق محفوظة © شركة فنون الريشة للدعاية والإعلان والطباعة — الرياض، المملكة العربية السعودية.',
    },
  },
  en: {
    brandName: 'FUNUN AL RISHA Advertising',
    brandSubName: 'Funun Al-Risha Advertising & Printing Co. · Riyadh',
    nav: {
      home: 'Home',
      profile: 'About & Profile',
      services: 'Services & Order',
      portfolio: 'Portfolio',
      contact: 'Contact',
      myOrder: 'My Order',
    },
    controls: {
      switchLang: 'عربي',
      switchLangTitle: 'التبديل إلى اللغة العربية',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    hero: {
      kicker: 'Riyadh · Al-Aziziyah District · Al-Nasr Road · Design, Production & Installation',
      headline:
        'Funun Al-Risha Advertising & Printing — Crafting Your Brand Presence from Concept to Reality',
      subheadline:
        'Your all-in-one creative studio and production house in Riyadh. We design visual identities and manufacture 3D commercial signage, offset prints, official stamps, exhibition stands, corporate uniforms, trophies, and VIP promotional gifts under one roof.',
      primaryCta: 'Select Your Services & Order via WhatsApp',
      secondaryCta: 'Explore Corporate Profile',
      imageCaption:
        'Funun Al-Risha Advertising & Printing Co. Headquarters & Storefront — Al-Nasr Road, Riyadh',
      zoomHqBtn: 'Enlarge Headquarters View',
      metrics: [
        {
          value: '12',
          unit: 'Production Lines',
          label: 'Complete in-house design, printing & signage under one roof',
        },
        {
          value: '100%',
          unit: 'In-House Quality',
          label: 'Laser cutting, offset presses, flatbed UV & 3D channel letters',
        },
        {
          value: '4',
          unit: 'Execution Stages',
          label: 'From Riyadh site survey & 3D mockup to field installation',
        },
        {
          value: 'Riyadh',
          unit: 'Field Coverage',
          label: 'On-site measurement, delivery & installation across Riyadh',
        },
      ],
    },
    profile: {
      sectionKicker: 'Digital Corporate Profile · نبذة تعريفية',
      sectionTitle: 'An Integrated Creative Studio & Manufacturing Hub for Your Brand',
      sectionSubtitle:
        'Eliminating multi-vendor fragmentation for businesses in Riyadh by uniting graphic design, commercial printing, laser fabrication, and field signage installation.',
      aboutTitle: 'About Us',
      aboutBody:
        'Located on Al-Nasr Road in Al-Aziziyah, Riyadh, Funun Al-Risha Advertising & Printing Co. serves as a comprehensive creative and manufacturing partner for businesses, institutions, and commercial brands. By combining in-house graphic design with advanced laser cutting, offset presses, direct UV flatbed printing, and field signage installation, we deliver consistent quality from initial mockup to final delivery.',
      visionTitle: 'Our Vision',
      visionBody:
        'To be the premier and most trusted advertising and printing partner in Riyadh and across Saudi Arabia, delivering visual solutions that unite artistic excellence, durable materials, and punctual execution.',
      missionTitle: 'Our Mission',
      missionBody:
        'To empower brands to stand out across storefronts, offices, and exhibitions through an integrated production ecosystem committed to color accuracy and flawless finishing.',
      valuesTitle: 'Core Values',
      values: [
        {
          num: '01',
          title: 'Precision & Craftsmanship',
          subtitle: 'إتقان التفاصيل والتشطيب',
          desc: 'Strict quality control across laser engraving depth, CMYK color fidelity, and structural finishing.',
        },
        {
          num: '02',
          title: 'On-Time Delivery',
          subtitle: 'الالتزام الصارم بالمواعيد',
          desc: 'Disciplined production scheduling ensuring your signage, booths, and prints arrive ahead of launch.',
        },
        {
          num: '03',
          title: 'Material Transparency',
          subtitle: 'الشفافية في توصيف الخامات',
          desc: 'Clear specification of acrylic thickness, aluminum cladding grade, paper gsm, and LED modules.',
        },
        {
          num: '04',
          title: 'Integrated Innovation',
          subtitle: 'الابتكار وتكامل الحلول',
          desc: 'One unified partner from official corporate stamps and stationery to full building facades and VIP gifts.',
        },
      ],
      workflowTitle: '4-Step Execution Workflow',
      workflowSubtitle: 'A structured engineering and creative pipeline from survey to handover',
      workflowSteps: [
        {
          step: '01',
          title: 'Consultation & Site Survey',
          enTitle: 'المعاينة ورفع المقاسات',
          desc: 'Understanding project goals, recommending optimal materials, and conducting on-site measurements in Riyadh.',
        },
        {
          step: '02',
          title: 'Design & 3D Mockup Approval',
          enTitle: 'التصميم واعتماد البروفة',
          desc: 'Creating detailed graphic layouts and 3D visual mockups for client sign-off prior to manufacturing.',
        },
        {
          step: '03',
          title: 'In-House Printing & Fabrication',
          enTitle: 'التصنيع والطباعة المركزية',
          desc: 'Executing production across our offset, digital, UV flatbed, laser, embroidery, and signage workshops.',
        },
        {
          step: '04',
          title: 'Field Installation & Delivery',
          enTitle: 'التركيب الميداني والتسليم',
          desc: 'Professional on-site signage and exhibition installation in Riyadh or packaged delivery of print and gift sets.',
        },
      ],
    },
    services: {
      sectionKicker: '12 Interactive Service Categories & Smart Order Configurator',
      sectionTitle: 'Configure Your Services & Send Your Quote Request via WhatsApp',
      sectionSubtitle:
        'Select one or multiple services below, customize your product type, specifications, and quantity, then add to your order cart or send an instant WhatsApp request.',
      searchPlaceholder:
        'Search services (e.g., signage, cladding, stamps, catalogs, roll-up, uniforms, trophies)...',
      clearSearch: 'Clear Search',
      noResults: 'No matching services found. Try another keyword or select "All Services (12)".',
      optionLabel: '1. Select Product Option / Material:',
      specLabel: '2. Select Specification / Size:',
      qtyLabel: 'Quantity:',
      noteLabel: 'Item Note / Custom Dimensions (Optional):',
      notePlaceholder: 'e.g., Exact width/height in meters, preferred colors, or special finish...',
      addToOrder: 'Add to My Order ✓',
      addedToOrder: 'In Your Order (Add / Update Selection)',
      instantWhatsApp: 'Instant WhatsApp',
      zoomImage: 'Enlarge Mockup',
      inCartCount: 'In Your Order:',
    },
    portfolio: {
      sectionKicker: 'Production Portfolio & Official Mockups · معرض الأعمال',
      sectionTitle: 'Funun Al-Risha Production Showcase',
      sectionSubtitle:
        'Click any project mockup to inspect full 16:9 high-resolution craftsmanship details, material specifications, and configure your own order.',
      viewFullSize: 'Inspect Full 16:9 Mockup',
      configureThisService: 'Configure & Order This Service',
      driveLinkText: 'View Official Google Drive Mockups & Assets Folder',
    },
    drawer: {
      title: 'Review & Send Order via WhatsApp',
      subtitle:
        'Review your selected services and fill in your details to generate a structured WhatsApp quote request',
      emptyTitle: 'Your Order Cart is Empty',
      emptyDesc:
        'Select one or more services from the 12 service categories and configure their specifications to review them here.',
      browseServicesBtn: 'Browse the 12 Services',
      selectedItemsHeading: 'Selected Services in Your Order',
      clearAll: 'Clear Cart',
      removeItem: 'Remove item',
      optionPrefix: 'Option:',
      specPrefix: 'Spec:',
      notePrefix: 'Item Note:',
      clientSectionHeading: 'Client Details & Delivery Preferences',
      clientNameLabel: 'Client / Company Name',
      clientNamePlaceholder: 'e.g., Horizon Trading Co. / Mohammed Al-Otaibi',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '05XXXXXXXX',
      districtLabel: 'Location / District in Riyadh',
      districtPlaceholder: 'e.g., Riyadh - Al-Aziziyah / Al-Olaya / Al-Malaz',
      urgencyLabel: 'Order Urgency & Expected Delivery',
      urgencyOptions: {
        standard: 'Standard Production Schedule',
        express: 'Urgent / Express Priority Execution',
        event_date: 'Tied to Specific Event / Launch Date (Specify in Notes)',
      },
      designLinkLabel: 'Design or Logo File Link (Optional)',
      designLinkPlaceholder: 'Paste Google Drive, WeTransfer, or Dropbox link if available...',
      additionalNotesLabel: 'Additional Notes / Custom Specs',
      additionalNotesPlaceholder:
        'Add any custom dimensions, installation site notes, or preferred survey time...',
      livePreviewHeading: 'Live Preview of Generated WhatsApp Message',
      copyMessage: 'Copy Message Text',
      copiedMessage: 'Copied to Clipboard ✓',
      sendViaWhatsApp: 'Send Order via WhatsApp',
      floatingBarItems: 'Selected Services in Order',
      floatingBarAction: 'Review & Send via WhatsApp',
    },
    contact: {
      sectionKicker: 'Contact & Location Hub · تواصل معنا',
      sectionTitle: 'Connect with Funun Al-Risha Advertising & Printing in Riyadh',
      sectionSubtitle:
        'Reach our team directly via WhatsApp or phone, or visit our showroom and production headquarters on Al-Nasr Road, Al-Aziziyah District, Riyadh.',
      phoneCardTitle: 'Direct Phone & WhatsApp',
      phoneCardDesc: 'Instant quotation inquiries, order follow-ups, and Riyadh site surveys',
      whatsappAction: 'Chat on WhatsApp',
      callAction: 'Call 0553352824',
      emailCardTitle: 'Official Email Address',
      emailCardDesc: 'For vector artwork files, corporate tenders, and formal RFQs',
      emailAction: 'Send Email',
      addressCardTitle: 'Headquarters & Directions',
      addressCardDesc: 'Al-Nasr Road, Al-Aziziyah District, Riyadh 14513, Kingdom of Saudi Arabia',
      mapsAction: 'Open Location & Review on Google Maps',
      socialCardTitle: 'Official Social Channels',
      socialCardDesc: 'Watch our daily fabrication, printing, and installation reels on TikTok & Snapchat',
      tiktokAction: 'Official TikTok Channel',
      snapchatAction: 'Official Snapchat (fnooon535)',
      quickFormTitle: 'Quick WhatsApp Inquiry or Site Survey Request',
      quickFormSubtitle:
        'Send a general inquiry or request an on-site measurement visit in Riyadh directly to our WhatsApp desk.',
      quickNameLabel: 'Your Name / Company Name',
      quickNamePlaceholder: 'Enter your name or organization',
      quickPhoneLabel: 'Mobile Number',
      quickPhonePlaceholder: '05XXXXXXXX',
      quickTypeLabel: 'Inquiry Type',
      quickTypes: [
        'Request Site Survey & Measurement in Riyadh',
        'Signage / Printing Quotation Inquiry',
        'Complete Corporate Branding & Stationery Package',
        'General Inquiry / Other',
      ],
      quickMessageLabel: 'Inquiry Details or Location',
      quickMessagePlaceholder: 'Describe your project requirements or storefront location in Riyadh...',
      quickSubmitBtn: 'Send Inquiry via WhatsApp',
    },
    lightbox: {
      close: 'Close Preview',
      prev: 'Previous',
      next: 'Next',
      selectThisService: 'Configure & Order This Service',
      openDriveOriginal: 'View Original File on Google Drive',
    },
    footer: {
      description:
        'FUNUN AL RISHA Advertising & Printing Co. — Your comprehensive creative and manufacturing partner in Riyadh for 3D commercial signage, corporate stationery, offset printing, official stamps, exhibition stands, uniforms, trophies, and VIP corporate gifts.',
      quickLinksTitle: 'Quick Navigation',
      contactTitle: 'Official Contact & Location',
      rights:
        'All Rights Reserved © FUNUN AL RISHA Advertising & Printing Co. — Riyadh, Kingdom of Saudi Arabia.',
    },
  },
};
