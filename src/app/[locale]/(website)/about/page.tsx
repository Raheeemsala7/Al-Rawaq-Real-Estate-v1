import { getTranslations } from "next-intl/server";
import ConsultationSec from "@/shared/components/ConsultationSec";
import Animated from "@/shared/components/Animated";
import { fadeInUp } from "@/shared/lib/constant/anmation";
import { CheckCircle2, Target, Eye } from "lucide-react";
import React from "react";

export default async function AboutPage() {
    const t = await getTranslations("about");

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

            {/* Mission, Vision, Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Mission */}
                        <Animated {...fadeInUp} className="bg-card border border-border p-8 rounded-2xl shadow-sm text-center">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">{t("mission_title")}</h3>
                            <p className="text-muted-foreground">{t("mission_desc")}</p>
                        </Animated>

                        {/* Vision */}
                        <Animated {...fadeInUp} className="bg-card border border-border p-8 rounded-2xl shadow-sm text-center">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <Eye className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">{t("vision_title")}</h3>
                            <p className="text-muted-foreground">{t("vision_desc")}</p>
                        </Animated>

                        {/* Values */}
                        <Animated {...fadeInUp} className="bg-card border border-border p-8 rounded-2xl shadow-sm text-center">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">{t("values_title")}</h3>
                            <p className="text-muted-foreground">{t("values_desc")}</p>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* Consultation Section */}
            <ConsultationSec />
        </main>
    );
}
