import { useTranslation } from "react-i18next";
import { langs } from "../constants";

function LocaleSwitch() {
  const { i18n } = useTranslation();
  return (
    <>
      <select className="bg-transparent dark:text-white cursor-pointer">
        {langs.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            onClick={() => {
              i18n.changeLanguage(lang.code);
            }}
          >
            {lang.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default LocaleSwitch;
