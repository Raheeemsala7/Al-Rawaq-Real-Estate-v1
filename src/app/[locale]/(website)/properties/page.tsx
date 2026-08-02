import PropertyFilter from '@/features/properties/_components/property-filter'
import { PropertyList } from '@/features/properties/_components/property-list'
import PropertiesCardsSkeleton from '@/features/properties/_components/skeleon/properties-cards.skeleton'
import { ParamsProperties } from '@/features/properties/types/property';
import { Suspense } from 'react'

interface PropertiesPageProps {
  searchParams: Promise<ParamsProperties>;
}

const PropertiesPge = async ({ searchParams }: PropertiesPageProps) => {
  const filters = await searchParams;

  return (
    <main>
      <PropertyFilter filters={filters} />
      <Suspense key={JSON.stringify(filters)} fallback={<PropertiesCardsSkeleton />}>
        <PropertyList filters={filters} />
      </Suspense>
    </main>
  )
}

export default PropertiesPge