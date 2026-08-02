import { buttonVariants } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { fadeInUp } from "@/shared/lib/constant/anmation";
import FeatureProperties from "@/shared/components/feature-properties";
import Animated from "@/shared/components/Animated";
import { getTranslations } from "next-intl/server";
import ServicesSec from "@/shared/components/ServicesSec";
import ConsultationSec from "@/shared/components/ConsultationSec";
import ShapeIogo from "../../../../public/assets/icons/ShapeIogo";
import { Link } from "@/i18n/navigation";
import ReviewsSec from "@/shared/components/ReviewsSec";
import { cn } from "@/shared/lib/utils";

export default async function Home() {
  const t = await getTranslations("hero")
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 ltr:leading-16 rtl:leading-20 text-balance">{t("title")}</h1>
            <Link href="/properties" className={cn(buttonVariants() ,`bg-gradient-to-b from-[#A89989] to-[#7D6D5E] 
                            text-white py-3 px-8 rounded-lg 
                              transition-all duration-300 ease-in-out hover:brightness-90`)}>
              {t("cta")}
              <span>
                <ArrowLeft className="w-4 h-4 ltr:rotate-180" />
              </span>
            </Link>
          </Animated>
        </div>
      </section>
      <FeatureProperties />
      <ServicesSec />
      <ReviewsSec />
      <section className="relative h-[60vh] bg-contact py-20">
        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center gap-5">
            <ShapeIogo className="stroke-white" />

            <h6 className="max-w-xl text-center text-5xl leading-14 text-white">
              {t("contactSection.title")}
            </h6>

            <Link
              href="/contact"
              className="flex w-fit items-center gap-3 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] px-8 py-4 text-white"
            >
              <span>{t("contactSection.button")}</span>
              <ArrowLeft className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <ConsultationSec />
    </main>
  );
}
