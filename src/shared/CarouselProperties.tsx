import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import PropertyCard from '@/features/properties/_components/property-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel'
import { getFeatureProperties } from '@/features/properties/apis/properties.api'
import { getLocale } from 'next-intl/server'
import { cn } from './lib/utils'




const CarouselProperties = async ({ propertiesAvailableText }: { propertiesAvailableText: string }) => {
    const locale = await getLocale()
    const properties = await getFeatureProperties()
    if (!properties.success) {
        return <p>حدث خطأ فني</p>
    }

    return (
        <Carousel
            className="relative w-full flex flex-col  gap-4 rtl:[direction:ltr] mt-16"
            opts={{
                slidesToScroll: 1,     // 1 item per slide
                align: "start",        // Start align items 
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
                    <CarouselPrevious className="static w-20 h-16 rounded-full border border-border hover:bg-muted transition-colors rtl:rotate-180" />
                    <CarouselNext className="static w-20 h-16 rounded-full border border-border hover:bg-muted transition-colors rtl:rotate-180" />
                </div>
                <Link href={"/properties"} className={cn('p-4 rounded-full text-base border border-border flex items-center gap-4 hover:bg-muted transition-colors', locale === 'en' ? 'flex-row-reverse' : 'flex-row')}>
                    <span>{propertiesAvailableText}</span>
                    <ArrowLeftIcon className='size-6' />
                </Link>
            </div>
        </Carousel>
    )
}

export default CarouselProperties