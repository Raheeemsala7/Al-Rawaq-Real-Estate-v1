"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BedDouble, Bath, MapPin } from "lucide-react"

/**
 * ScrollRevealCard — Wow Factor A
 *
 * A property card that "floats up" from the lower corner of the hero section
 * as the user begins to scroll. Linked to the scroll position of the hero
 * section wrapper via Framer Motion's useScroll + useTransform.
 *
 * This creates a parallax reveal effect: the card starts below the viewport
 * bottom-right corner, then smoothly rises and fades in as the user scrolls
 * into the Features section. The motion is spring-smoothed to feel physical.
 */

import { Property } from "@/features/properties/types/property";

interface ScrollRevealCardProps {
    /** A real featured property to showcase — passed in from a Server Component */
    property: Property;
}

export default function ScrollRevealCard({ property }: ScrollRevealCardProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll within the parent container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    // Spring for smooth, physical motion
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        restDelta: 0.001,
    })

    // Map scroll progress to visual properties
    const y          = useTransform(smoothProgress, [0, 0.5], [120, 0])
    const opacity    = useTransform(smoothProgress, [0, 0.35], [0, 1])
    const scale      = useTransform(smoothProgress, [0, 0.5], [0.92, 1])
    const rotate     = useTransform(smoothProgress, [0, 0.5], [-3, 0])

    const priceFormatted = new Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "SAR",
        maximumFractionDigits: 0,
    }).format(property.price)

    return (
        // The ref is on the parent so we track when this section enters the viewport
        <div ref={containerRef} className="pointer-events-none absolute inset-0">
            <motion.div
                style={{ y, opacity, scale, rotate }}
                className={[
                    "pointer-events-auto",
                    "absolute bottom-8 end-8",           // logical positioning — RTL flips to left
                    "w-72 rounded-2xl overflow-hidden",
                    "bg-card border border-border",
                    "shadow-2xl shadow-black/20",
                    "dark:shadow-black/60",
                ].join(" ")}
                aria-label="Featured property preview"
            >
                {/* Property image */}
                <div className="relative h-40 w-full overflow-hidden">
                    <Image
                        src={property.images?.[0]?.path || "/assets/imgs/services-bg.png"}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="288px"
                    />
                    {/* Purpose badge */}
                    <span className="absolute top-3 start-3 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] px-3 py-1 text-xs font-semibold text-white shadow">
                        {property.purpose === "sale" ? "للبيع" : "للإيجار"}
                    </span>
                </div>

                {/* Card body */}
                <div className="p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                        {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#A89989]" />
                        <span className="line-clamp-1">{property.location.city}, {property.location.governorate}</span>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {property.bedrooms !== undefined && (
                            <span className="flex items-center gap-1">
                                <BedDouble className="h-3.5 w-3.5" />
                                {property.bedrooms}
                            </span>
                        )}
                        {property.bathrooms !== undefined && (
                            <span className="flex items-center gap-1">
                                <Bath className="h-3.5 w-3.5" />
                                {property.bathrooms}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-border">
                        <span className="text-sm font-bold text-[#7D6D5E] dark:text-[#C4AFA0]">
                            {priceFormatted}
                        </span>
                        <Link
                            href={`/properties/${property._id}`}
                            className="flex items-center gap-1 text-xs font-medium text-[#7D6D5E] hover:text-[#A89989] transition-colors"
                        >
                            <span>التفاصيل</span>
                            <ArrowLeft className="h-3 w-3 ltr:rotate-180 rtl:rotate-0" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
