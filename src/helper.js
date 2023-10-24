import versesData from './verses.json';

export const languageGroups = versesData.reduce((groups, verse) => {
  if (!groups[verse.languageEnglish]) {
    groups[verse.languageEnglish] = [];
  }
  groups[verse.languageEnglish].push(verse);
  return groups;
}, {})

export const countVerse = versesData.length;

export const langList = Object.keys(languageGroups).map((langEnglish, index) => ({
  orig: languageGroups[langEnglish][0].languageOriginal,
  index,
  eng: langEnglish,
  variants: languageGroups[langEnglish][0].languageVariants
    .split(',')
    .map((el) => el.trim().toLowerCase()),
}))

export const filterLangList = (filter) => {
  return langList.filter(
    ({ variants }) =>
      variants.filter((el) => el.startsWith(filter.trim().toLowerCase())).length > 0
  )
}

export const searchLanguage = (search) => {
  return langList.filter(
    (lang) => lang.eng.toLocaleLowerCase() === search.toLocaleLowerCase()
  )?.[0]
}
