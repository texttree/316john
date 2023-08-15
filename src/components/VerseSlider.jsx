import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { createBrowserHistory } from 'history';

import NextButton from './NextButton';
import PrevButton from './PrevButton';

import { languageIndexState } from '../atoms';
import versesData from '../verses.json';

const VerseSlider = () => {
  let history = createBrowserHistory();
  const { t } = useTranslation();
  const [languageIndex, setLanguageIndex] = useRecoilState(languageIndexState);

  const goToNextVerse = () => {
    setLanguageIndex((prev) => {
      const newVal = (prev + 1) % versesData.length;
      history.push('/' + versesData[newVal].languageEnglish);
      return newVal;
    });
  };

  const goToPrevVerse = () => {
    setLanguageIndex((prev) => {
      const newVal = (prev - 1 + versesData.length) % versesData.length;
      history.push('/' + versesData[newVal].languageEnglish);
      return newVal;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-4 mb-16">
        <div className="hidden md:block">
          <PrevButton onClick={goToPrevVerse} />
        </div>
        <div className="mx-4 max-w-lg h-84 items-center justify-center rounded-lg hidden md:block">
          <p className="text-xl leading-tight text-center verse">
            {versesData[languageIndex].verse}
          </p>
        </div>
        <div className="hidden md:block">
          <NextButton onClick={goToNextVerse} />
        </div>
      </div>
      <div className="w-full rounded-lg md:hidden mb-4">
        <p className="text-xl leading-tight text-center verse">
          {versesData[languageIndex].verse}
        </p>
      </div>
      <div className="flex justify-between space-x-4 md:hidden my-16">
        <PrevButton onClick={goToPrevVerse} />
        <NextButton onClick={goToNextVerse} />
      </div>
      <div className="mb-12">
        <div className="text-center justify-between space-x-4 mb-4">
          <div className="inline-block font-bold">
            {versesData[languageIndex].languageOriginal}{' '}
            <span className="font-normal capitalize">
              {versesData[
                languageIndex
              ].languageOriginal.toLocaleLowerCase() !==
              versesData[languageIndex].languageEnglish.toLocaleLowerCase()
                ? '(' + versesData[languageIndex].languageEnglish + ')'
                : ''}
            </span>
          </div>
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
