import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import versesData from '../verses.json';
import { Combobox } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { languageIdState } from '../atoms';

const langList = versesData.map((lang, index) => ({
  orig: lang.languageOriginal,
  index,
  eng: lang.languageEnglish,
  variants: lang.languageVariants
    .split(',')
    .map((el) => el.trim().toLowerCase()),
}));

const filterLangList = (filter) => {
  return langList.filter(
    ({ variants }) =>
      variants.filter((el) => el.startsWith(filter.trim().toLowerCase()))
        .length > 0
  );
};

const searchLanguage = (search) => {
  return langList.filter(
    (lang) => lang.eng.toLocaleLowerCase() === search.toLocaleLowerCase()
  )?.[0];
};

function LanguageSelect() {
  const [language, setLanguage] = useRecoilState(languageIdState);
  let history = createBrowserHistory();
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [query, setQuery] = useState('');
  useEffect(() => {
    const currentLang = searchLanguage(history.location.pathname.slice(1));
    if (currentLang?.eng) {
      setSelectedLanguage(currentLang);
    }
  }, [history.location.pathname]);
  useEffect(() => {
    setSelectedLanguage(langList.filter((el) => el.index === language)?.[0]);
  }, [language]);
  return (
    <div className="mt-3 mb-9 lg:mt-16 lg:mb-12 w-full sm:w-72 mx-auto">
      <Combobox
        value={selectedLanguage}
        onChange={(newValue) => {
          setSelectedLanguage(newValue);
          history.push('/' + newValue.eng);
          setLanguage(newValue.index);
        }}>
        <div className="relative">
          <div className="relative cursor-default overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full flex w-full text-left">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 bg-transparent pr-10 text-sm focus:outline-none"
              displayValue={(lang) => lang.orig}
              onChange={({ target: { value } }) => setQuery(value)}
              placeholder="Search Language"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-11 h-5 cursor-pointer px-3">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Combobox.Button>
          </div>

          <Combobox.Options className="absolute mt-4 max-h-60 w-full overflow-auto rounded-3xl bg-zinc-100 dark:bg-zinc-800 text-base focus:outline-none shadow-md">
            {filterLangList(query).map((lang) => (
              <Combobox.Option
                key={lang.index}
                value={lang}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-black dark:bg-zinc-700 text-white dark:text-white'
                      : 'text-slate-900 dark:text-white'
                  }`
                }>
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
