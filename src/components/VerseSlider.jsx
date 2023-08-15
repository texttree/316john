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
        <div>
          <div className=" text-base text-center  justify-between space-x-4 ">
            <div className="inline-block font-bold">
              {versesData[currentIndex].languageOriginal}{" "}
              <span className="font-normal">
                ({versesData[currentIndex].languageEnglish})
              </span>
            </div>
          </div>
          <br />
          <div className="text-center text-gray-400">
            <a
              href={versesData[currentIndex].refNameTranslate}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {versesData[currentIndex].nameTranslate}
            </a>
            {" by "}
            <a
              href={versesData[currentIndex].refOwner}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {versesData[currentIndex].owner}
            </a>
          </div>
          <div className="text-center text-gray-400 underline">
            <a
              href={versesData[currentIndex].refOwner}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`License:  ${versesData[currentIndex].license}`}
            </a>
          </div>
        </div>

        <br />
        <br />
      </div>
      <br />{" "}
    </div>
  );
};

export default VerseSlider;
