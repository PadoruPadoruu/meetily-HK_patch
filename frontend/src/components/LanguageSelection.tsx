import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import Analytics from '@/lib/analytics';
import { toast } from 'sonner';
import { useConfig } from '@/contexts/ConfigContext';
import { useTranslation } from 'react-i18next';
import {
  getTranscriptionLanguageLabel,
  getTranscriptionLanguagesForProvider,
  normalizeTranscriptionLanguage,
} from '@/constants/languages';

interface LanguageSelectionProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  disabled?: boolean;
  provider?: 'localWhisper' | 'parakeet' | 'deepgram' | 'elevenLabs' | 'groq' | 'openai';
}

export function LanguageSelection({
  selectedLanguage,
  onLanguageChange,
  disabled = false,
  provider = 'localWhisper'
}: LanguageSelectionProps) {
  const [saving, setSaving] = useState(false);
  const { setSelectedLanguage } = useConfig();
  const { t } = useTranslation();

  // Parakeet only supports auto-detection (doesn't support manual language selection)
  const isParakeet = provider === 'parakeet';
  const availableLanguages = getTranscriptionLanguagesForProvider(provider);

  const handleLanguageChange = async (languageCode: string) => {
    setSaving(true);
    try {
      const normalizedLanguage = normalizeTranscriptionLanguage(languageCode);
      // Save language preference to localStorage and sync to backend
      setSelectedLanguage(normalizedLanguage);
      onLanguageChange(normalizedLanguage);
      console.log('Language preference saved:', normalizedLanguage);

      // Track language selection analytics
      const languageName = getTranscriptionLanguageLabel(normalizedLanguage);
      await Analytics.track('language_selected', {
        language_code: normalizedLanguage,
        language_name: languageName || 'Unknown',
        is_auto_detect: (normalizedLanguage === 'auto').toString(),
        is_auto_translate: (normalizedLanguage === 'auto-translate').toString()
      });

      // Show success toast
      toast.success(t('language.toastSavedTitle'), {
        description: t('language.toastSavedDescription', { language: languageName })
      });
    } catch (error) {
      console.error('Failed to save language preference:', error);
      toast.error(t('language.toastErrorTitle'), {
        description: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setSaving(false);
    }
  };

  // Find the selected language name for display
  const normalizedSelectedLanguage = normalizeTranscriptionLanguage(selectedLanguage);
  const selectedLanguageName =
    getTranscriptionLanguageLabel(normalizedSelectedLanguage) ||
    t('language.autoDetectOriginal');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-gray-600" />
          <h4 className="text-sm font-medium text-gray-900">{t('language.transcriptionLanguage')}</h4>
        </div>
      </div>

      <div className="space-y-2">
        <select
          value={normalizedSelectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          disabled={disabled || saving}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
        >
          {availableLanguages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
              {language.code !== 'auto' && language.code !== 'auto-translate' && ` (${language.code})`}
            </option>
          ))}
        </select>

        {/* Parakeet language limitation warning */}
        {isParakeet && (
          <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-800">
            <p className="font-medium">{t('language.parakeetTitle')}</p>
            <p className="mt-1 text-xs">{t('language.parakeetDescription')}</p>
          </div>
        )}

        {/* Info text */}
        <div className="text-xs space-y-2 pt-2">
          <p className="text-gray-600">
            <strong>{t('language.currentLabel')}</strong> {selectedLanguageName}
          </p>
          {normalizedSelectedLanguage === 'auto' && (
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
              <p className="font-medium">{t('language.autoDetectWarningTitle')}</p>
              <p className="mt-1">{t('language.autoDetectWarningBody')}</p>
              <p className="mt-1">{t('language.hkHint')}</p>
            </div>
          )}
          {normalizedSelectedLanguage === 'auto-translate' && (
            <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
              <p className="font-medium">{t('language.autoTranslateTitle')}</p>
              <p className="mt-1">{t('language.autoTranslateDescription')}</p>
            </div>
          )}
          {normalizedSelectedLanguage !== 'auto' && normalizedSelectedLanguage !== 'auto-translate' && (
            <p className="text-gray-600">
              {t('language.optimizedFor', { language: selectedLanguageName })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
