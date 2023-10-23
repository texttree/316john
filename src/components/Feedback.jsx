import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Feedback() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSended, setIsSended] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validation = () => {
    let error = null;
    if (!name || !country || !email || !message) {
      error = "NotAllFieldFull";
    }
    setIsFormValid(!error);
    return { error };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { error } = validation();
    if (error) {
      setError(error);
      return;
    }
    axios
      .post(
        "/.netlify/functions/sendFeedback",
        JSON.stringify({ name, country, message, email })
      )
      .then((res) => {
        console.log({ res });
        setIsSended(true);
        setCountry("");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setIsSended(false);
    }, 2000);
  }, [isSended]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-7 border-t border-gray-400 dark:border-zinc-700 pt-7"
    >
      <div className="text-xl font-bold">{t("ContactUs")}</div>
      {!isSended ? (
        <div className="flex flex-col dark:text-zinc-100 items-center gap-4 w-full">
          <input
            placeholder={t("YourName")}
            className="p-3 border border-gray-400 dark:border-zinc-700 dark:bg-widget rounded-lg w-full outline-none"
            onBlur={(e) => setName(e.target.value)}
          />
          <input
            placeholder={t("YourEmail")}
            className="p-3 border border-gray-400 dark:border-zinc-700 dark:bg-widget rounded-lg w-full outline-none"
            onBlur={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder={t("Country")}
            className="p-3 border border-gray-400 dark:border-zinc-700 dark:bg-widget rounded-lg w-full outline-none"
            onBlur={(e) => setCountry(e.target.value)}
          />
          <textarea
            placeholder={t("Message")}
            className="p-3 border border-gray-400 dark:border-zinc-700 dark:bg-widget rounded-lg w-full outline-none"
            onBlur={(e) => setMessage(e.target.value)}
            rows="5"
          />
          <input
            type="submit"
            className="p-3 mt-4 bg-zinc-100 dark:bg-widget hover:bg-zinc-200 active:bg-zinc-300  dark:hover:bg-zinc-700 dark:active:bg-zinc-600 w-full font-bold rounded-lg cursor-pointer"
            value={t("Send")}
            disabled={!isFormValid}
          />
          {error && <div>{t(error)}</div>}
          <div className="text-center text-gray-400">
            {t("PrivacyPolicyMessage")}
          </div>
        </div>
      ) : (
        <div className="p-10 w-full text-center bg-zinc-100 dark:bg-widget rounded-lg">
          {t("YourMessageHasBeenSent")}
        </div>
      )}
    </form>
  );
}

export default Feedback;
