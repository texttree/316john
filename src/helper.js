import versesData from './verses.json';

export const langList = versesData.map((lang, index) => ({
  orig: lang.languageOriginal,
  index,
  eng: lang.languageEnglish,
  variants: lang.languageVariants
    .split(',')
    .map((el) => el.trim().toLowerCase()),
}));

export const filterLangList = (filter) => {
  return langList.filter(
    ({ variants }) =>
      variants.filter((el) => el.startsWith(filter.trim().toLowerCase()))
        .length > 0
  );
};

export const searchLanguage = (search) => {
  return langList.filter(
    (lang) => lang.eng.toLocaleLowerCase() === search.toLocaleLowerCase()
  )?.[0];
};
