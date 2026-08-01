"use client";

import { ArrowLeft, Quote } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ReviewItem {
    id: number;
    name: string;
    description: string;
    jobTitle: string;
    image: string;
}

const ReviewsSec = () => {
    // Translation
    const t = useTranslations("reviews");

    // Variables
    const reviewClients = t.raw("items") as ReviewItem[];

    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    <div className="flex flex-1 flex-col justify-between gap-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-14 border-2 border-[#817263]" />
                                <h3 className="text-lg font-semibold text-[#817263]">
                                    {t("experts")}
                                </h3>
                            </div>

                            <h5 className="max-w-[345px] text-4xl leading-12">
                                {t("title")}{" "}
                                <span className="font-semibold">
                                    {t("titleHighlight")}
                                </span>
                            </h5>
                        </div>

                        <Link
                            href="/contact"
                            className="flex w-fit items-center gap-3 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] px-8 py-4 text-white"
                        >
                            <span>{t("button")}</span>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </div>

                    <div className="flex-1">
                        <Carousel
                            className="relative flex w-full gap-4 rtl:[direction:ltr]"
                            opts={{
                                align: "start",
                                slidesToScroll: 1,
                            }}
                        >
                            <CarouselContent className="!ml-0">
                                {reviewClients.map((review) => (
                                    <CarouselItem
                                        key={review.id}
                                        className="basis-1/1"
                                    >
                                        <ReviewClientCard review={review} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <div className="absolute bottom-7 ltr:right-9 rtl:left-9 flex h-12 w-36 gap-4">
                                <CarouselPrevious className="static h-8 w-12 rounded-full border border-[#302D2B] bg-transparent p-6" />
                                <CarouselNext className="static h-8 w-12 rounded-full border border-[#302D2B] bg-transparent p-6" />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSec;

const ReviewClientCard = ({
    review,
}: {
    review: ReviewItem;
}) => {
    return (
        <Card className="bg-[#FBF9F7] p-0 rtl:[direction:rtl]">
            <CardContent className="p-4">
                <span className="p-4">
                    <Quote />
                </span>

                <div className="space-y-6">
                    <p className="text-[#8B8D98]">
                        {review.description}
                    </p>

                    <div className="border-t border-[#8B8D9826]" />

                    <div className="flex items-center gap-2">
                        <Avatar className="size-14">
                            <AvatarImage
                                src={review.image}
                                alt={review.name}
                            />
                            <AvatarFallback>
                                {review.name
                                    .split(" ")
                                    .slice(0, 2)
                                    .map((word) => word[0])
                                    .join(" ")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">
                            <h6>{review.name}</h6>

                            <p className="text-sm text-[#8B8D98]">
                                {review.jobTitle}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};