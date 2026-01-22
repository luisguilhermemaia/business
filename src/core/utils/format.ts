export const formatDate = (iso: string, locale = 'pt-BR') =>
  new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
