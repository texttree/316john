import  { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import LocaleSwitch from './LocaleSwitch';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString()); 
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`flex flex-row py-6 justify-between items-center relative`}>
      <div className="mx-auto ml-auto font-['Anek_Bangla'] font-bold uppercase text-2xl">
        3:16 John
      </div>
      <div className="flex items-center">
        <button
          className="text-3xl ml-4"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
        <LocaleSwitch />
      </div>
    </div>
  );
}

export default Header;
