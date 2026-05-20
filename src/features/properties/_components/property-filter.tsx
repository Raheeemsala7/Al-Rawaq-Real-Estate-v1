"use client"

import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import SearchBox from "./search-box";
import { useRouter, useSearchParams } from "next/navigation";


const PropertyFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // القيم الحالية من الـ URL
    const purpose = searchParams.get("purpose") || "";
    const type = searchParams.get("type") || "";
    const rooms = searchParams.get("rooms") || "";
    const price = searchParams.get("price") || "";

    const updateFilter = (key: string, value: string) => {

        const params = new URLSearchParams(searchParams.toString());

        console.log(key, value)

        params.set(key, value);

        router.push(`?${params.toString()}`);
    };



    return (
        <div className="flex items-center relative max-w-7xl mx-auto p-4">
            <div className='flex-1 w-full me-4'>
                <SearchBox />
            </div>

            <div className='flex items-center gap-4'>
                {/* Purpose */}
                <Select
                    value={purpose}
                    onValueChange={(value) =>
                        updateFilter("purpose", value ?? "")
                    }
                >
                    <SelectTrigger className='flex rtl:flex-row-reverse'>
                        <SelectValue placeholder="الغرض" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sale">للبيع</SelectItem>
                        <SelectItem value="rent">للإيجار</SelectItem>
                    </SelectContent>
                </Select>

                {/* Type */}
                <Select
                    value={type}
                    onValueChange={(value) =>
                        updateFilter("type", value ?? "")
                    }
                >
                    <SelectTrigger className='flex rtl:flex-row-reverse' >
                        <SelectValue placeholder="نوع العقار" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="apartment">شقة</SelectItem>
                        <SelectItem value="villa">فيلا</SelectItem>
                        <SelectItem value="house">منزل</SelectItem>
                        <SelectItem value="land">أرض</SelectItem>
                        <SelectItem value="office">مكتب</SelectItem>
                        <SelectItem value="store">محل تجاري</SelectItem>
                    </SelectContent>
                </Select>

                {/* Rooms */}
                <Select >
                    <SelectTrigger className='flex rtl:flex-row-reverse' >
                        <SelectValue placeholder="غرف وحمامات" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                </Select>

                {/* Price */}
                <Select>
                    <SelectTrigger className='flex rtl:flex-row-reverse' >
                        <SelectValue placeholder="السعر" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-500000">أقل من 500 ألف</SelectItem>
                        <SelectItem value="500000-1000000">من 500 ألف إلى مليون</SelectItem>
                        <SelectItem value="1000000-2000000">من مليون إلى 2 مليون</SelectItem>
                        <SelectItem value="2000000+">أكثر من 2 مليون</SelectItem>
                    </SelectContent>
                </Select>
                {/* Price */}
                {/* <PriceRangeSelect /> */}

                {/* Search Button (اختياري، يمكن حذفه إذا تريد request مباشرة عند تغيير Select) */}
                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-2xl">
                    ابحث
                </Button>
            </div>


        </div>
    );
};

export default PropertyFilter;
