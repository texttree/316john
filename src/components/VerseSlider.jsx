import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import NextButton from './NextButton';
import PrevButton from './PrevButton';

import { languageIdState } from '../atoms';
import versesData from '../verses.json';

const VerseSlider = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useRecoilState(languageIdState);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLanguage(currentIndex);
  }, [currentIndex, setLanguage]);

  useEffect(() => {
    setCurrentIndex(language);
  }, [setCurrentIndex, language]);

  const goToNextVerse = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % versesData.length);
  };

  const goToPrevVerse = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + versesData.length) % versesData.length
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-4">
        <div className="hidden md:block">
          <PrevButton onClick={goToPrevVerse} />
        </div>
        <div className="mx-4 max-w-lg h-84 items-center justify-center rounded-lg hidden md:block">
          <p className="text-xl leading-tight text-center font-['Anek_Bangla']">
            {versesData[currentIndex].verse}
          </p>
        </div>
        <div className="hidden md:block">
          <NextButton onClick={goToNextVerse} />
        </div>
      </div>
      <div className="w-full rounded-lg md:hidden mb-4">
        <p className="text-xl leading-tight text-center font-['Anek_Bangla']">
          {versesData[currentIndex].verse}
        </p>
      </div>
      <div className="flex justify-center space-x-4 md:hidden mb-4">
        <PrevButton onClick={goToPrevVerse} />
        <NextButton onClick={goToNextVerse} />
      </div>
      <div className="mb-12">
        <div className="text-center justify-between space-x-4 mb-4">
          <div className="inline-block font-bold">
            {versesData[currentIndex].languageOriginal}{' '}
            <span className="font-normal">
              ({versesData[currentIndex].languageEnglish})
            </span>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <a
            href={versesData[currentIndex].refNameTranslate}
            target="_blank"
            rel="noopener noreferrer"
            className="underline">
            {versesData[currentIndex].nameTranslate}
          </a>{' '}
          {t('By')}{' '}
          <a
            href={versesData[currentIndex].refOwner}
            target="_blank"
            rel="noopener noreferrer"
            className="underline">
            {versesData[currentIndex].owner}
          </a>
        </div>
        <div className="text-center text-gray-400 underline">
          <a
            href={versesData[currentIndex].refOwner}
            target="_blank"
            rel="noopener noreferrer">
            {`License: ${versesData[currentIndex].license}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerseSlider;
