'use client'

import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import Logo from '../Logo/Logo'
import { usePopover, useTheme } from './hooks'
import NavbarLocaleSwitcher from './components/NavbarLocaleSwitcher'
import { Link, usePathname } from '@/i18n/routing'

import styles from './Navbar.module.css'

const links = [
    { href: '/aboutus', label: 'about' },
    { href: '/events', label: 'events' },
    { href: '/mentorhub', label: 'mentorhub' },
    { href: '/become-member', label: 'become-member' },
    { href: '/cooperate', label: 'cooperate' },
    { href: '/contact-us', label: 'contact-us' },
    { href: '/faq', label: 'faq' },
]

function MenuLinks({ mobileNavOpen, setMobileNavOpen }) {
    const t = useTranslations('Navbar')

    const currentPath = usePathname()

    const onLinkClick = () => {
        if (mobileNavOpen) setMobileNavOpen(false)
    }

    return (
        <div className={styles.MenuLinksContainer}>
            {links.map((link) => {
                const linkClassName = (!mobileNavOpen && currentPath === link.href) ? styles.activeLink : ''
                return (
                    <Link
                        className={linkClassName}
                        key={link.href}
                        href={link.href}
                        onClick={() => onLinkClick()}
                    >
                        {t(link.label)}
                    </Link>
                )
            })}
        </div>
    )
}

export default function Navbar() {
    const [theme, toggleTheme] = useTheme()
    const [popoverRef, mobileNavOpen, setMobileNavOpen] = usePopover()

    return (
        <nav className={styles.NavbarContainer}>
            <Logo />

            <div className={styles.MobileNavItemsContainer}>
                <button onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label='Open navbar'>
                    {!mobileNavOpen && <Icon icon='iconamoon:menu-burger-horizontal' width='35' />}
                </button>
                {mobileNavOpen
                    && (
                        <div className='Popover' ref={popoverRef}>
                            <div className='ButtonHeader'>
                                <div>
                                    <button className='navButton' id='theme-toggle' onClick={toggleTheme}>
                                        {theme === 'light' ? '☀️' : '🌙'}
                                    </button>/
                                    <NavbarLocaleSwitcher />
                                </div>
                                <button className='closeNav' onClick={() => setMobileNavOpen(!mobileNavOpen)}>×</button>
                            </div>
                            <MenuLinks mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
                        </div>
                    )}
            </div>

            <div className={styles.NavItemsContainer}>
                <MenuLinks mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
                <div className='navButton' id='theme-toggle' onClick={toggleTheme}>
                    {theme === 'light' ? '☀️' : '🌙'}
                </div>
                <NavbarLocaleSwitcher />
            </div>
        </nav>
    )
}
