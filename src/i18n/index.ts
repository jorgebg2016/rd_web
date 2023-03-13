import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import type { Composer, I18n, Locale, VueI18n, I18nOptions } from 'vue-i18n';
import ptBR from './locales/pt-BR.json';

// Type-define 'pt-BR' as the master schema for the resource

export const SUPPORT_LOCALES = ['pt-BR'];
type MessageSchema = typeof ptBR;

export function getLocale(i18n: I18n): string {
  return i18n.mode === 'legacy'
    ? (i18n.global as unknown as VueI18n).locale
    : (i18n.global as unknown as Composer).locale.value;
}

export function setLocale(i18n: I18n, locale: Locale): void {
  i18n.mode === 'legacy'
    ? ((i18n.global as unknown as VueI18n).locale = locale)
    : ((i18n.global as unknown as Composer).locale.value = locale);
}

export function setupI18n(options: I18nOptions = { locale: 'pt-BR' }) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale as Locale);
  return i18n;
}

export function setI18nLanguage(i18n: I18n, locale: Locale) {
  setLocale(i18n, locale);
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')?.setAttribute('lang', locale);
}

const getResourceMessages = (r: MessageSchema) => r;

export async function loadLocaleMessages(i18n: I18n, locale: Locale) {
  // load locale messages
  const messages = await import(`@/i18n/locales/${locale}.json`).then(
    getResourceMessages
  );

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages);

  return nextTick();
}

const i18n = setupI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
  },
});

export default i18n;
