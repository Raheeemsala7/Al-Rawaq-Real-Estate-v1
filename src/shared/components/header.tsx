import Link from 'next/link'
import Logo from '../../../public/assets/Logo'
import { LanguageToggle } from './language-toggle'
import UserData from '@/features/auth/_components/user-data'
import { getTranslations } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const Header = async () => {
    const t = await getTranslations('navigation');
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <header
            className="bg-background border-b border-border"
        >
            <div className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">



                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("home")}
                        </Link>
                        <Link href="/properties" className="text-foreground hover:text-primary transition-colors">
                            {t("properties")}
                        </Link>
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("about")}
                        </Link>
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("services")}
                        </Link>
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("contact")}
                        </Link>
                    </nav>
                </div>

                <div >
                    <Logo />
                </div>

                <div className="flex items-center gap-4">

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {/* <Phone className="w-4 h-4" />
                        <span>{t("common.phone")}</span> */}
 
                        {session ? (
                            <UserData />
                        ) :
                            <>
                                <Link className='text-foreground hover:text-primary transition-colors' href={"/auth/login"}>{t("login")}</Link>
                                <Link className='text-foreground hover:text-primary transition-colors' href={"/auth/login"}>{t("signup")}</Link>
                            </>
                        }
                    </div>
                    <LanguageToggle />
                </div>



            </div>
        </header>
    )
}

export default Header