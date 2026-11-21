// @ts-check
/**
 * Sample squad highlights. Players are minors, so entries carry only a
 * number, position, grade, and initials (all fictional).
 *
 * @typedef {object} Player
 * @property {string} categoryId
 * @property {number} number
 * @property {string} position
 * @property {string} grade
 * @property {string} initials
 */

/** @type {Player[]} */
export const players = [
  { categoryId: 'u12', number: 10, position: 'MF', grade: '小6', initials: 'R.H.' },
  { categoryId: 'u12', number: 9, position: 'FW', grade: '小6', initials: 'S.T.' },
  { categoryId: 'u12', number: 4, position: 'DF', grade: '小5', initials: 'K.M.' },
  { categoryId: 'u12', number: 1, position: 'GK', grade: '小6', initials: 'Y.N.' },
  { categoryId: 'u15', number: 10, position: 'MF', grade: '中3', initials: 'A.K.' },
  { categoryId: 'u15', number: 9, position: 'FW', grade: '中3', initials: 'T.S.' },
  { categoryId: 'u15', number: 5, position: 'DF', grade: '中2', initials: 'H.O.' },
  { categoryId: 'u15', number: 1, position: 'GK', grade: '中3', initials: 'M.I.' },
  { categoryId: 'u18', number: 10, position: 'MF', grade: '高3', initials: 'D.F.' },
  { categoryId: 'u18', number: 11, position: 'FW', grade: '高2', initials: 'N.M.' },
  { categoryId: 'u18', number: 3, position: 'DF', grade: '高3', initials: 'J.Y.' },
  { categoryId: 'u18', number: 1, position: 'GK', grade: '高2', initials: 'K.U.' },
];

/** @param {string} categoryId */
export const playersForCategory = (categoryId) => players.filter((p) => p.categoryId === categoryId);
