import { defineMiddleware } from 'astro:middleware';

function withSlash(path: string): string {
  if (!path || path === '/') return '/';
  const last = path.split('/').pop() ?? '';
  if (path.startsWith('/api') || last.includes('.')) return path;
  return path.endsWith('/') ? path : `${path}/`;
}

/** One Spanish URL set, trailing slashes, and the old misspelled blog slug. */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;
  let target = pathname;

  if (target === '/es' || target === '/es/' || target.startsWith('/es/')) {
    target = target.replace(/^\/es(?=\/|$)/, '') || '/';
  }
  if (target === '/sobre-nosotros' || target === '/sobre-nosotros/') {
    target = '/about/';
  }
  if (target.includes('aweking-to-the-divine')) {
    target = target.replace('aweking-to-the-divine', 'awakening-to-the-divine');
  }
  target = withSlash(target);

  if (target !== pathname) {
    return context.redirect(`${target}${search}`, 301);
  }
  return next();
});
