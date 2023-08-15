import { useState } from "react";
import versesData from "../verses.json";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";

const VerseSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextVerse = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % versesData.length);
  };

  const goToPrevVerse = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + versesData.length) % versesData.length
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-4">
        <PrevButton onClick={goToPrevVerse} />
        <div className="mx-4 max-w-lg h-84 flex items-center justify-center rounded-lg">
          <p className="text-lg leading-tight text-center">
            {versesData[currentIndex].verse}
          </p>
        </div>
        <NextButton onClick={goToNextVerse} />
      </div>
      <br />
      <div>
        <p className="text-sm text-center">
          <span className="font-bold">
            {versesData[currentIndex].languageOriginal}
          </span>
          <span className="text-gray-500"> </span>
          <span className="font-bold">
            {versesData[currentIndex].languageEnglish}
          </span>
        </p>
        <br />
        <br />
      </div>
      <br />{" "}
    </div>
  );
};

export default VerseSlider;
