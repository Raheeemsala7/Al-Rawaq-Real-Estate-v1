import { getTranslations } from "next-intl/server";
import CarouselProperties from "../CarouselProperties";
import { fadeInUp } from "../lib/constant/anmation";
import Animated from "./Animated";

const FeatureProperties = async () => {
    const t = await getTranslations("featureProperties");

    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4">
                <Animated {...fadeInUp}>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-14 border-2 border-[#817263]" />
                            <h3 className="text-lg font-semibold text-[#817263]">
                                {t("section")}
                            </h3>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <h4 className="text-4xl text-[#302D2B]">
                                {t("title")}
                            </h4>

                            <h3 className="text-5xl font-bold text-[#302D2B]">
                                {t("subtitle")}
                            </h3>
                        </div>
                    </div>
                </Animated>

                <Animated {...fadeInUp}>
                    <CarouselProperties propertiesAvailableText={t("propertiesAvailable")} />
                </Animated>
            </div>
        </section>
    );
};

export default FeatureProperties;