import { useState } from "react";
import { useTranslation } from "react-i18next";

import Feedback from "./Feedback";
import Modal from "./Modal";
import PrevButton from "./PrevButton";
import Header from "./Header";
import { languageGroups, countVerse } from "../helper";

const youtubeIconSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    className="w-6 h-6"
  >
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.260.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path>
  </svg>
);

function About() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-center mt-24 mb-16">
        <button
          className="font-bold underline text-base"
          onClick={() => setIsOpen(true)}
        >
          {t("AboutProject")}
        </button>
      </div>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="mx-auto max-w-4xl px-7 pb-10 h-full space-y-20 bg-white dark:bg-primary">
          <div className="relative">
            <div className="absolute py-6 z-10">
              <PrevButton
                onClick={() => setIsOpen(false)}
                className="w-10 h-10"
              />
            </div>
            <Header />
          </div>

          <div className="space-y-10">
            <div className="space-y-5 mx-auto max-w-md">
              <div className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="text-xl font-bold">{t("AboutProject")}</div>
                <p className="text-base">{t("AboutProjectText")}</p>
                <p className="text-sm">
                  {`${t("TranslatedLanguage", {
                    count: Object.keys(languageGroups).length,
                  })} 7000`}
                </p>
                <p className="text-sm">
                  {`${t("CountVerse", {
                    count: countVerse,
                  })}`}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <a
                  href="https://www.youtube.com/@316John"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition duration-300 ease-in-out hover:text-red-500"
                >
                  {youtubeIconSVG}
                </a>
              </div>
              <div className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="text-xl font-bold">{t("OurGoal")}</div>
                <p className="text-base">{t("OurGoalText")}</p>
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
