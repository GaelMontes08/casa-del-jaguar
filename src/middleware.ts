import { defineMiddleware } from 'astro:middleware';

/** One Spanish URL set: /es and /es/* duplicate the unprefixed Spanish pages. */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;
  if (pathname === '/es' || pathname === '/es/' || pathname.startsWith('/es/')) {
    const stripped = pathname.replace(/^\/es(?=\/|$)/, '') || '/';
    const target = stripped.startsWith('/') ? stripped : `/${stripped}`;
    return context.redirect(`${target}${search}`, 301);
  }
  return next();
});
