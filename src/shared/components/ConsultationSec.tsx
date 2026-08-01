import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import ShapeIogo from "../../../public/assets/icons/ShapeIogo";
import { Link } from "@/i18n/navigation";

const ConsultationSec = async () => {
    // Translation
    const t = await getTranslations("consultation");

    return (
        <section className="py-20">
            <div className="relative mx-auto h-full max-w-7xl px-4">
                <div className="flex flex-col items-start justify-between gap-5 sm:flex-row">
                    <div className="space-y-6">
                        <h6 className="text-3xl">
                            {t("title")}
                        </h6>

                        <Link
                            href="/contact"
                            className="flex w-fit items-center gap-3 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] px-8 py-4 text-white"
                        >
                            <span>{t("button")}</span>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </div>

                    <p className="text-lg font-medium text-[#8B8D98]">
                        {t("description")}
                    </p>

                    <div>
                        <ShapeIogo />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultationSec;