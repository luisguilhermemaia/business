const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;
const NON_WORD_REGEX = /[^a-z0-9]+/g;
const TRIM_DASHES_REGEX = /^-+|-+$/g;
const MULTI_DASHES_REGEX = /-{2,}/g;

export const toSeoSlug = (value: string): string =>
  value
    .normalize('NFD')
    .replace(COMBINING_MARKS_REGEX, '')
    .toLowerCase()
    .replace(NON_WORD_REGEX, '-')
    .replace(MULTI_DASHES_REGEX, '-')
    .replace(TRIM_DASHES_REGEX, '');
