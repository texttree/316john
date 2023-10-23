import LocaleSwitch from './LocaleSwitch'
import DarkModeToggle from './DarkModeToggle'
import Logo from '../logo.svg?react'

function Header() {
  return (
    <div className="flex py-6 justify-center items-center relative">
      <div className="text-primary dark:text-white">
        <Logo />
      </div>
      <div className="flex absolute right-0">
        <DarkModeToggle />
        <LocaleSwitch />
      </div>
    </div>
  )
}

export default Header
