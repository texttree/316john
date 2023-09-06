import LocaleSwitch from "./LocaleSwitch";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  return (
    <div className="flex flex-row py-6 justify-between items-center relative">
      <div className="flex-grow font-['Anek_Bangla'] font-bold uppercase text-2xl ml-28 md:ml-96">
        3:16 John
      </div>
      <DarkModeToggle />
      <LocaleSwitch />
    </div>
  );
}

export default Header;
