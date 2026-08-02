import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

const PropertyCardSkeleton = () => {
    return (
        <Card className="overflow-hidden border border-[#7D6D5E26] rounded-2xl p-2">
            {/* Image */}
            <Skeleton className="w-full h-[300px] rounded-t-2xl" />

            <div className="px-1 lg:px-4 mt-4 rtl:[direction:rtl]">
                {/* Badges */}
                <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-9 w-20 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                </div>

                {/* Title + Price */}
                <div className="flex justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <Skeleton className="h-11 flex-1 rounded-full" />
                    <Skeleton className="h-11 w-11 rounded-full" />
                </div>
            </div>
        </Card>
    );
};

export default PropertyCardSkeleton;