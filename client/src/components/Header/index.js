import { useEffect, useState } from 'react';
import './index.css'

const Header = () => {
    const [isPageScrolled, setIsPageScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsPageScrolled(true)
            } else {
                setIsPageScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
    <header className={"header " + (isPageScrolled ? "navbarScrolled" : "")} id="header">
        <div className={"logo " + (isPageScrolled ? "logoScrolled" : "")}>
            <img src="karmenmon.png" alt="karmenmon"/>
        </div>
    </header>
)};

export default Header;