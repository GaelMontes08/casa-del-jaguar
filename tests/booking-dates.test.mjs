import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { createServer } from 'vite';

test('booking validates preferred dates and includes them in both emails', async () => {
  const originalFetch = globalThis.fetch;
  const originalInterval = globalThis.setInterval;
  const intervals = [];
  const emails = [];
  let server;

  try {
    globalThis.fetch = async (url, options) => {
      assert.match(String(url), /^https:\/\/api\.resend\.com\/emails$/);
      emails.push(JSON.parse(options.body));
      return new Response(JSON.stringify({ id: `mock-${emails.length}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };
    globalThis.setInterval = (...args) => {
      const id = originalInterval(...args);
      intervals.push(id);
      return id;
    };
    server = await createServer({
      configFile: false,
      envFile: false,
      server: { middlewareMode: true },
      optimizeDeps: { noDiscovery: true, include: [] },
      resolve: { alias: { '@': path.resolve('src') } },
      define: {
        'import.meta.env.RESEND_API_KEY': JSON.stringify(
          're_calendar_test_only'
        ),
      },
    });
    const { POST } = await server.ssrLoadModule('/src/pages/api/booking.ts');
    let requestId = 0;
    const submit = async (arrival) => {
      const data = new FormData();
      for (const [key, value] of Object.entries({
        firstName: 'Calendar',
        lastName: 'Test',
        email: 'calendar-test@example.com',
        phone: '999123456',
        countryCode: '+51',
        honeypot: '',
      }))
        data.set(key, value);
      if (arrival !== undefined) data.set('arrivalDate', arrival);
      return POST({
        request: new Request('http://localhost/api/booking', {
          method: 'POST',
          headers: { 'x-real-ip': `calendar-test-${requestId++}` },
          body: data,
        }),
      });
    };

    for (const invalid of [
      '2026-02-30',
      '2000-01-01',
      '<script>',
      '9999-12-26',
    ]) {
      const response = await submit(invalid);
      assert.equal(response.status, 400);
      assert.equal((await response.json()).success, false);
    }
    assert.equal(emails.length, 0);

    const year = new Date().getUTCFullYear() + 2;
    const response = await submit(`${year}-12-29`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).success, true);
    assert.equal(emails.length, 2);
    for (const email of emails) {
      assert.ok(email.html.includes(`29 de diciembre de ${year}`));
      assert.ok(email.html.includes(`4 de enero de ${year + 1}`));
      assert.ok(email.html.includes('Fechas preferidas'));
      assert.ok(email.html.includes('sujetas a confirma'));
    }

    const noDates = await submit(undefined);
    assert.equal(noDates.status, 200);
    assert.equal(emails.length, 4);
    assert.ok(!emails[2].html.includes('Fechas preferidas'));
    assert.ok(!emails[3].html.includes('Fechas preferidas'));
  } finally {
    if (server) await server.close();
    for (const id of intervals) clearInterval(id);
    globalThis.fetch = originalFetch;
    globalThis.setInterval = originalInterval;
  }
});
