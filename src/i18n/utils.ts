import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getStaticPaths() {
  return [
    { params: { lang: 'es' } },
    { params: { lang: 'en' } },
  ];
}

export function translatePath(path: string, lang: string): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

export function getLocalizedPath(path: string, currentLang: string, targetLang: string): string {
  // Remove current language prefix if it exists
  let cleanPath = path;
  if (currentLang !== defaultLang && path.startsWith(`/${currentLang}`)) {
    cleanPath = path.slice(`/${currentLang}`.length) || '/';
  }
  
  // Add target language prefix if needed
  if (targetLang === defaultLang) {
    return cleanPath;
  }
  return `/${targetLang}${cleanPath}`;
}
