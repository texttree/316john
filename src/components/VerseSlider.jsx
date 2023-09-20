import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { createBrowserHistory } from "history";

import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { languageGroups } from "./verseUtils";
import { languageIndexState, translateIndexState } from "../atoms";
import versesData from "../verses.json";

const VerseSlider = () => {
  let history = createBrowserHistory();
  const { t } = useTranslation();
  const [languageIndex, setLanguageIndex] = useRecoilState(languageIndexState);
  const [translateIndex, setTranslateIndex] =
    useRecoilState(translateIndexState);
  const [timer, setTimer] = useState(null);
  const currentLanguage = versesData[languageIndex].languageEnglish;
  const currentGroup = languageGroups[currentLanguage];

  const loadVerseFromUrl = () => {
    const currentUrl = window.location.pathname;

    const urlParts = currentUrl.split("/");
    if (urlParts.length >= 3) {
      const language = urlParts[1];
      const verseId = urlParts[2];

      const foundVerseIndex = versesData.findIndex((verse) => {
        return (
          verse.languageEnglish.toLowerCase() === language.toLowerCase() &&
          verse.shortNameTranslate.toLowerCase() === verseId.toLowerCase()
        );
      });

      if (foundVerseIndex !== -1) {
        setLanguageIndex(foundVerseIndex);
      }
    }
  };

  useEffect(() => {
    loadVerseFromUrl();
  }, []);

  const handleNextButtonClick = () => {
    const dots = document.querySelector("#dots");
    if (dots) {
      if (timer) {
        clearTimeout(timer);
      }
      dots.classList.add("rw");
      const newTimer = setTimeout(() => {
        dots.classList.remove("rw");
      }, 200);
      setTimer(newTimer);
    }
  };

  const handlePrevButtonClick = () => {
    const dots = document.querySelector("#dots");
    if (dots) {
      if (timer) {
        clearTimeout(timer);
      }
      dots.classList.add("rw");
      const newTimer = setTimeout(() => {
        dots.classList.remove("rw");
      }, 200);
      setTimer(newTimer);
    }
  };

  const goToNextVerseLang = () => {
    const nextIndex = (translateIndex + 1) % currentGroup.length;
    setTranslateIndex(nextIndex);

    const nextLanguageEnglish = currentGroup[nextIndex].languageEnglish;
    const nextNameTranslate = currentGroup[nextIndex].nameTranslate;
    const nextShortNameTranslate = currentGroup[nextIndex].shortNameTranslate;

    setLanguageIndex(
      versesData.findIndex((verse) => verse.nameTranslate === nextNameTranslate)
    );

    history.push("/" + nextLanguageEnglish + "/" + nextShortNameTranslate);
  };

  const handleNextButtonClickCombined = () => {
    handleNextButtonClick();
    goToNextVerseLang();
  };

  const handlePrevButtonClickCombined = () => {
    handlePrevButtonClick();
    goToPrevVerseLang();
  };

  const goToPrevVerseLang = () => {
    const prevIndex =
      (translateIndex - 1 + currentGroup.length) % currentGroup.length;
    setTranslateIndex(prevIndex);

    const prevLanguageEnglish = currentGroup[prevIndex].languageEnglish;
    const prevNameTranslate = currentGroup[prevIndex].nameTranslate;
    const prevShortNameTranslate = currentGroup[prevIndex].shortNameTranslate;

    setLanguageIndex(
      versesData.findIndex((verse) => verse.nameTranslate === prevNameTranslate)
    );

    history.push("/" + prevLanguageEnglish + "/" + prevShortNameTranslate);
  };

  const renderCircles = () => {
    const circles = [];
    if (currentGroup.length < 4) {
      for (let i = 0; i < currentGroup.length; i++) {
        const isActive = i === translateIndex;
        circles.push(
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              isActive ? "bg-[#333]" : "bg-[#aaa]"
            }`}
          ></div>
        );
      }
    } else {
      circles.push(
        <div id="dots" className="mt-[-40px]">
          <span id="dot1"></span>
          <span id="dot2"></span>
          <span id="dot3"></span>
          <span id="dot4"></span>
          <span id="dot5"></span>
          <span id="dot6"></span>
          <span id="dot7"></span>
        </div>
      );
    }

    return circles;
  };

  return (
    <div>
      <div className="flex items-start justify-between space-x-4 mb-16">
        <div className="hidden md:block">
          <PrevButton onClick={handlePrevButtonClickCombined} />
        </div>
        <div className="mx-4 max-w-lg items-center justify-center rounded-lg hidden md:block">
          <p className="text-3xl leading-tight text-center verse">
            {versesData[languageIndex].verse}
          </p>
        </div>
        <div className="hidden md:block">
          <NextButton onClick={handleNextButtonClickCombined} />
        </div>
      </div>

      <div className="relative">
        <div className="w-full rounded-lg md:hidden mb-4">
          <p className="text-3xl leading-tight text-center verse">
            {versesData[languageIndex].verse}
          </p>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-2 mt-[-40px]">
          {renderCircles()}
        </div>

        <div className="text-center text-gray-500 text-sm mt-2">
          {`${translateIndex + 1}/${currentGroup.length}`}
        </div>
        <br />
        <div className="flex justify-between space-x-4 md:hidden my-16">
          <PrevButton onClick={handlePrevButtonClickCombined} />
          <NextButton onClick={handlePrevButtonClickCombined} />
        </div>
      </div>

      <div className="mb-12">
        <div className="text-center justify-between space-x-4 mb-4"></div>
        <div className="text-center text-gray-400">
          <a
            href={versesData[languageIndex].refNameTranslate}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {versesData[languageIndex].nameTranslate}
          </a>{" "}
          {t("By")}{" "}
          <a
            href={versesData[languageIndex].refOwner}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {versesData[languageIndex].owner}
          </a>
        </div>
        <div className="text-center text-gray-400 underline">
          <a
            href={versesData[languageIndex].refOwner}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("License")}
            {`: ${versesData[languageIndex].license}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerseSlider;
