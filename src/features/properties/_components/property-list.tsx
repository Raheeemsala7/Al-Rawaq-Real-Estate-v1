"use client"

import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetInfinteProperties } from "../hooks/property-hook";
import { useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

export function PropertyList() {

    const { data, isLoading } = useGetInfinteProperties();

    // const allProperties = useMemo(() => data?.pages.flatMap((page) => page.data ?? []) ?? [], [data])
    const allProperties = data

    if (isLoading) return <div className="text-center p-4">جاري التحميل...</div>;


    console.log(allProperties)

    if (!data || allProperties.length === 0) return <div className="text-center p-4">لا توجد نتائج مطابقة</div>;



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {allProperties.map((property) => (
                <Link key={property._id} href={`/properties/${property._id}`}>
                    <Card className="group overflow-hidden bg-white h-full hover:shadow-xl transition-all duration-300 border-1 border-[#7D6D5E26] rounded-2xl p-2">
                        <div className="relative">
                            <div className=" overflow-hidden rounded-t-2xl">
                                <Image
                                    src={property.images?.[0].path || "/placeholder.svg"}
                                    alt={property.title}
                                    width={400}
                                    height={300}
                                    className="w-full max-h-[350px] object-cover  group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>


                            {/* Heart icon */}
                        </div>

                        <div className="px-1 lg:px-4 rtl:[direction:rtl]" >
                            {/* Property details icons */}
                            <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                                <Badge className="flex items-center gap-2 py-2 px-3 rounded-full bg-[#FBF9F7] text-[#302D2B] text-sm">
                                    <Bed className="h-4 w-4" />
                                    <span className="font-medium"></span>
                                </Badge>
                                <Badge className="flex items-center gap-2 py-2 px-3 rounded-full bg-[#FBF9F7] text-[#302D2B] text-sm">
                                    <Bath className="h-4 w-4" />
                                    <span className="font-medium">3</span>
                                </Badge>
                                <Badge className="flex items-center gap-2 py-2 px-3 rounded-full bg-[#FBF9F7] text-[#302D2B] text-sm">
                                    <Square className="h-4 w-4" />
                                    <span className="font-medium">{property.area}m²</span>
                                </Badge>
                            </div>


                            <div className="flex  justify-between gap-2">
                                <div>
                                    {/* Title */}
                                    <h3 className="font-bold text-xl text-[#302D2B] mb-2 text-balance">{property.title}</h3>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-[#8B8D98]">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm">{property.location.city}</span>
                                    </div>
                                </div>
                                {/* Price */}
                                <div className="flex flex-col justify-between items-center">
                                    <span className="text-lg font-bold text-[#302D2B] flex whitespace-nowrap">
                                        {property.price.toLocaleString()} EGP
                                    </span>

                                    <span className="text-sm text-[#8B8D98]">
                                        {property.purpose}
                                    </span>
                                </div>
                            </div>

                            {/* Action button */}
                            <div className="flex gap-4 items-center mt-6">
                                <Button className="flex-1  bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white rounded-full py-3 font-medium ">
                                    عرض التفاصيل
                                </Button>

                                {/* Heart icon */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className=" bg-white/90 hover:bg-white text-gray-600 rounded-full h-10 w-10"
                                >
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
}