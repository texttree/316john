import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { createBrowserHistory } from "history";
import { useRecoilState } from "recoil";

import { languageIndexState, translateIndexState } from "../atoms";
import { filterLangList, langList, searchLanguage } from "../helper";
import { languageGroups } from "./verseUtils";

import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

function LanguageSelect() {
  let history = createBrowserHistory();
  const [languageIndex, setLanguageIndex] = useRecoilState(languageIndexState);
  const [translateIndex, setTranslateIndex] =
    useRecoilState(translateIndexState);

  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [query, setQuery] = useState("");
  const currentLanguage = Object.keys(languageGroups)[languageIndex];
  const [labelVisible, setLabelVisible] = useState(true);

  useEffect(() => {
    setSelectedLanguage(
      langList.filter((el) => el.index === languageIndex)?.[0]
    );
  }, [languageIndex]);

  useEffect(() => {
    const currentLang = searchLanguage(history.location.pathname.slice(1));
    if (currentLang?.eng) {
      setLanguageIndex(currentLang.index);
    }
  }, [history.location.pathname, setLanguageIndex]);

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

  return (
    <div className="mt-5 mb-9 sm:my-14 lg:my-22 w-full sm:w-96 mx-auto">
      <Combobox
        value={selectedLanguage}
        onChange={(newValue) => {
          setSelectedLanguage(newValue);
          history.push("/" + newValue.eng);
          setLanguageIndex(newValue.index);
        }}
      >
        <div className="relative">
          <div className="flex items-center gap-x-4">
            <PrevButton onClick={goToPrevVerse} className={"w-16 h-12"} />

            <div className="relative cursor-default overflow-hidden bg-zinc-100 dark:bg-[#1D1F34] p-2 rounded-full flex w-full text-left">
              <div className="absolute flex items-baseline gap-x-3">
                <span
                  className={`pl-3 text-sm pt-2 ${
                    labelVisible
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  } transition-opacity duration-300 flex-shrink-0`}
                >
                  {selectedLanguage ? selectedLanguage.orig : ""}
                </span>
                {selectedLanguage.orig !== "English" && (
                  <span
                    className={`text-xs text-gray-500 pt-3 ${
                      labelVisible
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    } transition-opacity duration-300 flex-shrink-0`}
                  >
                    {selectedLanguage ? selectedLanguage.eng : ""}
                  </span>
                )}
              </div>

              <Combobox.Input
                className="w-full py-2 pl-3 bg-transparent pr-10 text-sm focus:outline-none relative"
                displayValue={labelVisible ? null : (lang) => lang.orig}
                onChange={({ target: { value } }) => setQuery(value)}
                onFocus={() => setLabelVisible(false)}
                onBlur={() => setLabelVisible(true)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-11 h-5 cursor-pointer px-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </Combobox.Button>
            </div>

            <NextButton onClick={goToNextVerse} className={"w-16 h-12 "} />
          </div>

          <Combobox.Options className="absolute mt-4 max-h-60 w-full overflow-auto rounded-3xl bg-zinc-100 dark:bg-[#1D1F34] text-base focus:outline-none shadow-md">
            {filterLangList(query).map((lang) => (
              <Combobox.Option
                key={lang.index}
                value={lang}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-black dark:bg-zinc-700 text-white dark:text-white"
                      : "text-slate-900 dark:text-white"
                  }`
                }
              >
                {lang.orig}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}

export default LanguageSelect;
