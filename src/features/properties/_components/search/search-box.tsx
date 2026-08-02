"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";


import { LocationType } from "../../types/property";
import LocationDropdown from "./location-dropdown";
import { useDebounce } from "@/shared/lib/use-debounced";
import { allLocations } from "@/shared/lib/constant/location.constant";
import { cn } from "@/shared/lib/utils";
import LocationTag from "./location-tag";
import { useRouter, useSearchParams } from "next/navigation";


export default function SearchBox({ location }: { location: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();
const searchParams = useSearchParams();

    const [locations, setLocations] = useState<LocationType[]>([]);

    const debouncedQuery = useDebounce(query);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                ref.current &&
                !ref.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const filteredLocations = useMemo(() => {
        if (!debouncedQuery.trim()) return allLocations;

        return allLocations.filter((location) =>
            [
                location.governorate,
                location.city,
                location.street,
            ]
                .filter(Boolean)
                .some((item) =>
                    item!
                        .toLowerCase()
                        .includes(debouncedQuery.toLowerCase())
                )
        );
    }, [debouncedQuery]);

    const handleSelect = (location: LocationType) => {
         const params = new URLSearchParams(searchParams.toString());

    params.set("location", location.governorate);

    router.replace(`?${params.toString()}`, {
        scroll: false,
    });

    setQuery("");
    setOpen(false);
    };

    const handleRemove = (location: LocationType) => {
        setLocations((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.governorate === location.governorate &&
                        item.city === location.city &&
                        item.street === location.street
                    )
            )
        );
    };

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex-1 rounded-full bg-[#F7F7F7] transition-all",
                open && "ring-2 ring-[#766DBB]"
            )}
        >
            <div className="flex min-h-14 items-center px-4">
                <Search className="size-5 text-[#766DBB]" />

                {locations.length > 0 && !open && (
                    <div className="mx-3 flex flex-wrap gap-2">
                        {locations.map((location, index) => (
                            <LocationTag
                                key={index}
                                location={location}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                )}

                <input
                    value={query}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    placeholder="ادخل المدينة أو المنطقة..."
                    className="w-full bg-transparent px-3 outline-none"
                />
            </div>

            {open && (
                <LocationDropdown
                    locations={filteredLocations}
                    currentLocations={locations}
                    onSelect={handleSelect}
                />
            )}
        </div>
    );
}