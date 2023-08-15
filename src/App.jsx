import Feadback from "./components/Feadback";
import LanguageSelect from "./components/LanguageSelect";
import Header from "./components/Header";
import VerseSlider from "./components/VerseSlider";

function App() {
  return (
    <div className="mx-auto max-w-4xl px-7">
      <Header />
      <LanguageSelect />
      <VerseSlider />
      <Feadback />
    </div>
  );
}

export default App;
