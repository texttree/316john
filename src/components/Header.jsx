import LocaleSwitch from './LocaleSwitch';

function Header() {
  return (
    <div className="flex flex-row py-6 justify-center relative">
      <div className="font-['Anek_Bangla'] font-bold uppercase text-2xl">
        3:16 John
      </div>
      <div className="absolute right-0">
        <LocaleSwitch />
      </div>
    </div>
  );
}

export default Header;
