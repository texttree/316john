import LanguageSelect from "./components/LanguageSelect";
import Header from "./components/Header";
import VerseSlider from "./components/VerseSlider";
import Feedback from "./components/Feedback";
import Modal from "./components/Modal";
import { useTranslation } from "react-i18next";

function App() {
  const t = useTranslation();
  return (
    <div className="mx-auto max-w-4xl px-7">
      <Header />
      <LanguageSelect />
      <VerseSlider />
      <button>{"ff"}</button>
    </div>
  );
}

export default App;
