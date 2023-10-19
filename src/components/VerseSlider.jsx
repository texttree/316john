import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { createBrowserHistory } from "history";
import { useSwipeable } from "react-swipeable";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import { getLanguageGroups } from "../helper";
import { languageIndexState, translateIndexState } from "../atoms";

const VerseSlider = () => {
  let history = createBrowserHistory();
  const { t } = useTranslation();
  const languageGroups = getLanguageGroups();

  const [translateIndex, setTranslateIndex] =
    useRecoilState(translateIndexState);
  const [languageIndex, setLanguageIndex] = useRecoilState(languageIndexState);

  const [timer, setTimer] = useState(null);

  const currentLanguage = Object.keys(languageGroups)[languageIndex];
  const currentGroup = languageGroups[currentLanguage];

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const urlParts = currentUrl.split("/");
    if (urlParts.length >= 3) {
      const language = urlParts[1];
      const verseId = urlParts[2];
      const foundVerseIndex = languageGroups[language]?.findIndex(
        (verse) =>
          verse.shortNameTranslate.toLowerCase() === verseId.toLowerCase()
      );
      if (foundVerseIndex) {
        setTranslateIndex(foundVerseIndex);
      }
    }
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
      }, 400);
      setTimer(newTimer);
    }
  };

  const handlePrevButtonClick = () => {
    const dots = document.querySelector("#dots");
    if (dots) {
      if (timer) {
        clearTimeout(timer);
      }
      dots.classList.add("lw");
      const newTimer = setTimeout(() => {
        dots.classList.remove("lw");
      }, 400);
      setTimer(newTimer);
    }
  };

  const handleNextButtonClickCombined = () => {
    handleNextButtonClick();
    goToNextVerseInGroup();
  };

  const handlePrevButtonClickCombined = () => {
    handlePrevButtonClick();
    goToPrevVerseInGroup();
  };

  const goToNextVerseInGroup = () => {
    const nextIndex = (translateIndex + 1) % currentGroup.length;
    setTranslateIndex(nextIndex);
    const nextShortNameTranslate = currentGroup[nextIndex].shortNameTranslate;
    history.push("/" + currentLanguage + "/" + nextShortNameTranslate);
  };

  const goToPrevVerseInGroup = () => {
    const prevIndex =
      (translateIndex - 1 + currentGroup.length) % currentGroup.length;
    setTranslateIndex(prevIndex);
    const prevShortNameTranslate = currentGroup[prevIndex].shortNameTranslate;
    history.push("/" + currentLanguage + "/" + prevShortNameTranslate);
  };

  const changeLanguageGroup = (newLanguageIndex) => {
    setTranslateIndex(0);
    setLanguageIndex(newLanguageIndex);

    const languages = Object.keys(languageGroups);
    const newLanguage = languages[newLanguageIndex];
    history.push(
      "/" +
        newLanguage +
        "/" +
        languageGroups[newLanguage][0].shortNameTranslate
    );
  };

  const goToNextVerse = () => {
    const languages = Object.keys(languageGroups);
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    changeLanguageGroup(nextIndex);
  };

  const goToPrevVerse = () => {
    const languages = Object.keys(languageGroups);
    const currentIndex = languages.indexOf(currentLanguage);
    const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
    changeLanguageGroup(prevIndex);
  };

  const renderCircles = useMemo(() => {
    const circles = [];
    if (currentGroup.length < 4) {
      for (let i = 0; i < currentGroup.length; i++) {
        const isActive = i === translateIndex;
        circles.push(
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              isActive ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        );
      }
    } else {
      circles.push(
        <div id="dots" key="dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
    }
    return circles;
  }, [currentGroup, translateIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: handlePrevButtonClickCombined,
    onSwipedRight: handleNextButtonClickCombined,
  });
  return (
    <div>
      <div {...handlers}>
        <div className="md:flex items-start justify-between space-x-4 mb-4 hidden">
          <PrevButton onClick={handlePrevButtonClickCombined} />
          <div className="mx-4 max-w-lg items-center justify-center rounded-lg">
            <p className="text-3xl leading-tight text-center">
              {currentGroup[translateIndex].verse}
            </p>
          </div>
          <NextButton onClick={handleNextButtonClickCombined} />
        </div>
        <div className="flex justify-between space-x-4 md:hidden my-4">
          <PrevButton onClick={handlePrevButtonClickCombined} />
          <NextButton onClick={handleNextButtonClickCombined} />
        </div>
        <div className="relative">
          <div className="w-full rounded-lg md:hidden mb-4">
            <p className="text-3xl leading-tight text-center">
              {currentGroup[translateIndex].verse}
            </p>
          </div>

          <div className="flex justify-center items-center">
            {renderCircles}
          </div>

          <div className="text-center text-gray-500 text-sm mt-2">
            {`${translateIndex + 1}/${currentGroup.length}`}
          </div>
          <br />
        </div>

        <div className="mb-12">
          <div className="text-center items-center flex justify-center space-x-4 mb-4">
            {" "}
            <PrevButton onClick={goToPrevVerse} classes={"w-3 h-3"} />
            <div className="inline-block font-bold">
              {currentGroup[translateIndex].languageOriginal}{" "}
              <span className="font-normal capitalize">
                {currentGroup[translateIndex].languageOriginal.toLowerCase() !==
                currentGroup[translateIndex].languageEnglish.toLowerCase()
                  ? "(" + currentGroup[translateIndex].languageEnglish + ")"
                  : ""}
              </span>
            </div>
            <NextButton onClick={goToNextVerse} classes={"w-3 h-3"} />
          </div>
          <div className="text-center text-gray-400">
            <a
              href={currentGroup[translateIndex].refNameTranslate}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {currentGroup[translateIndex].nameTranslate}
            </a>{" "}
            {t("By")}{" "}
            <a
              href={currentGroup[translateIndex].refOwner}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {currentGroup[translateIndex].owner}
            </a>
          </div>
          <div className="text-center text-gray-400 underline">
            <a
              href={currentGroup[translateIndex].refLicense}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("License")}
              {`: ${currentGroup[translateIndex].license}`}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseSlider;
