import LocaleSwitch from "./LocaleSwitch";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  return (
    <div className="flex flex-row py-6 justify-between items-center relative">
      <div className="flex-grow ml-28 md:ml-96">
        <img src="../../public/logo.png" alt="3:16 John" />
      </div>
      <DarkModeToggle />
      <LocaleSwitch />
    </div>
  );
}

export default Header;
