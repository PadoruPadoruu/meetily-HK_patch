export type TtsSupportLevel = 'required' | 'planned';

export interface TtsLanguage {
  code: string;
  name: string;
  locale: string;
  support: TtsSupportLevel;
  notes?: string;
}

// BCP-47 language tags for planned TTS support.
export const TTS_LANGUAGES: TtsLanguage[] = [
  {
    code: 'yue-HK',
    name: 'Cantonese',
    locale: 'Hong Kong',
    support: 'required',
    notes: 'Priority dialect for HK builds (distinct from Mandarin).',
  },
  {
    code: 'zh-CN',
    name: 'Mandarin (Simplified)',
    locale: 'Mainland China',
    support: 'required',
    notes: 'Standard Mandarin in Simplified Chinese.',
  },
  {
    code: 'zh-TW',
    name: 'Mandarin (Traditional)',
    locale: 'Taiwan',
    support: 'planned',
    notes: 'Optional expansion once initial Mandarin support is stable.',
  },
  {
    code: 'ko-KR',
    name: 'Korean',
    locale: 'South Korea',
    support: 'planned',
    notes: 'Future expansion target.',
  },
  {
    code: 'ja-JP',
    name: 'Japanese',
    locale: 'Japan',
    support: 'planned',
    notes: 'Future expansion target.',
  },
];
