import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Feedback from './Feedback'
import Modal from './Modal'
import PrevButton from './PrevButton'
import Header from './Header'
import { languageGroups, countVerse } from '../helper'
import Youtube from '../youtube.svg?react'

function About() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-center mt-24 mb-16">
        <button className="font-bold underline" onClick={() => setIsOpen(true)}>
          {t('AboutProject')}
        </button>
      </div>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="mx-auto max-w-4xl px-7 pb-10 h-full space-y-20 bg-white dark:bg-primary">
          <div className="relative">
            <div className="absolute py-6 z-10">
              <PrevButton
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 bg-zinc-100 dark:bg-widget hover:bg-zinc-200 active:bg-zinc-300  dark:hover:bg-hover dark:active:bg-zinc-600"
              />
            </div>
            <Header />
          </div>

          <div className="space-y-10">
            <div className="space-y-5 mx-auto max-w-md">
              <div className="flex flex-col gap-5 text-center">
                <div className="text-xl font-bold">{t('AboutProject')}</div>
                <p>{t('AboutProjectText')}</p>
                <p className="text-sm">
                  {`${t('TranslatedLanguage', {
                    count: Object.keys(languageGroups).length,
                  })} 7000`}
                </p>
                <p className="text-sm">
                  {`${t('CountVerse', {
                    count: countVerse,
                  })}`}
                </p>
              </div>
              <div className="flex justify-center">
                <a
                  href="https://www.youtube.com/@316John"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 ease-in-out hover:text-red-500"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              <div className="flex flex-col gap-5 text-center">
                <div className="text-xl font-bold">{t('OurGoal')}</div>
                <p>{t('OurGoalText')}</p>
              </div>
            </div>
            <Feedback />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default About
