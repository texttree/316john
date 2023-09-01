import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { createBrowserHistory } from 'history';

import NextButton from './NextButton';
import PrevButton from './PrevButton';
import NextVerseButton from './NextVerseButton';
import PrevVerseButton from './PrevVerseButton';
import { languageGroups } from './VerseUtils';
import { languageIndexState } from '../atoms';
import versesData from '../verses.json';

const VerseSlider = () => {
  let history = createBrowserHistory();
  const { t } = useTranslation();
  const [languageIndex, setLanguageIndex] = useRecoilState(languageIndexState);
  const [translateIndex, setTranslateIndex] = useState(0);

  const currentLanguage = versesData[languageIndex].languageEnglish;
  const currentGroup = languageGroups[currentLanguage];

  const goToNextVerse = () => {
    const languages = Object.keys(languageGroups);
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    setTranslateIndex(0); 
    setLanguageIndex(versesData.findIndex((verse) => verse.languageEnglish === nextLanguage));

    history.push('/' + nextLanguage + '/' + languageGroups[nextLanguage][0].shortNameTranslate);
  };

  const goToPrevVerse = () => {
    const languages = Object.keys(languageGroups);
    const currentIndex = languages.indexOf(currentLanguage);
    const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
    const prevLanguage = languages[prevIndex];

    setTranslateIndex(0); 
    setLanguageIndex(versesData.findIndex((verse) => verse.languageEnglish === prevLanguage));

    history.push('/' + prevLanguage + '/' + languageGroups[prevLanguage][0].shortNameTranslate);
  };

  const goToNextVerseLang = () => {
    const nextIndex = (translateIndex + 1) % currentGroup.length;
    setTranslateIndex(nextIndex);

    const nextLanguageEnglish = currentGroup[nextIndex].languageEnglish;
    const nextNameTranslate = currentGroup[nextIndex].nameTranslate;
    const nextShortNameTranslate = currentGroup[nextIndex].shortNameTranslate;

    setLanguageIndex(versesData.findIndex((verse) => verse.nameTranslate === nextNameTranslate));

    history.push('/' + nextLanguageEnglish + '/' + nextShortNameTranslate);
  };

  const goToPrevVerseLang = () => {
    const prevIndex = (translateIndex - 1 + currentGroup.length) % currentGroup.length;
    setTranslateIndex(prevIndex);

    const prevLanguageEnglish = currentGroup[prevIndex].languageEnglish;
    const prevNameTranslate = currentGroup[prevIndex].nameTranslate;
    const prevShortNameTranslate = currentGroup[prevIndex].shortNameTranslate;

    setLanguageIndex(versesData.findIndex((verse) => verse.nameTranslate === prevNameTranslate));

    history.push('/' + prevLanguageEnglish + '/' + prevShortNameTranslate);
  };




  return (
    <div>
      <div className="flex items-center justify-between space-x-4 mb-16">
        <div className="hidden md:block">
          <PrevButton onClick={goToPrevVerse} />
        </div>
        <div className="mx-4 max-w-lg h-84 items-center justify-center rounded-lg hidden md:block">
          <p className="text-3xl leading-tight text-center verse">
            {versesData[languageIndex].verse}
          </p>
        </div>
        <div className="hidden md:block">
          <NextButton onClick={goToNextVerse} />
        </div>
      </div>
      <div className="w-full rounded-lg md:hidden mb-4">
        <p className="text-3xl leading-tight text-center verse">
          {versesData[languageIndex].verse}
        </p>
      </div>
      <div className="flex justify-center items-center space-x-2 mt-2">
        {currentGroup.map((verse, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${translateIndex === index ? 'bg-gray-700' : 'bg-gray-300'}`}
          ></span>
        ))}
      </div>
      <br />
      <div className="flex justify-between space-x-4 md:hidden my-16">
        <PrevButton onClick={goToPrevVerse} />
        <NextButton onClick={goToNextVerse} />
      </div>

      <div className="mb-12">
        <div className="text-center justify-between space-x-4 mb-4">
          <PrevVerseButton onClick={goToPrevVerseLang} />

          <div className="inline-block font-bold">
            {versesData[languageIndex].languageOriginal}{' '}
            <span className="font-normal capitalize">
              {versesData[languageIndex].languageOriginal.toLowerCase() !==
              versesData[languageIndex].languageEnglish.toLowerCase()
                ? '(' + versesData[languageIndex].languageEnglish + ')'
                : ''}
            </span>
          </div>

          <NextVerseButton onClick={goToNextVerseLang} />
        </div>
        <div className="text-center text-gray-400">
          <a
            href={versesData[languageIndex].refNameTranslate}
            target="_blank"
            rel="noopener noreferrer"
            className="underline">
            {versesData[languageIndex].nameTranslate}
          </a>{' '}
          {t('By')}{' '}
          <a
            href={versesData[languageIndex].refOwner}
            target="_blank"
            rel="noopener noreferrer"
            className="underline">
            {versesData[languageIndex].owner}
          </a>
        </div>
        <div className="text-center text-gray-400 underline">
          <a
            href={versesData[languageIndex].refOwner}
            target="_blank"
            rel="noopener noreferrer">
            {t('License')}
            {`: ${versesData[languageIndex].license}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerseSlider;
