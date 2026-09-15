import Logo from '../../../public/assets/Logo'
import { LanguageToggle } from './language-toggle'
import UserData from '@/features/auth/_components/user-data'
import { getTranslations } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { Link } from '@/i18n/navigation'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'

const Header = async () => {
    const t = await getTranslations('navigation');
    const session = await getServerSession(authOptions)

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/properties", label: t("properties") },
        { href: "/about", label: t("about") },
        { href: "/services", label: t("services") },
        { href: "/contact", label: t("contact") },
    ];

    return (
        <header
            className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md shadow-sm"
        >
            <div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <MobileNav links={navLinks} />
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-inline-start after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <Link href={"/"}>
                    <Logo />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {session ? (
                            <UserData />
                        ) : (
                            <>
                                <Link
                                    href={"/auth/login"}
                                    className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                                >
                                    {t("login")}
                                </Link>
                                <Link
                                    href={"/auth/login"}
                                    className="rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:brightness-90 transition-all duration-200"
                                >
                                    {t("signup")}
                                </Link>
                            </>
                        )}
                    </div>
                    <ThemeToggle />
                    <LanguageToggle />
                </div>
            </div>
        </header>
    )
}

export default Header
