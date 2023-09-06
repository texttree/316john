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

export const languageGroups = getLanguageGroups();
