import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Feedback from './Feedback';
import Modal from './Modal';
import PrevButton from './PrevButton';
import Header from './Header';

import versesData from '../verses.json';

function About() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-center mt-24 mb-16">
        <button
          className="font-bold underline text-base"
          onClick={() => setIsOpen(true)}>
          {t('AboutProject')}
        </button>
      </div>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="mx-auto max-w-4xl px-7 pb-10 h-full space-y-20">
          <div className="relative">
            <div className="absolute translate-y-1/2 z-10">
              <PrevButton onClick={() => setIsOpen(false)} classes="w-4 h-4" />
            </div>
            <Header />
          </div>

          <div className="space-y-20">
            <div className="space-y-20 mx-auto max-w-md">
              <div className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="text-xl font-bold">{t('AboutProject')}</div>
                <p className="text-base">{t('AboutProjectText')}</p>
                <p className="text-sm">{`${t('TranslatedLanguage', {
                  count: versesData.length,
                })} 7000`}</p>
              </div>
              <div className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="text-xl font-bold">{t('OurGoal')}</div>
                <p className="text-base">{t('OurGoalText')}</p>
              </div>
            </div>
            <Feedback />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default About;
