import { useState } from "react";
import { useTranslation } from "react-i18next";
import Feedback from "./Feedback";
import Modal from "./Modal";
import PrevButton from "./PrevButton";
import Header from "./Header";
import versesData from "../verses.json";

function About() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-center">
        <button onClick={() => setIsOpen(true)}>{t("AboutProject")}</button>
      </div>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="mx-auto max-w-4xl px-7 pb-6 h-full space-y-20">
          <div className="relative">
            <div className="absolute translate-y-1/2 z-10">
              <PrevButton onClick={() => setIsOpen(false)} classes="w-4 h-4" />
            </div>
            <Header />
          </div>

          <div className="space-y-20">
            <div className="space-y-20 mx-auto max-w-md">
              <div className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="text-xl font-bold">{t("AboutProject")}</div>
                <p className="text-base">
                  Lorem ipsum dolor sit amet consectetur. Massa nunc tempor
                  velit vivamus vitae auctor. A sagittis sit nunc sed blandit.
                  Ipsum eu orci magna sed ipsum tristique nec. Eget mi faucibus
                  est nunc arcu viverra.
                </p>
                <p className="text-sm">{`${t("TranslatedLanguage", {
                  count: versesData.length,
                })} 7000`}</p>
              </div>
              <div className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="text-xl font-bold">{t("OurGoal")}</div>
                <p className="text-base">
                  Наша цель - до 2033 года перевести стих Иоанна 3:16 на все
                  языки мира.
                </p>
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
