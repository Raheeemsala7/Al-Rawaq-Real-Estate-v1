import { MapPin } from "lucide-react";
import { LocationType } from "../../types/property";

interface LocationDropdownProps {
    locations: LocationType[];
    currentLocations: LocationType[];
    onSelect: (location: LocationType) => void;
}

export default function LocationDropdown({
    locations,
    currentLocations,
    onSelect,
}: LocationDropdownProps) {
    const getLabel = (location: LocationType) =>
        location.street ??
        location.city ??
        location.governorate;

    return (
        <div className="absolute top-full mt-3 w-full overflow-hidden rounded-xl border bg-white shadow-xl z-50">
            {currentLocations.length > 0 && (
                <div className="border-b bg-gray-50 p-3">
                    <h3 className="text-sm font-semibold">
                        المواقع المختارة
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {currentLocations.map((location, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-[#F2F0FF] px-3 py-1 text-sm text-[#766DBB]"
                            >
                                {getLabel(location)}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {locations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    لا توجد نتائج
                </div>
            ) : (
                <div className="max-h-96 overflow-y-auto">
                    {locations.map((location, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onSelect(location)}
                            className="flex w-full items-start justify-between border-b p-4 text-start transition hover:bg-gray-50"
                        >
                            <div>
                                <p className="font-medium">
                                    {getLabel(location)}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {location.governorate}
                                </p>
                            </div>

                            <MapPin className="size-5 text-gray-400" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}