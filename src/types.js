// @ts-check
/**
 * Shared data shapes (JSDoc). Data modules in src/data/ and components both
 * reference these via `import('../types.js').TypeName`.
 * All sample content is fictional; see PRODUCT.md › Evidence on Hand.
 */

/**
 * @typedef {object} ImageAsset
 * @property {string} [src]       Omit to render the designed photo placeholder.
 * @property {string} alt         Meaningful description; '' only for purely decorative images.
 * @property {number} [width]     Intrinsic size; required with src to prevent layout shift.
 * @property {number} [height]
 * @property {string} [srcset]
 * @property {string} [position]  CSS object-position, e.g. '50% 30%'.
 */

/**
 * @typedef {object} NewsItem
 * @property {string} slug
 * @property {string} title
 * @property {string} date        ISO 8601 date, e.g. '2026-11-21'.
 * @property {string} category    Display label, e.g. 'お知らせ' / '試合結果'.
 * @property {string} [excerpt]
 * @property {ImageAsset} [image]
 * @property {string[]} [body]    Paragraphs of the article page.
 */

/**
 * @typedef {object} Category
 * @property {string} id          URL-safe id, e.g. 'u12'.
 * @property {string} label       Display label, e.g. 'U-12'.
 * @property {string} name        Japanese team name, e.g. 'ジュニア'.
 * @property {string} grade       Eligible grades, e.g. '小学5・6年生'.
 * @property {string} [summary]
 * @property {ImageAsset} [image]
 * @property {number} order
 * @property {string} [format]        Match format, e.g. '8人制'.
 * @property {string} [practice]      Weekly practice schedule.
 * @property {string} [locationId]    Facility id (src/data/facilities.js).
 * @property {number} [members]       Fictional roster size.
 * @property {number} [monthlyFee]    Yen per month (fictional).
 * @property {string} [goal]          One-sentence season goal.
 * @property {string[]} [focus]       Short training-focus bullets.
 * @property {{ title: string, text: string }[]} [curriculum]
 * @property {string[]} [leagues]
 * @property {{ status: RecruitStatus, note: string }} [recruiting]
 */

/** @typedef {'open' | 'limited' | 'selection' | 'closed'} RecruitStatus */

/**
 * @typedef {object} MatchTeam
 * @property {string} name        Full name.
 * @property {string} short       2–4 characters for the monogram crest.
 * @property {boolean} [isClub]   True for our own team.
 */

/**
 * @typedef {'scheduled' | 'finished' | 'postponed' | 'cancelled'} MatchStatus
 */

/**
 * @typedef {object} Match
 * @property {string} id
 * @property {string} categoryId
 * @property {string} competition
 * @property {string} [round]
 * @property {string} kickoff     ISO 8601 local datetime, e.g. '2026-11-29T10:00'.
 * @property {string} venue
 * @property {MatchTeam} home
 * @property {MatchTeam} away
 * @property {MatchStatus} status
 * @property {{ home: number, away: number }} [score]
 */

export {};
