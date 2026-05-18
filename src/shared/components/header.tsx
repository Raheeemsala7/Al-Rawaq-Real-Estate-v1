"use client"
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React from 'react'
import Link from 'next/link'
import Logo from '../../../public/assets/Logo'
import { LanguageToggle } from './language-toggle'



const Header = () => {

  
const t =useTranslations()


    return (
        <motion.header
            className="bg-background border-b border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">



                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("navigation.home")}
                        </Link>
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("navigation.about")}
                        </Link>
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("navigation.services")}
                        </Link>
                        <Link href="#" className="text-foreground hover:text-primary transition-colors">
                            {t("navigation.contact")}
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

                        {false ? (
                            <>
                            </>
                        ) :
                            <>
                                <Link className='text-foreground hover:text-primary transition-colors' href={"/auth/login"}>{t("navigation.login")}</Link>
                                <Link className='text-foreground hover:text-primary transition-colors' href={"/auth/login"}>{t("navigation.signup")}</Link>
                            </>
                        }
                    </div>
                    <LanguageToggle />
                </div>



            </div>
        </motion.header>
    )
}

export default Header