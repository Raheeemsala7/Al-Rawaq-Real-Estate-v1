'use client'
 
import React, { useRef, useState, useEffect } from 'react'
import { Property } from '../types/property'
import { ChevronLeft, ChevronRight, BedDouble, Bath, RulerDimensionLine } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import Image from 'next/image'
 
const RecommendedProperties = ({ properties }: { properties: Property[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
 
    const CARD_WIDTH = 280
    const SCROLL_AMOUNT = CARD_WIDTH + 16
 
    const checkScroll = () => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 0)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }
 
    useEffect(() => {
        if (properties.length <= 3) return
        checkScroll()
        const el = scrollRef.current
        el?.addEventListener('scroll', checkScroll)
        return () => el?.removeEventListener('scroll', checkScroll)
    }, [properties])
 
    const scroll = (dir: 'left' | 'right') => {
        scrollRef.current?.scrollBy({ left: dir === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: 'smooth' })
    }
 
    function toArabicNumbers(input: string | number): string {
        return input.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)])
    }
 
    if (!properties || properties.length === 0) return null
 
    const isCarousel = properties.length > 3
 
    return (
        <div dir="rtl" className="py-4">
            <div className="flex items-center justify-between mb-8">
                <h5 className="text-2xl font-semibold">عقارات مشابهة</h5>
                {isCarousel && (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="w-8 h-8 rounded-full"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="w-8 h-8 rounded-full"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
 
            <div
                ref={scrollRef}
                className={`
                    flex gap-4
                    ${isCarousel
                        ? 'overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                        : 'overflow-visible'
                    }
                `}
            >
                {properties.map((property) => (
                    <div
                        key={property._id}
                        className="border border-border rounded-xl overflow-hidden flex-shrink-0 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        style={{ width: isCarousel ? `${CARD_WIDTH}px` : undefined, flex: isCarousel ? 'none' : '1' }}
                    >
                        {/* Image */}
                        <div className="relative h-44 bg-muted">
                            {property.images?.[0] ? (
                                <Image
                                    src={property.images[0].path}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                                    لا توجد صورة
                                </div>
                            )}
                            <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                                {property.purpose === 'rent' ? 'للإيجار' : 'للبيع'}
                            </span>
                        </div>
 
                        {/* Content */}
                        <div className="p-4">
                            <p className="font-semibold text-base mb-1 truncate">{property.title}</p>
                            <p className="text-xs text-muted-foreground mb-3 truncate">
                                {property.location?.street}، {property.location?.governorate}
                            </p>
 
                            <p className="text-base font-bold mb-3">
                                {toArabicNumbers(property.price.toLocaleString())} EGP
                                {property.purpose === 'rent' && <span className="text-xs font-normal text-muted-foreground"> / شهريا</span>}
                            </p>
 
                            <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3">
                                <span className="flex items-center gap-1">
                                    <BedDouble className="w-3.5 h-3.5 stroke-[1.5px]" />
                                    {property.bedrooms}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Bath className="w-3.5 h-3.5 stroke-[1.5px]" />
                                    {property.bathrooms}
                                </span>
                                <span className="flex items-center gap-1">
                                    <RulerDimensionLine className="w-3.5 h-3.5 stroke-[1.5px]" />
                                    {property.area} م²
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
 
export default RecommendedProperties