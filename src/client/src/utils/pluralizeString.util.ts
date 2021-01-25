export const pluralizeString = (count: number, noun: string, suffix: string = 's'): string => {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`;
};
