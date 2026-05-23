import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import PropertyCard from '@/features/properties/_components/property-card'
import { getFeatureProperties } from '@/features/properties/apis/properties.api'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel'




const CarouselProperties = async () => {

    const properties = await getFeatureProperties()
    if (!properties.success) {
        return <p>حدث خطأ فني</p>
    }

    console.log(properties.data.length)

    return (
        <Carousel
            className="relative w-full flex flex-col  gap-4 rtl:[direction:ltr] mt-16"
            opts={{
                align: "start",        // يخلي العناصر تبدأ من اليسار
                slidesToScroll: 1,     // كام عنصر يتحرك مع كل ضغطة
            }
            }
        >
            <CarouselContent>
                {properties.data.map((property) => (
                    <CarouselItem className='basis-1/1 md:basis-1/2  lg:basis-1/3 ps-1 lg:ps-4' key={property._id}
                    >
                        <PropertyCard
                            property={property}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="flex items-center justify-between gap-6 rtl:[direction:rtl] mt-12">
                <div className="flex gap-6">
                    <CarouselPrevious className="static w-20 h-16 rounded-full border border-[#302D2B] rtl:rotate-180" />
                    <CarouselNext className="static w-20 h-16 rounded-full border border-[#302D2B] rtl:rotate-180" />
                </div>
                <Link href={"/properties"} className='p-4 rounded-full text-base border border-[#7D6D5E26] flex items-center gap-4'>
                    <span>جميع العقارات المتاحة</span>
                    <ArrowLeftIcon className='size-6' />
                </Link>
            </div>
        </Carousel>
    )
}

export default CarouselProperties