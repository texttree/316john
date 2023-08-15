import { useState } from "react";
import { createBrowserHistory } from "history";
import versesData from "../verses.json";

const langList = versesData.map((lang) => ({
  orig: lang.languageOriginal,
  eng: lang.languageEnglish,
  variants: lang.languageVariants
    .split(",")
    .map((el) => el.trim().toLowerCase()),
}));

const filterLangList = (filter) => {
  return langList.filter(({ variants }) => variants.filter((el) => el.start));
};

function LanguageSelect() {
  let history = createBrowserHistory();
  const [inputValue, setInputValue] = useState();
  return (
    <div>
      <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full flex w-64">
        <input
          className="bg-transparent w-full outline-none ml-3"
          type="text"
          value={inputValue}
          onChange={({ target: { value } }) => {
            setInputValue(value);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 cursor-pointer mx-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <div className="bg-blue-100">{}</div>
    </div>
  );
}

export default LanguageSelect;
