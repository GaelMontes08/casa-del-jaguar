import assert from 'node:assert/strict';
import test from 'node:test';
import {
  formatRetreatDate,
  getDepartureDate,
  getIquitosToday,
  isValidArrival,
  parseRetreatDate,
} from '../src/utils/retreat-dates.ts';

test('today is determined in Iquitos, not UTC or the visitor timezone', () => {
  assert.equal(getIquitosToday(new Date('2026-11-06T04:59:59Z')), '2026-11-05');
  assert.equal(getIquitosToday(new Date('2026-11-06T05:00:00Z')), '2026-11-06');
});

test('arrival dates must be canonical, real, and not in the past', () => {
  for (const value of [
    '2026-02-29',
    '2026-04-31',
    '2026-13-01',
    '2026-1-01',
    'invalid',
    '',
    '<script>',
    '0000-01-01',
  ]) {
    assert.equal(parseRetreatDate(value), null, value);
    assert.equal(isValidArrival(value, '2026-01-01'), false, value);
  }
  assert.equal(isValidArrival('2026-11-04', '2026-11-05'), false);
  assert.equal(isValidArrival('2026-11-05', '2026-11-05'), true);
  assert.equal(isValidArrival('2026-11-06', '2026-11-05'), true);
  assert.equal(isValidArrival('2028-02-29', '2026-11-05'), true);
  assert.equal(isValidArrival('9999-12-26', '2026-11-05'), false);
});

test('six nights span month, year, and leap-day boundaries without timezone shifts', () => {
  assert.equal(getDepartureDate('2026-11-28'), '2026-12-04');
  assert.equal(getDepartureDate('2026-12-29'), '2027-01-04');
  assert.equal(getDepartureDate('2028-02-25'), '2028-03-02');
  assert.equal(getDepartureDate('2027-02-25'), '2027-03-03');
  assert.equal(getDepartureDate('9999-12-25'), '9999-12-31');
  assert.throws(() => getDepartureDate('2026-02-30'), RangeError);
});

test('date formatting is localized without changing the selected day', () => {
  assert.equal(formatRetreatDate('2026-11-05', 'en'), 'November 5, 2026');
  assert.match(formatRetreatDate('2026-11-05', 'es'), /5.*noviembre.*2026/);
  assert.throws(() => formatRetreatDate('not-a-date', 'en'), RangeError);
});
