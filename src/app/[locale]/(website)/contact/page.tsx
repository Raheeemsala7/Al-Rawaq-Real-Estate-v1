"use client";

import { useTranslations } from "next-intl";
import Animated from "@/shared/components/Animated";
import { fadeInUp } from "@/shared/lib/constant/anmation";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
    const t = useTranslations("contact");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock submission
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("تم إرسال رسالتك بنجاح!");
        }, 1500);
    };

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

            {/* Contact Content */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        
                        {/* Contact Form */}
                        <Animated {...fadeInUp}>
                            <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">
                                            {t("form.name")}
                                        </label>
                                        <Input
                                            required
                                            placeholder={t("form.namePlaceholder")}
                                            className="bg-background border-border h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">
                                            {t("form.email")}
                                        </label>
                                        <Input
                                            required
                                            type="email"
                                            placeholder={t("form.emailPlaceholder")}
                                            className="bg-background border-border h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">
                                            {t("form.message")}
                                        </label>
                                        <Textarea
                                            required
                                            placeholder={t("form.messagePlaceholder")}
                                            className="bg-background border-border min-h-[150px]"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white hover:brightness-90 transition-all text-base"
                                    >
                                        {isSubmitting ? t("form.loading") : t("form.submit")}
                                    </Button>
                                </form>
                            </div>
                        </Animated>

                        {/* Contact Information & Map */}
                        <Animated {...fadeInUp} className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">{t("info.address")}</h4>
                                    <p className="text-muted-foreground text-sm">الدوحة، قطر</p>
                                </div>
                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">{t("info.phone")}</h4>
                                    <p className="text-muted-foreground text-sm" dir="ltr">+967 859 66 55</p>
                                </div>
                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 md:col-span-2">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">{t("info.email")}</h4>
                                    <p className="text-muted-foreground text-sm">support@agency.com</p>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden border border-border relative flex items-center justify-center">
                                <p className="text-muted-foreground">Map Placeholder</p>
                            </div>
                        </Animated>
                        
                    </div>
                </div>
            </section>
        </main>
    );
}
