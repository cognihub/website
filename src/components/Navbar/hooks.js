import { useState, useRef, useEffect } from 'react'

export function useTheme() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme) {
            setTheme(storedTheme)
            document.documentElement.setAttribute('data-theme', storedTheme)
        }
    }, [])

    const toggleTheme = () => {
        const targetTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(targetTheme)
        document.documentElement.setAttribute('data-theme', targetTheme)
        localStorage.setItem('theme', targetTheme)
    }

    return [theme, toggleTheme]
}

export function usePopover() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const popoverRef = useRef(null)

    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setMobileNavOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return [popoverRef, mobileNavOpen, setMobileNavOpen]
}
