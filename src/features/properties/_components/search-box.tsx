"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Search, MapPin, X } from "lucide-react";
import { LocationType } from "../types/property";



const allLocations: LocationType[] = [
    { governorate: "الإسكندرية", city: "حي شرق", street: "شارع صفوت منصور" },
    { governorate: "الإسكندرية"}, // محافظة فقط
    { governorate: "الجيزة", city: "مدينة 6 أكتوبر", street: "طريق مصر إسكندرية الصحراوي" },
    { governorate: "القاهرة", city: "العاصمة" }, // محافظة فقط
    { governorate: "القاهرة", city: "مدينة نصر" },
    { governorate: "القاهرة", city: "المعادي" },
    { governorate: "القاهرة", city: "الزمالك" },
    { governorate: "القاهرة", city: "مدينة الشروق" },
    { governorate: "كفر الشيخ" }, // محافظة فقط
    { governorate: "المنصورة", city: "حي الجامعة", street: "شارع التحرير" },
    { governorate: "الإسماعيلية", city: "مدينة الإسماعيلية" },
    { governorate: "بورسعيد", city: "حي الزهور", street: "شارع البحر" },
    { governorate: "أسوان", city: "حي النصر" },
    { governorate: "سوهاج", city: "حي الروضة", street: "شارع الجمهورية" },
    { governorate: "الأقصر", city: "حي غرب" },
    { governorate: "أسيوط", city: "مدينة أسيوط" },
    { governorate: "دمياط", city: "حي المنيرة", street: "شارع بورسعيد" },
    { governorate: "الفيوم", city: "مدينة الفيوم" },
    { governorate: "المنوفية", city: "مدينة شبين الكوم" },
    { governorate: "البحيرة", city: "دمنهور" },
];


const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filteredLocations, setFilteredLocations] = useState<LocationType[]>([]);
    const [currentLocation, setLocation] = useState<LocationType[]>([]);

    // const addLocation = useFilterStore((state) => state.addLocation);
    // const removeLocation = useFilterStore((state) => state.removeLocation);
    // const currentLocation = useFilterStore((state) => state.filters.location ?? []);

    const searchRef = useRef<HTMLDivElement | null>(null);



    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (
                searchRef.current &&
                event.target instanceof Node &&
                !searchRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setSearchQuery("");
                if (searchRef.current) {
                    searchRef.current.style.border = "none";
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter locations based on search
    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = allLocations.filter(
                (location) =>
                    location.governorate.includes(searchQuery) ||
                    location.city?.includes(searchQuery) ||
                    location.street?.includes(searchQuery)
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(allLocations);
        }
    }, [searchQuery]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsOpen(true);
    };

    // const handleLocationSelect = (location: LocationType) => {
    //     const exists = currentLocation.some(
    //         (loc) =>
    //             loc.governorate === location.governorate &&
    //             loc.city === location.city &&
    //             loc.street === location.street
    //     );
    //     if (!exists) {
    //         addLocation(location);
    //     }
    //     setSearchQuery("");
    //     setIsOpen(false);
    //     if (searchRef.current) searchRef.current.style.border = "none";
    // };

    const handleRemoveLocation = (locationToRemove: LocationType) => {
        // removeLocation(locationToRemove);
    };

    const handleFocus = () => {
        setIsOpen(true);
        if (searchRef.current) searchRef.current.style.border = "3px solid #766DBB";
    };



    return (
        <div
            className="flex-1 w-full lg:w-auto relative order-1 px-2 flex bg-[#F7F7F7] rounded-full"
            ref={searchRef}
        >
            <div className="flex flex-1 w-full">
                <div className="relative w-full flex items-center focus:border-2 border-indigo-600">
                    <span>
                        <Search className=" w-5 h-5 text-indigo-600" />
                    </span>


                    {/* Selected Tags (Outside - Top) */}
                    {currentLocation.length > 0 && !isOpen && (
                        <div className="w-full lg:w-auto">
                            <div className="flex gap-2">
                                {currentLocation.length === 1 ? <>
                                    <div
                                        className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[#766DBB] text-[#766DBB] rounded-full text-sm"
                                    >
                                        <span>{currentLocation[0].governorate}</span>
                                        <button
                                            onClick={() =>
                                                handleRemoveLocation(currentLocation[0])
                                            }
                                            className="hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5 text-gray-500" />
                                        </button>
                                    </div>

                                </> : <>

                                    <div
                                        className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[#766DBB] text-[#766DBB] rounded-full text-sm"
                                    >
                                        <span>{currentLocation[0].governorate}</span>
                                        <button
                                            onClick={() =>
                                                handleRemoveLocation(currentLocation[0])
                                            }
                                            className="hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5 text-gray-500" />
                                        </button>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[#766DBB] text-[#766DBB] rounded-full text-sm"
                                    >
                                        <span>{currentLocation.length - 1} اكثر</span>
                                        <button
                                            onClick={() =>
                                                handleRemoveLocation(currentLocation[1])
                                            }
                                            className="hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5 text-gray-500" />
                                        </button>
                                    </div>

                                </>}

                            </div>
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="ادخل المدينة أو المنطقة أو اسم البناء..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                        className="flex-1 pr-4 px-5 py-2.5  rounded-full focus:outline-none focus:border-indigo-700 transition-all text-gray-700 placeholder-gray-400 text-sm"
                    />
                </div>
            </div>

            {/* Dropdown Results */}
            {isOpen && (
                <div className="absolute top-8 w-full mt-4 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Selected Tags Inside Dropdown */}
                    {currentLocation.length > 0 && (
                        <div className="p-3 bg-gray-50 border-b border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {currentLocation.map((location, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-full text-sm"
                                    >
                                        <span>
                                            {location.city ? location.city : location.governorate}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleRemoveLocation(location)
                                            }
                                            className="hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5 text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results List */}
                    {filteredLocations.length > 0 ? (
                        <div className="max-h-96 overflow-y-auto">
                            <div className="p-3 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-sm font-bold text-gray-800">
                                    المواقع الحديثة
                                </h3>
                            </div>

                            {filteredLocations.map((location, index) => (
                                <div
                                    key={index}
                                    // onClick={() =>
                                    //     // handleLocationSelect(location)
                                    // }
                                    className="p-4 hover:bg-gray-50 cursor-pointer transition-all border-b border-gray-100 last:border-b-0"
                                >
                                    <div className="flex items-start gap-3 justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-gray-800 mb-1">
                                                {location.city ? (
                                                    location.street ? (
                                                        <>
                                                            {location.street}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {location.city}
                                                        </>
                                                    )
                                                ) : <>
                                                    {location.governorate}
                                                </>}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {location.governorate} {location.city && ""}
                                            </p>
                                        </div>
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 text-sm">
                                لا توجد نتائج
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>



    );
};

export default SearchBox;

