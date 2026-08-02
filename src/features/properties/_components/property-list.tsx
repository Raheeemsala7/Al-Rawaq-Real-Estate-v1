
import { getAllProperties } from "../apis/properties.api";
import PropertyCard from "./property-card";

export async function PropertyList() {
    const allProperties = await getAllProperties({ limit: 6 })

    // if (isLoading) return <div className="text-center p-4">جاري التحميل...</div>;
    // if (!data || allProperties.length === 0) return <div className="text-center p-4">لا توجد نتائج مطابقة</div>;

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
        >
            {allProperties.data.map((property) => (
                <PropertyCard key={property._id} property={property} />
            ))}
        </div>
    );
}