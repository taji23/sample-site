// @ts-check
/**
 * Photo registry. Every photo here is AI-generated (see public/images/photos/provenance.json)
 * and is a stand-in until real club photography exists.
 */

/**
 * @typedef {object} PhotoSource
 * @property {number[]} widths   Available rendition widths (ascending).
 * @property {number} width      Intrinsic width of the largest rendition.
 * @property {number} height
 * @property {string} alt
 */

/** @type {Record<string, PhotoSource>} */
const PHOTOS = {
  hero: { widths: [768, 1280, 1536], width: 1536, height: 1024, alt: '夜のスタジアムで、ボールに足を乗せて立つ選手の後ろ姿' },
  philosophy: { widths: [640, 1024], width: 1024, height: 1536, alt: '朝露の芝の上に置かれたスパイクとボール' },
  academy: { widths: [768, 1280], width: 1280, height: 853, alt: '夕方のグラウンドで、作戦ボードを使って選手に説明するコーチ' },
  school: { widths: [768, 1280], width: 1280, height: 853, alt: 'コーンの間をドリブルする子どもたちの足元' },
  join: { widths: [768, 1280, 1536], width: 1536, height: 1024, alt: 'ナイター照明の下で肩を組み、円陣を組む選手たち' },
  match: { widths: [768, 1280], width: 1280, height: 853, alt: '試合中にボールを奪い合う紺と白のユニフォームの選手' },
  u8: { widths: [480, 800], width: 800, height: 1200, alt: 'ボールを追いかけて走る小さな選手の後ろ姿' },
  u12: { widths: [480, 800], width: 800, height: 1200, alt: 'ゴール前でボールを足元に置く小学生選手の後ろ姿' },
  u15: { widths: [480, 800], width: 800, height: 1200, alt: 'トンネルからナイター照明のピッチへ歩き出す選手' },
  u18: { widths: [480, 800], width: 800, height: 1200, alt: '雨のナイターでボールを蹴り込む選手' },
};

/** @typedef {keyof typeof PHOTOS} PhotoKey */

/**
 * @param {PhotoKey} key
 * @param {{ alt?: string, position?: string }} [options]
 * @returns {import('../types.js').ImageAsset}
 */
export function photo(key, { alt, position } = {}) {
  const source = PHOTOS[key];
  if (!source) throw new Error(`Unknown photo: ${key}`);
  const url = (/** @type {number} */ w) => `/images/photos/${key}-${w}.jpg`;
  const middle = source.widths[Math.min(1, source.widths.length - 1)];
  return {
    src: url(middle),
    srcset: source.widths.map((w) => `${url(w)} ${w}w`).join(', '),
    width: source.width,
    height: source.height,
    alt: alt ?? source.alt,
    position,
  };
}
