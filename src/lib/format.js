// @ts-check

const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

/**
 * Parses 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:mm' without timezone drift.
 * @param {string} iso
 */
function parts(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso);
  if (!match) throw new Error(`Invalid ISO date: ${iso}`);
  const [, y, m, d, hh, mm] = match;
  const weekday = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d))).getUTCDay();
  return { y, m, d, hh, mm, weekday: WEEKDAYS_JA[weekday] };
}

/** Local calendar date at build time, 'YYYY-MM-DD'. */
export function todayIso() {
  const d = new Date();
  const pad = (/** @type {number} */ n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** '2026年11月21日（土）' @param {string} iso */
export function formatLongDate(iso) {
  const { y, m, d, weekday } = parts(iso);
  return `${y}年${Number(m)}月${Number(d)}日（${weekday}）`;
}

/** '2026年11月' @param {string} iso */
export function formatMonth(iso) {
  const { y, m } = parts(iso);
  return `${y}年${Number(m)}月`;
}

/** '11' and '21' pieces for date blocks. @param {string} iso */
export function dateBlock(iso) {
  const { m, d, weekday } = parts(iso);
  return { month: String(Number(m)), day: d, weekday };
}

/** '7,700円' @param {number} yen */
export function formatYen(yen) {
  return `${yen.toLocaleString('ja-JP')}円`;
}

/** '2026.11.21' @param {string} iso */
export function formatDotDate(iso) {
  const { y, m, d } = parts(iso);
  return `${y}.${m}.${d}`;
}

/** '11.29' and '日' for match cards. @param {string} iso */
export function formatMatchDay(iso) {
  const { m, d, weekday } = parts(iso);
  return { day: `${m}.${d}`, weekday };
}

/** '10:00' or '' when no time. @param {string} iso */
export function formatTime(iso) {
  const { hh, mm } = parts(iso);
  return hh ? `${hh}:${mm}` : '';
}
