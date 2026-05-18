"use client"

import { useTransition } from "react"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Globe, Loader2 } from "lucide-react"
import { useRouter } from "@/i18n/navigation"
import { Button } from "./ui/button"
// 👇 مهم

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("common")

const toggleLanguage = () => {
  const nextLocale = locale === "ar" ? "en" : "ar";
  
  startTransition(() => {
    // نشيل كل اللغات الموجودة من الـ path
    const supportedLocales = ["ar", "en"];
    let cleanPath = pathname;
    
    // نشيل اللغة من بداية الـ path
    supportedLocales.forEach(loc => {
      const pattern = new RegExp(`^/${loc}(/|$)`);
      cleanPath = cleanPath.replace(pattern, "/");
    });
    
    // لو الـ path بقى فاضي، نخليه "/"
    if (cleanPath === "") {
      cleanPath = "/";
    }
    
    // نبني الـ path الجديد (الـ middleware هيضيف اللغة)
    const newPath = cleanPath === "/" ? "/" : cleanPath;
    
    // نستخدم push مع الـ locale parameter
    router.push(newPath, { locale: nextLocale });
  });
};



  return (
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        disabled={isPending}
        className="flex items-center gap-2  bg-transparent border-none p-0 shadow-none"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs">{t("loading")}</span>
          </>
        ) : (
          <>
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {locale === "ar" ? "EN" : "عربي"}
            </span>
          </>
        )}
      </Button>
  )
}
