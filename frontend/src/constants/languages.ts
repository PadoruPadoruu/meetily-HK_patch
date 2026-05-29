export type TranscriptionProvider =
  | 'localWhisper'
  | 'parakeet'
  | 'deepgram'
  | 'elevenLabs'
  | 'groq'
  | 'openai';

export interface TranscriptionLanguage {
  code: string;
  name: string;
  aliases?: string[];
  providerCodes?: Partial<Record<TranscriptionProvider, string | null>>;
  isAuto?: boolean;
  isTranslate?: boolean;
}

export const DEFAULT_TRANSCRIPTION_LANGUAGE = 'yue-HK';

// Canonical language list used across selectors (BCP-47 where applicable).
export const TRANSCRIPTION_LANGUAGES: TranscriptionLanguage[] = [
  {
    code: 'auto',
    name: 'Auto Detect (Original Language)',
    isAuto: true,
  },
  {
    code: 'auto-translate',
    name: 'Auto Detect (Translate to English)',
    isTranslate: true,
  },
  {
    code: 'yue-HK',
    name: 'Cantonese (Hong Kong)',
    aliases: ['yue'],
    providerCodes: {
      localWhisper: 'yue',
      deepgram: 'yue-HK',
      openai: 'yue',
      groq: 'yue',
      elevenLabs: 'yue',
    },
  },
  {
    code: 'zh-Hans',
    name: 'Chinese (Simplified)',
    aliases: ['zh', 'zh-CN'],
    providerCodes: {
      localWhisper: 'zh',
      deepgram: 'zh-CN',
      openai: 'zh',
      groq: 'zh',
      elevenLabs: 'zh',
    },
  },
  {
    code: 'zh-Hant',
    name: 'Chinese (Traditional)',
    aliases: ['zh-TW'],
    providerCodes: {
      localWhisper: 'zh',
      deepgram: 'zh-TW',
      openai: 'zh',
      groq: 'zh',
      elevenLabs: 'zh',
    },
  },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'ru', name: 'Russian' },
  { code: 'ko', name: 'Korean' },
  { code: 'fr', name: 'French' },
  { code: 'ja', name: 'Japanese' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'ca', name: 'Catalan' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ar', name: 'Arabic' },
  { code: 'sv', name: 'Swedish' },
  { code: 'it', name: 'Italian' },
  { code: 'id', name: 'Indonesian' },
  { code: 'hi', name: 'Hindi' },
  { code: 'fi', name: 'Finnish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'he', name: 'Hebrew' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'el', name: 'Greek' },
  { code: 'ms', name: 'Malay' },
  { code: 'cs', name: 'Czech' },
  { code: 'ro', name: 'Romanian' },
  { code: 'da', name: 'Danish' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ta', name: 'Tamil' },
  { code: 'no', name: 'Norwegian' },
  { code: 'th', name: 'Thai' },
  { code: 'ur', name: 'Urdu' },
  { code: 'hr', name: 'Croatian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'la', name: 'Latin' },
  { code: 'mi', name: 'Maori' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'cy', name: 'Welsh' },
  { code: 'sk', name: 'Slovak' },
  { code: 'te', name: 'Telugu' },
  { code: 'fa', name: 'Persian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'bn', name: 'Bengali' },
  { code: 'sr', name: 'Serbian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'kn', name: 'Kannada' },
  { code: 'et', name: 'Estonian' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'br', name: 'Breton' },
  { code: 'eu', name: 'Basque' },
  { code: 'is', name: 'Icelandic' },
  { code: 'hy', name: 'Armenian' },
  { code: 'ne', name: 'Nepali' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'sq', name: 'Albanian' },
  { code: 'sw', name: 'Swahili' },
  { code: 'gl', name: 'Galician' },
  { code: 'mr', name: 'Marathi' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'km', name: 'Khmer' },
  { code: 'sn', name: 'Shona' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'so', name: 'Somali' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'oc', name: 'Occitan' },
  { code: 'ka', name: 'Georgian' },
  { code: 'be', name: 'Belarusian' },
  { code: 'tg', name: 'Tajik' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'am', name: 'Amharic' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'lo', name: 'Lao' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'fo', name: 'Faroese' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ps', name: 'Pashto' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'nn', name: 'Norwegian Nynorsk' },
  { code: 'mt', name: 'Maltese' },
  { code: 'sa', name: 'Sanskrit' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'my', name: 'Myanmar' },
  { code: 'bo', name: 'Tibetan' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'as', name: 'Assamese' },
  { code: 'tt', name: 'Tatar' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'ln', name: 'Lingala' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ba', name: 'Bashkir' },
  { code: 'jw', name: 'Javanese' },
  { code: 'su', name: 'Sundanese' },
];

const normalizeCode = (code: string) => code.toLowerCase();

export function findTranscriptionLanguage(code: string): TranscriptionLanguage | undefined {
  const normalized = normalizeCode(code);
  return TRANSCRIPTION_LANGUAGES.find((lang) => {
    if (normalizeCode(lang.code) === normalized) {
      return true;
    }
    return (lang.aliases || []).some((alias) => normalizeCode(alias) === normalized);
  });
}

export function normalizeTranscriptionLanguage(code?: string | null): string {
  if (!code) return 'auto';
  const match = findTranscriptionLanguage(code);
  return match ? match.code : code;
}

export function getTranscriptionLanguageLabel(code: string): string {
  const match = findTranscriptionLanguage(code);
  return match?.name ?? code;
}

export function getTranscriptionLanguagesForProvider(
  provider?: TranscriptionProvider
): TranscriptionLanguage[] {
  return TRANSCRIPTION_LANGUAGES.filter((lang) => {
    if (provider === 'parakeet') {
      return lang.isAuto;
    }
    if (lang.code === 'auto-translate' && provider !== 'localWhisper') {
      return false;
    }
    return true;
  });
}

export function resolveTranscriptionLanguage(
  code: string,
  provider?: TranscriptionProvider
): string | null {
  const normalized = normalizeTranscriptionLanguage(code);
  if (normalized === 'auto') {
    return null;
  }
  if (normalized === 'auto-translate') {
    return provider === 'localWhisper' ? 'auto-translate' : null;
  }
  const match = findTranscriptionLanguage(normalized);
  if (!match) return normalized;
  const providerCode = provider ? match.providerCodes?.[provider] : undefined;
  if (providerCode === null) {
    return null;
  }
  return providerCode || match.code;
}
