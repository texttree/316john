import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "../atoms";
import { ReactComponent as Moon } from "../../src/moon.svg";
const sun = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, [setIsDarkMode]);

  return (
    <button
      className="text-lg ml-4"
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? sun : <Moon />}
    </button>
  );
}

export default DarkModeToggle;
