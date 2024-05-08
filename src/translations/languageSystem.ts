import en from '../translations/en.json';

/**
 * LanguageSystem class provides translation functionality.
 *
 * This class allows retrieving translations for different keys.
 */
abstract class LanguageSystem {
  // English language translations
  protected static enLang: { [key: string]: string } = en;

  /**
   * Get translation for the specified key.
   *
   * @param {string} key - The key for the translation.
   * @returns {string} The translation corresponding to the key.
   */
  static getTranslation(key: string): string {
    return this.enLang[key] || `Translation not found for key: ${key}`;
  }
}

export default LanguageSystem;
