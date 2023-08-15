import LanguageSelect from "./components/LanguageSelect";
import Header from "./components/Header";
import VerseSlider from "./components/VerseSlider";
import Feedback from "./components/Feedback";

function App() {
  return (
    <div className="mx-auto max-w-4xl px-7">
      <Header />
      <LanguageSelect />
      <VerseSlider />
      <Feedback />
    </div>
  );
}

export default App;
