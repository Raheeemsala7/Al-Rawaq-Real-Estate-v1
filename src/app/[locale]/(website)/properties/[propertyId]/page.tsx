import "leaflet/dist/leaflet.css";

import PricePerformanceSection from '@/features/properties/_components/price-performance-section'
import { PropertyGallery } from '@/features/properties/_components/PropertyGallery'
import PropertyMapModal from '@/features/properties/_components/PropertyMapModal'
import RecommendedProperties from '@/features/properties/_components/recommended-properties'
import { getSinglePropertyApi } from '@/features/properties/apis/properties.api'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'
import { Bath, BedDouble, Castle, HousePlusIcon, MessageCircle, Phone, RulerDimensionLine, Shield } from 'lucide-react'
import Link from 'next/link'

const PropertyPage = async ({ params }: { params: Promise<{ propertyId: string }> }) => {
    const { propertyId } = await params

    const propertyData = await getSinglePropertyApi(propertyId)

    if (!propertyData.success) {
        return <p>{propertyData.message ?? "حدث خطأ"}</p>
    }
    const property = propertyData.data.property
    const relatedProperties = propertyData.data.relatedProperties

    const adreesLocationOnMap = `${property.location.street} , ${property.location.city} , ${property.location.governorate} `


    function toArabicNumbers(input: string | number): string {
        return input.toString().replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
    }

    return (
        <section className='mt-8'>
            <div className="max-w-7xl mx-auto px-4">

                <PropertyGallery images={property.images} />

                <div className=' grid grid-cols-1  md:grid-cols-3  mt-8'>
                    <div className='p-4 flex-1  col-span-2'>
                        <div className='flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between items-center w-full'>
                            <h4 className={` text-3xl md:text-4xl font-bold`} style={{ direction: 'ltr' }}> {toArabicNumbers(property.price)} {property.purpose === "rent" ? "/ شهريا " : ""} EGP</h4>
                            <div className="flex gap-4">
                                <div className='flex flex-col items-center'>
                                    <BedDouble className='font-medium stroke-[1.6px]' />
                                    <span>{property.bedrooms} غرف نوم</span>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <Bath className='font-medium stroke-[1.6px]' />
                                    <span>{property.bathrooms} حمّامات</span>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <RulerDimensionLine className='font-medium stroke-[1.6px]' />
                                    <span>٢٬٢٦٠ قدم مربع / {property.area} متر</span>
                                </div>
                            </div>
                        </div>

                        <Separator className='h-[0.75px] my-6' />


                        <div className='pt-2'>
                            <p className='text-[#707070] text-base'> شقه {property.purpose === "rent" ? " للايجار " : ""} في {property.location.governorate} , {property.location.street} </p>
                            <h4 className='text-2xl font-medium'>{property.title}</h4>
                            <p className='mt-6 mb-12 leading-8'>{property.description}</p>
                        </div>

                        <Separator className='h-[0.75px] my-6' />


                        <div className='py-4'>
                            <h5 className='mb-12 text-2xl font-semibold'>تفاصيل العقار</h5>
                            <div className="grid grid-cols-2 gap-4">
                                <div className='grid grid-cols-2 items-center'>
                                    <div className="flex items-center gap-2">
                                        <HousePlusIcon className='text-[#333] stroke-1' style={{ stroke: "#333" }} />
                                        <span className='text-[#333]'> نوع العقار</span>
                                    </div>
                                    <h6 className='font-semibold'>{property.type === "apartment" ? "شقه" : "محل"}</h6>
                                </div>
                                <div className='grid grid-cols-2 items-center'>
                                    <div className="flex items-center gap-2">
                                        <RulerDimensionLine className='font-medium stroke-1' />
                                        <span className='text-[#333]'> نوع العقار</span>
                                    </div>
                                    <h6 className='font-semibold'>٢٬٢٦٠ قدم مربع / {property.area} متر</h6>
                                </div>
                                <div className='grid grid-cols-2 items-center'>
                                    <div className="flex items-center gap-2">
                                        <BedDouble className='font-medium stroke-1' />
                                        <span className='text-[#333]'>عدد غرف النوم</span>
                                    </div>
                                    <h6 className='font-semibold'>{property.bedrooms}</h6>
                                </div>
                                <div className='grid grid-cols-2 items-center'>
                                    <div className="flex items-center gap-2">
                                        <Bath className='font-medium stroke-1' />
                                        <span className='text-[#333]'>الحمامات</span>
                                    </div>
                                    <h6 className='font-semibold'>{property.bathrooms}</h6>
                                </div>
                            </div>
                        </div>


                        <Separator className='!h-[0.75px] my-6' />


                        <div className='py-4 mb-6'>
                            <h5 className='mb-12 text-2xl font-semibold'>مزايا</h5>
                            <div className="grid grid-cols-2 gap-y-4">
                                <div className="flex items-center gap-2">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7 13V7.5C7 4.46243 9.46243 2 12.5 2C15.5376 2 18 4.46243 18 7.5V13H19.0854H20.5C20.7761 13 21 12.7761 21 12.5C21 12.2239 20.7761 12 20.5 12H20V11H20.5C21.3284 11 22 11.6716 22 12.5C22 13.1531 21.5826 13.7087 21 13.9146V20C21 20.5523 20.5523 21 20 21H18C18 21.5523 17.5523 22 17 22H8C7.44771 22 7 21.5523 7 21H5C4.44772 21 4 20.5523 4 20V13.9146C3.4174 13.7087 3 13.1531 3 12.5C3 11.6716 3.67157 11 4.5 11L5 11.02V12H4.5C4.22386 12 4 12.2239 4 12.5C4 12.7761 4.22386 13 4.5 13H5.91465H7ZM17 10.02V7.5C17 5.18459 15.2513 3.27762 13.0025 3.02775C13.0023 3.04165 13.0021 3.05553 13.0019 3.0694C13.0722 7.43923 14.9494 9.72772 17 10.02ZM12.502 6.53763C11.672 9.296 9.91422 10.8222 8 11.0281V13H17V11.0276C15.0873 10.82 13.3314 9.29405 12.502 6.53763ZM12.0015 3.0273C9.75081 3.27533 8 5.1832 8 7.5V10.0206C10.0521 9.73074 11.9318 7.44211 12.0021 3.0694C12.0019 3.05538 12.0017 3.04135 12.0015 3.0273ZM8 14H5V19.75C5 19.8881 5.11193 20 5.25 20H19.75C19.8881 20 20 19.8881 20 19.75V14H17V20H16V14H13V20H12V14H9V20H8V14Z" fill="currentColor"></path></svg>
                                    </span>
                                    <p className='text-[#333] font-normal'>شرفة</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>
                                        <Shield className='stroke-1' />
                                    </span>
                                    <p className='text-[#333] font-normal'>حارس أمن</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>
                                        <Castle className='stroke-1' />
                                    </span>
                                    <p className='text-[#333] font-normal'>ردهة في المبنى</p>
                                </div>
                            </div>
                        </div>

                        <PropertyMapModal address={adreesLocationOnMap} coordinates={property.location.coordinates || { lat: 0, lng: 0 }} />
                        <Separator className='!h-[0.75px] my-6' />

                        <PricePerformanceSection
                            priceDiffPercent={25}
                            sizeDiffPercent={23}
                            avgPrice={60000}
                            avgArea={180}
                            agentName={property.listedBy.name}
                            agencyName="Global Marketing Real Estate"
                            agencyListingsCount={1650}
                            bedroomsCount={property.bedrooms}
                            city={property.location.governorate}
                        />

                        <Separator className='!h-[0.75px] my-6' />

                        <div className='py-4 mb-6'>
                            <RecommendedProperties properties={relatedProperties} />
                        </div>




                    </div>
                    <Card className="sticky top-6 p-0 h-fit hidden md:flex">
                        <CardContent className="pt-8 pb-4 px-0">
                            <div className="flex justify-center items-center flex-col gap-2 p-4 bg-muted mb-5">
                                <p className="text-sm text-foreground font-medium mb-1">طريقة الدفع</p>
                                <p className="text-sm text-muted-foreground capitalize"> {property.paymentMethod === "cash" ? "نقداً" : "تقسيط"}</p>
                            </div>
                            <div className="flex gap-3 px-4">
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    className=" flex-1 gap-2 text-base cursor-pointer"
                                >
                                    <Phone className="h-5 w-5" />
                                    اتصل الان
                                </Button>
                                <Button
                                    size="lg"
                                    className="flex-1 gap-2 text-base cursor-pointer bg-[#4DBD43] hover:bg-[#4DBD47] text-white"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    واتس أب
                                </Button>
                            </div>

                        </CardContent>
                    </Card>


                    <div className='flex gap-4 md:hidden sticky bottom-0 w-full py-4 bg-white  z-99'>
                        <Link href={""} className={cn(buttonVariants({ variant: "destructive" }), "flex-1")}>
                            <Phone />
                            <span>اتصل الان</span>
                        </Link>
                        <Link href={""} className={cn(buttonVariants(), "flex-1 bg-[#4DBD43]")}>
                            <Phone />
                            <span>واتس أب</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default PropertyPage