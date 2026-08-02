import { X } from "lucide-react";
import { LocationType } from "../../types/property";

interface LocationTagProps {
    location: LocationType;
    onRemove: (location: LocationType) => void;
}

export default function LocationTag({
    location,
    onRemove,
}: LocationTagProps) {
    const label =
        location.street ??
        location.city ??
        location.governorate;

    return (
        <div className="flex items-center gap-2 rounded-full border border-[#766DBB] px-3 py-1.5 text-sm text-[#766DBB]">
            <span>{label}</span>

            <button
                onClick={() => onRemove(location)}
                className="rounded-full hover:bg-gray-100"
            >
                <X className="size-3.5" />
            </button>
        </div>
    );
}