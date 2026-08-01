"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { fadeInUp } from "../lib/constant/anmation";

const ServicesSec = () => {
    // Translation
    const t = useTranslations("services");

    return (
        <>
            <section className="bg-[#FBF9F7] py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center justify-between gap-6">
                        <motion.div className="hidden flex-1 md:block" {...fadeInUp}>
                            <Image
                                src="/assets/imgs/services-bg.png"
                                width={864}
                                height={550}
                                alt="service"
                                className="size-full max-h-[550px] max-w-[864.352294921875px] object-contain"
                            />
                        </motion.div>

                        <motion.div
                            className="flex flex-1 flex-col"
                            {...fadeInUp}
                        >
                            <div className="flex gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 border-2 border-[#817263]" />
                                    <h3 className="text-lg font-semibold text-[#817263]">
                                        {t("experts")}
                                    </h3>
                                </div>

                                <div className="flex gap-1">
                                    <Avatar>
                                        <AvatarImage
                                            src="/assets/imgs/photo-1.jpg"
                                            alt="Consultant"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <Avatar>
                                        <AvatarImage
                                            src="/assets/imgs/photo-2.jpg"
                                            alt="Consultant"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <Avatar>
                                        <AvatarImage
                                            src="/assets/imgs/photo-3.jpg"
                                            alt="Consultant"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-5xl leading-16">
                                    {t("title")}{" "}
                                    <span className="font-semibold">
                                        {t("titleHighlight")}
                                    </span>
                                </h4>

                                <p className="text-lg font-medium">
                                    {t("description")}
                                </p>

                                <Link
                                    href="/contact"
                                    className="flex w-fit items-center gap-3 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] px-8 py-4 text-white"
                                >
                                    <span>{t("consultants")}</span>
                                    <ArrowLeft className="size-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="bg-services relative h-[80vh] py-20">
                <div className="absolute inset-0 size-full bg-black/30" />

                <div className="relative mx-auto h-full max-w-7xl px-4">
                    <div className="flex h-full flex-col justify-between gap-5 sm:flex-row">
                        <div className="space-y-6">
                            <h5 className="text-3xl leading-12 text-white">
                                {t("ctaTitle")}
                            </h5>

                            <h4 className="text-3xl font-bold leading-12 text-white">
                                {t("ctaSubtitle")}
                            </h4>

                            <Link
                                href="/contact"
                                className="flex w-fit items-center gap-3 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] px-8 py-4 text-white"
                            >
                                <span>{t("consultants")}</span>
                                <ArrowLeft className="size-4" />
                            </Link>
                        </div>

                        <div className="h-fit space-y-6 self-end rounded-2xl bg-[#41414126] px-6 py-4 backdrop-blur-2xl">
                            <span className="text-sm text-white">
                                {t("moreThan")}
                            </span>

                            <div className="space-x-2">
                                <span className="text-3xl font-semibold text-white">
                                    500
                                </span>

                                <span className="text-white">
                                    {t("consultations")}
                                </span>
                            </div>

                            <div className="border-t border-white" />

                            <p className="max-w-64 text-base text-white">
                                {t("consultationDescription")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesSec;
