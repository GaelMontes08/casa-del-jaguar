export const SITE_ORIGIN = 'https://casadeljaguariquitos.com';
export const OG_IMAGE_URL = `${SITE_ORIGIN}/og-image.jpg`;
export const BUSINESS_PHONE_TEL = '+51917811803';
export const BUSINESS_PHONE_DISPLAY = '+51 917 811 803';

export function canonicalUrl(pathname: string): string {
  const path = pathname && pathname !== '' ? pathname : '/';
  return new URL(path, SITE_ORIGIN).href;
}

/** Spanish is the default locale and x-default. English lives under /en. */
export function languageAlternates(pathname: string): { href: string; hrefLang: string }[] {
  let path = pathname || '/';
  if (!path.endsWith('/')) path = `${path}/`;
  if (path === '/es/' || path.startsWith('/es/')) {
    path = path.replace(/^\/es\//, '/') || '/';
    if (!path.endsWith('/')) path = `${path}/`;
  }
  const isEnglish = path === '/en/' || path.startsWith('/en/');
  const bare = isEnglish ? path.slice(3) || '/' : path;
  const esPath = bare.startsWith('/') ? bare : `/${bare}`;
  const enPath = esPath === '/' ? '/en/' : `/en${esPath}`;
  const es = canonicalUrl(esPath);
  const en = canonicalUrl(enPath);
  return [
    { href: es, hrefLang: 'es' },
    { href: en, hrefLang: 'en' },
    { href: es, hrefLang: 'x-default' },
  ];
}
