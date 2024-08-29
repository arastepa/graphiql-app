import { describe, expect, test } from 'vitest';
import i18n from '../utils/i18n';

describe('i18n configuration', () => {
  test('i18n is initialized with correct languages', () => {
    expect(Object.keys(i18n.options.resources || {})).toEqual(
      expect.arrayContaining(['en', 'ka', 'am']),
    );
  });

  test('default language is set to English', () => {
    expect(i18n.language).toBe('en');
  });

  test('fallback language is set to Georgian', () => {
    expect(i18n.options.fallbackLng).toEqual(['ka']);
  });

  test('translations are loaded correctly', () => {
    expect(i18n.hasResourceBundle('en', 'translation')).toBe(true);
    expect(i18n.hasResourceBundle('ka', 'translation')).toBe(true);
    expect(i18n.hasResourceBundle('am', 'translation')).toBe(true);
  });

  test('interpolation escaping is disabled', () => {
    expect(i18n.options.interpolation?.escapeValue).toBe(false);
  });
});
