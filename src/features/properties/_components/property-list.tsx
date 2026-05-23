"use client"

import { useGetInfinteProperties } from "../hooks/property-hook";
import { useMemo } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import PropertyCard from "./property-card";

export function PropertyList() {
    const { data, isLoading , fetchNextPage , hasNextPage } = useGetInfinteProperties();
    const allProperties = useMemo(() => data?.pages.flatMap((page) => page.data ?? []) ?? [], [data])

    if (isLoading) return <div className="text-center p-4">جاري التحميل...</div>;
    if (!data || allProperties.length === 0) return <div className="text-center p-4">لا توجد نتائج مطابقة</div>;

    return (

        <InfiniteScroll
            dataLength={allProperties.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<p>Loading...</p>}
            endMessage={<p style={{ textAlign: 'center' }}>All items loaded.</p>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
        >
            {allProperties.map((property) => (
                <PropertyCard property={property} />
            ))}
        </InfiniteScroll>
    );
}