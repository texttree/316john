import { useState } from "react";
import { createBrowserHistory } from "history";
import versesData from "../verses.json";
import { Combobox } from "@headlessui/react";

const langList = versesData.map((lang, index) => ({
  orig: lang.languageOriginal,
  index,
  eng: lang.languageEnglish,
  variants: lang.languageVariants
    .split(",")
    .map((el) => el.trim().toLowerCase()),
}));

const filterLangList = (filter) => {
  return langList.filter(
    ({ variants }) => variants.filter((el) => el.startsWith(filter)).length > 0
  );
};

function LanguageSelect() {
  let history = createBrowserHistory();
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [query, setQuery] = useState("");
  return (
    <div>
      <Combobox value={selectedLanguage} onChange={setSelectedLanguage}>
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(lang) => lang.orig}
            onChange={({ target: { value } }) => setQuery(value)}
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

        <Combobox.Options>
          {filterLangList(query).map((lang) => (
            <Combobox.Option key={lang.index} value={lang}>
              {lang.orig}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full flex w-64">
        <input
          className="bg-transparent w-full outline-none ml-3"
          type="text"
        />
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl w-64 mt-6"></div>
    </div>
  );
}

export default LanguageSelect;
