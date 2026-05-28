export type TtsProvider = 'openai' | 'elevenlabs' | 'local' | 'custom';

export type TtsSessionStatus =
  | 'queued'
  | 'synthesizing'
  | 'ready'
  | 'failed'
  | 'cancelled';

export interface TtsVoice {
  id: string;
  name: string;
  provider: TtsProvider;
  languageCode: string;
  gender?: 'female' | 'male' | 'neutral';
  sampleRateHz?: number;
  notes?: string;
}

export interface TtsSession {
  id: string;
  text: string;
  languageCode: string;
  provider: TtsProvider;
  voiceId?: string;
  status: TtsSessionStatus;
  createdAt: string;
  updatedAt?: string;
  errorMessage?: string;
}

export interface TtsProviderCapabilities {
  provider: TtsProvider;
  supportedLanguageCodes: string[];
  supportsSsml?: boolean;
  notes?: string;
}
