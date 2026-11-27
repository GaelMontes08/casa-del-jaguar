import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

type TranslationMap = Record<string, string>;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    const langMessages = ui[lang] as TranslationMap;
    const defaultMessages = ui[defaultLang] as TranslationMap;
    return langMessages[key] || defaultMessages[key];
  }
}

export function getStaticPaths() {
  return [
    { params: { lang: 'en' } },
  ];
}

function withTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';
  const hash = path.includes('#') ? path.slice(path.indexOf('#')) : '';
  const bare = hash ? path.slice(0, path.indexOf('#')) : path;
  if (bare === '/' || bare.endsWith('/')) return `${bare}${hash}`;
  const last = bare.split('/').pop() ?? '';
  if (last.includes('.')) return path;
  return `${bare}/${hash}`;
}

export function translatePath(path: string, lang: string): string {
  const slashed = withTrailingSlash(path);
  if (lang === defaultLang) {
    return slashed;
  }
  if (slashed === '/') return `/${lang}/`;
  return `/${lang}${slashed.startsWith('/') ? slashed : `/${slashed}`}`;
}

export function getLocalizedPath(path: string, currentLang: string, targetLang: string): string {
  // Remove current language prefix if it exists
  let cleanPath = path;
  if (currentLang !== defaultLang && path.startsWith(`/${currentLang}`)) {
    cleanPath = path.slice(`/${currentLang}`.length) || '/';
  }
  
  // Add target language prefix if needed
  const slashed = withTrailingSlash(cleanPath || '/');
  if (targetLang === defaultLang) {
    return slashed;
  }
  if (slashed === '/') return `/${targetLang}/`;
  return `/${targetLang}${slashed.startsWith('/') ? slashed : `/${slashed}`}`;
}
