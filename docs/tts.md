# Text-to-Speech (TTS) Session Guide

This document defines the planned TTS session structure and the language support roadmap. It is intended to keep future implementations consistent across providers and make it easy to add new languages over time.

## TTS Session Structure

A TTS session represents a single synthesis request and its lifecycle. The minimum fields to track are:

- **id**: unique session identifier
- **text**: input text to synthesize
- **languageCode**: BCP-47 language tag (e.g., `yue-HK`)
- **provider**: TTS provider identifier
- **voiceId**: optional voice selection within the provider
- **status**: queued → synthesizing → ready/failed/cancelled
- **createdAt / updatedAt**: ISO timestamps for auditability
- **errorMessage**: failure details (if any)

These fields are defined in `frontend/src/types/tts.ts` and should be mirrored in the Rust backend when TTS is implemented.

## Language Support Roadmap

Primary languages for the HK patch:

- **Cantonese (`yue-HK`)** — required
- **Mandarin (`zh-CN`)** — required

Planned expansion languages:

- **Mandarin (Traditional) (`zh-TW`)**
- **Korean (`ko-KR`)**
- **Japanese (`ja-JP`)**

The canonical list lives in `frontend/src/constants/ttsLanguages.ts`. Each language entry includes support level and notes to guide prioritization.

## Adding a New TTS Language

When introducing a new language:

1. Add the BCP-47 language tag and metadata to `frontend/src/constants/ttsLanguages.ts`.
2. Map the language code to provider-specific IDs (if the provider uses its own language identifiers).
3. Update any UI selectors to show the new language and its support level.
4. Add validation so unsupported languages fail fast with a clear error.

## Provider Compatibility Notes

Providers often use different language identifiers or voice availability. Keep provider capability mapping close to the TTS session layer so session creation can validate language + voice availability before synthesis begins.
