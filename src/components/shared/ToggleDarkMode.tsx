import { useState } from "react"
import { Button } from "../ui"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


const ToggleDarkMode = () => {
    const { theme, setTheme } = useTheme()
  return (
    <Button
    variant="ghost"
    className={`flex items-center justify-between w-full pl-4 ${ theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}  rounded`}
    
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
     <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
     {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
  </Button>
  )
}

export default ToggleDarkMode