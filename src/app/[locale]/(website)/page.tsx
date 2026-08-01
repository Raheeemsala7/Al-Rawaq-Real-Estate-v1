import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { fadeInUp } from "@/shared/lib/constant/anmation";
import FeatureProperties from "@/shared/components/feature-properties";
import Animated from "@/shared/components/Animated";
import { getTranslations } from "next-intl/server";
import ServicesSec from "@/shared/components/ServicesSec";
import ConsultationSec from "@/shared/components/ConsultationSec";
import ShapeIogo from "../../../../public/assets/icons/ShapeIogo";
import { Link } from "@/i18n/navigation";

export default async function Home() {
  const t = await getTranslations()
  return (
    <main>

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
          <Animated className="max-w-2xl " {...fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 ltr:leading-16 rtl:leading-20 text-balance">{t("hero.title")}</h1>
            <Button size="lg" className="bg-gradient-to-b from-[#A89989] to-[#7D6D5E] 
                            text-white py-3 px-8 rounded-lg 
                              transition-all duration-300 ease-in-out hover:brightness-90">
              {t("hero.cta")}

              <span>
                <ArrowLeft className="w-4 h-4 ltr:rotate-180" />
              </span>
            </Button>
          </Animated>
        </div>
      </section>
      <FeatureProperties />
      <ServicesSec />
      <section className='py-20 bg-contact h-[60vh] relative'>
        <div className="max-w-7xl relative h-full mx-auto px-4">
          <div className="flex items-center justify-center flex-col gap-5">
            <ShapeIogo className="stroke-white" />
            <h6 className="text-5xl text-center leading-14 text-white max-w-xl">اتصل بنا اليوم واحجز استشارة
              مع أحد مختصينا.</h6>
            <Link href={"/contact"} className='w-fit flex gap-3 items-center py-4 px-8 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white'>
              <span>احجز استشارة</span>
              <ArrowLeft className='size-4' />
            </Link>
          </div>
        </div>
      </section>
      <ConsultationSec />
    </main>
  );
}
