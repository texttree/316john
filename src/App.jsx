import LanguageSelect from "./components/LanguageSelect";
import Header from "./components/Header";
import VerseSlider from "./components/VerseSlider";

import { useTranslation } from "react-i18next";
import About from "./components/About";

function App() {
  return (
    <div className="mx-auto max-w-4xl px-7">
      <Header />
      <LanguageSelect />
      <VerseSlider />
      <About />
    </div>
  );
}

export default App;
