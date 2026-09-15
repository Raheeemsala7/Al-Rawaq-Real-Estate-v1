import { getTranslations } from "next-intl/server";
import ServicesSec from "@/shared/components/ServicesSec";
import ReviewsSec from "@/shared/components/ReviewsSec";
import Animated from "@/shared/components/Animated";
import { fadeInUp } from "@/shared/lib/constant/anmation";
import React from "react";

export default async function ServicesPage() {
    const t = await getTranslations("services_page");

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-muted/30">
                <div className="absolute inset-0 bg-gradient-to-b from-[#A89989]/10 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <Animated {...fadeInUp}>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </Animated>
                </div>
            </section>

            {/* Reusing existing sections for the services page */}
            <ServicesSec />
            <ReviewsSec />
        </main>
    );
}
