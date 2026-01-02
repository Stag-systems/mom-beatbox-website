export type Language = 'en' | 'de';

export type LocalizedString = {
  en: string;
  de: string;
};

export function getLocalizedText(
  text: LocalizedString,
  language: Language
): string {
  return text[language] || text.en;
}
