import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { langs } from '../constants'
import Locale from '../locale.svg?react'

function LocaleSwitch() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        className="flex items-center ml-3 rounded bg-transparent"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Locale className="w-6 h-6" />
        <span>
          {langs.filter((lang) => lang.code === i18n.language.split('-')[0])?.[0]?.short}
        </span>
      </button>
      {open && (
        <ul className="z-50 overflow-hidden absolute dark:text-black mt-2 rounded shadow-md right-0">
          {langs.map((lang) => (
            <li
              className="cursor-pointer select-none p-2 hover:bg-black hover:text-white bg-zinc-100 dark:bg-widget dark:hover:bg-hover  dark:text-slate-100"
              key={lang.code}
              value={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setOpen(false)
              }}
            >
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LocaleSwitch
