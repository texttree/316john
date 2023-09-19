import versesData from "../verses.json";

const getLanguageGroups = () => {
  const groups = {};
  versesData.forEach((verse) => {
    if (!groups[verse.languageEnglish]) {
      groups[verse.languageEnglish] = [];
    }
    groups[verse.languageEnglish].push(verse);
  });
  return groups;
};


const getTotalVerseCount = (groups) => {
  let totalCount = 0;
  for (const key in groups) {
    totalCount += groups[key].length;
  }
  return totalCount;
};
export const languageGroups = getLanguageGroups();
export const countVerse = getTotalVerseCount(getLanguageGroups());

