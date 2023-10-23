import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { darkModeState } from '../atoms'
import Moon from '../moon.svg?react'
import Sun from '../sun.svg?react'

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState)
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle('dark', newMode)
    localStorage.setItem('darkMode', newMode)
  }

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === 'true') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [setIsDarkMode])

  return (
    <button
      className="text-lg ml-4"
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  )
}

export default DarkModeToggle
