import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const hasResendKey = !!import.meta.env.RESEND_API_KEY;
  const hasAudienceId = !!import.meta.env.RESEND_AUDIENCE_ID;
  
  return new Response(JSON.stringify({
    environment: {
      hasResendKey,
      hasAudienceId,
      nodeEnv: process.env.NODE_ENV || 'unknown',
      // Never expose actual keys in production!
      keyPreview: hasResendKey ? import.meta.env.RESEND_API_KEY?.substring(0, 8) + '...' : 'NOT_SET'
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
