// @ts-check

/** Site-wide settings. Club facts here are placeholders (see PRODUCT.md). */
export const site = Object.freeze({
  name: 'サンプルFC',
  nameEn: 'SAMPLE FC',
  lang: 'ja',
  /** Absolute origin for canonical / OG URLs. Replace on deployment. */
  origin: 'https://example.com',
  description:
    'サンプルFCは U-8 から U-18 までの年代別チームとサッカースクールを運営するユースフットボールクラブです（クラブ紹介は架空のサンプルです）。',
  themeColor: '#00236a',
  contact: {
    address: '〒000-0000 サンプル県サンプル市中央1-2-3（架空の住所）',
    email: 'info@example.com',
    hours: '平日 10:00–18:00',
  },
  /** Placeholder accounts; set a real URL when each account is configured. */
  social: [
    { id: 'instagram', label: 'Instagram', handle: '@samplefc_official', url: '' },
    { id: 'youtube', label: 'YouTube', handle: 'サンプルFC チャンネル', url: '' },
    { id: 'x', label: 'X', handle: '@samplefc', url: '' },
  ],
  instagramWidgetFeedId: '4Qa1WF2VOZPlq5wfK5rD',
  fonts: {
    /** Japanese face via Google Fonts (unicode-range subsetting). Archivo is self-hosted. */
    stylesheet:
      'https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap',
    preload: ['/fonts/archivo-latin-var.woff2'],
  },
});
