import { useTranslation } from 'react-i18next';
import { langs } from '../constants';
import { useState } from 'react';

function LocaleSwitch() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative">
        <button
          className="flex w-16 items-center justify-between rounded bg-transparent p-2"
          onClick={() => setOpen((prev) => !prev)}>
          <span>
            {langs.filter((lang) => lang.code === i18n.language)?.[0]?.short}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </button>
        {open && (
          <ul className="z-50 overflow-hidden absolute dark:text-black mt-2 rounded shadow-md right-0">
            {langs.map((lang) => (
              <li
                className="cursor-pointer select-none p-2 hover:bg-black hover:text-white bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-slate-100"
                key={lang.code}
                value={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}>
                {lang.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default LocaleSwitch;
