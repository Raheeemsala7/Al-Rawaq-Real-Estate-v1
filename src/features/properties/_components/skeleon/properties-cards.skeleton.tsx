import PropertyCardSkeleton from './property-card.skeleton'

export default function PropertiesCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
            ))}
        </div>
    )
}
