
import { getAllProperties } from "../apis/properties.api";
import { ParamsProperties } from "../types/property";
import PaginationProperties from "./pagination-properties";
import PropertyCard from "./property-card";

export async function PropertyList({ filters }: { filters: ParamsProperties }) {
    const allProperties = await getAllProperties({ ...filters })

    if (!allProperties.data.length) return <div className="text-center p-4 h-64 flex items-center justify-center">لا توجد نتائج مطابقة</div>;



    return (
        <div className="space-y-2">
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
            >
                {allProperties.data.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
            {allProperties.metadata.totalPages > 1 && (
                <PaginationProperties page={allProperties.metadata.currentPage} totalPages={allProperties.metadata.totalPages} />
            )}
        </div>
    );
}