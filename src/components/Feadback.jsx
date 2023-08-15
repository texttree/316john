import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Feadback() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validation = () => {
    let error = null;
    if (!name || !country || !message) {
      error = "NotAllFieldFull";
    }
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
        JSON.stringify({ name, country, message })
      )
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-7"
    >
      <div className="text-sm sm:text-base font-bold">{t("ContactUs")}</div>
      <div className="flex flex-col items-center gap-4 w-full text-sm">
        <input
          placeholder={t("YourName")}
          className="p-2 border border-gray-400 rounded-lg w-full"
          onBlur={(e) => setName(e.target.value)}
        />
        <input
          placeholder={t("Country")}
          className="p-2 border border-gray-400 rounded-lg w-full"
          onBlur={(e) => setCountry(e.target.value)}
        />
        <textarea
          placeholder={t("Message")}
          className="p-2 border border-gray-400 rounded-lg w-full"
          onBlur={(e) => setMessage(e.target.value)}
          rows="5"
        />
        <input
          type="submit"
          className="p-2 mt-4 bg-zinc-100 w-full text-sm sm:text-base font-bold rounded-lg"
          value={t("Send")}
        />
        {error && <div>{t(error)}</div>}
        {<div className="text-gray-400">{t("PrivacyPolicyMessage")}</div>}
      </div>
    </form>
  );
}

export default Feadback;
