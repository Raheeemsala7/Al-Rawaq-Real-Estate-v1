"use client"
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {motion} from "framer-motion"
import { fadeInUp } from "@/shared/lib/constant/anmation";

export default async function Home() {
    const t = useTranslations()
  return (
    <section className="relative min-h-[calc(100vh-65px)] flex items-center">
      <div className="absolute inset-0 ">
        <Image
          src={"/landing.png"}
          alt="Real Estate Hero"
          fill
          className="object-cover ltr:scale-x-[-1]"
          priority
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4">
        <motion.div className="max-w-2xl " {...fadeInUp}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 ltr:leading-16 rtl:leading-20 text-balance">{t("hero.title")}</h1>
          <Button size="lg" className="bg-gradient-to-b from-[#A89989] to-[#7D6D5E] 
                            text-white py-3 px-8 rounded-lg 
                              transition-all duration-300 ease-in-out hover:brightness-90">
            {t("hero.cta")}

            <span>
              <ArrowLeft className="w-4 h-4 ltr:rotate-180" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
