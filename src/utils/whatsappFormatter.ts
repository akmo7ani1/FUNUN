import {
  CartItem,
  ClientOrderInfo,
  Language,
  OFFICIAL_CONTACT,
  SERVICES_DATA,
  ServiceItem,
  TRANSLATIONS,
} from '../data/siteData';

export function buildCartWhatsAppMessage(
  cart: CartItem[],
  clientInfo: ClientOrderInfo,
  lang: Language
): string {
  const t = TRANSLATIONS[lang].drawer;

  if (lang === 'ar') {
    const lines: string[] = [
      'السلام عليكم ورحمة الله وبركاته،',
      'أرغب في طلب تسعير وتنفيذ الخدمات التالية من *شركة فنون الريشة للدعاية والإعلان*:',
      '',
    ];

    cart.forEach((item, index) => {
      const service = SERVICES_DATA.find((s) => s.id === item.serviceId);
      if (!service) return;
      const optionText =
        service.options[item.optionIndex]?.ar || service.options[0].ar;
      const specText =
        service.specs[item.specIndex]?.ar || service.specs[0].ar;

      lines.push(`${index + 1}. *${service.shortTitle.ar}*`);
      lines.push(`   - الخيار: ${optionText}`);
      lines.push(`   - المواصفات: ${specText} | الكمية: ${item.quantity}`);
      if (item.itemNote.trim()) {
        lines.push(`   - ملاحظة البند: ${item.itemNote.trim()}`);
      }
      lines.push('');
    });

    lines.push('👤 *بيانات العميل:*');
    lines.push(
      `• الاسم / المنشأة: ${clientInfo.clientName.trim() || 'غير محدد'}`
    );
    lines.push(`• رقم الجوال: ${clientInfo.phone.trim() || 'غير محدد'}`);
    lines.push(
      `• الموقع / الحي: ${clientInfo.district.trim() || 'الرياض'}`
    );
    lines.push(
      `• درجة الاستعجال: ${t.urgencyOptions[clientInfo.urgency]}`
    );
    if (clientInfo.designLink.trim()) {
      lines.push(`• رابط ملف التصميم / الشعار: ${clientInfo.designLink.trim()}`);
    }
    if (clientInfo.additionalNotes.trim()) {
      lines.push('📝 *ملاحظات إضافية:*');
      lines.push(clientInfo.additionalNotes.trim());
    }

    return lines.join('\n');
  } else {
    const lines: string[] = [
      'Hello Funun Al-Risha Advertising & Printing Co.,',
      'I would like to request a quote and order the following services:',
      '',
    ];

    cart.forEach((item, index) => {
      const service = SERVICES_DATA.find((s) => s.id === item.serviceId);
      if (!service) return;
      const optionText =
        service.options[item.optionIndex]?.en || service.options[0].en;
      const specText =
        service.specs[item.specIndex]?.en || service.specs[0].en;

      lines.push(`${index + 1}. *${service.shortTitle.en}*`);
      lines.push(`   - Option: ${optionText}`);
      lines.push(`   - Spec: ${specText} | Qty: ${item.quantity}`);
      if (item.itemNote.trim()) {
        lines.push(`   - Item Note: ${item.itemNote.trim()}`);
      }
      lines.push('');
    });

    lines.push('👤 *Client Details:*');
    lines.push(
      `• Name / Company: ${clientInfo.clientName.trim() || 'Not specified'}`
    );
    lines.push(`• Phone: ${clientInfo.phone.trim() || 'Not specified'}`);
    lines.push(
      `• Location / District: ${clientInfo.district.trim() || 'Riyadh'}`
    );
    lines.push(`• Urgency: ${t.urgencyOptions[clientInfo.urgency]}`);
    if (clientInfo.designLink.trim()) {
      lines.push(`• Design / Logo Link: ${clientInfo.designLink.trim()}`);
    }
    if (clientInfo.additionalNotes.trim()) {
      lines.push('📝 *Additional Notes:*');
      lines.push(clientInfo.additionalNotes.trim());
    }

    return lines.join('\n');
  }
}

export function buildSingleServiceWhatsAppMessage(
  service: ServiceItem,
  optionIndex: number,
  specIndex: number,
  quantity: number,
  itemNote: string,
  lang: Language
): string {
  const optionText =
    service.options[optionIndex]?.[lang] || service.options[0][lang];
  const specText = service.specs[specIndex]?.[lang] || service.specs[0][lang];

  if (lang === 'ar') {
    const lines = [
      'السلام عليكم ورحمة الله وبركاته،',
      'أرغب في طلب تسعير وتنفيذ الخدمة التالية من *شركة فنون الريشة للدعاية والإعلان*:',
      '',
      `1. *${service.shortTitle.ar}*`,
      `   - الخيار: ${optionText}`,
      `   - المواصفات: ${specText} | الكمية: ${quantity}`,
    ];
    if (itemNote.trim()) {
      lines.push(`   - ملاحظة خاصة: ${itemNote.trim()}`);
    }
    return lines.join('\n');
  } else {
    const lines = [
      'Hello Funun Al-Risha Advertising & Printing Co.,',
      'I would like to request a quote for the following service:',
      '',
      `1. *${service.shortTitle.en}*`,
      `   - Option: ${optionText}`,
      `   - Spec: ${specText} | Qty: ${quantity}`,
    ];
    if (itemNote.trim()) {
      lines.push(`   - Note: ${itemNote.trim()}`);
    }
    return lines.join('\n');
  }
}

export function buildQuickInquiryWhatsAppUrl(
  name: string,
  phone: string,
  inquiryType: string,
  message: string,
  lang: Language
): string {
  const text =
    lang === 'ar'
      ? [
          'السلام عليكم ورحمة الله وبركاته،',
          'لدي استفسار سريع لـ *شركة فنون الريشة للدعاية والإعلان*:',
          '',
          `• نوع الطلب: ${inquiryType}`,
          `• الاسم / المنشأة: ${name.trim() || 'غير محدد'}`,
          `• رقم الجوال: ${phone.trim() || 'غير محدد'}`,
          `• التفاصيل / الموقع: ${message.trim() || 'أرجو التواصل معي للتفاصيل'}`,
        ].join('\n')
      : [
          'Hello Funun Al-Risha Advertising & Printing Co.,',
          'I have a quick inquiry:',
          '',
          `• Inquiry Type: ${inquiryType}`,
          `• Name / Company: ${name.trim() || 'Not specified'}`,
          `• Phone: ${phone.trim() || 'Not specified'}`,
          `• Details / Location: ${message.trim() || 'Please contact me for details'}`,
        ].join('\n');

  return `${OFFICIAL_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppRedirectUrl(message: string): string {
  return `${OFFICIAL_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
