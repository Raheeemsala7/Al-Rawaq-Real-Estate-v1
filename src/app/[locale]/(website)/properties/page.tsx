import PropertyFilter from '@/features/properties/_components/property-filter'
import { PropertyList } from '@/features/properties/_components/property-list'
import PropertiesCardsSkeleton from '@/features/properties/_components/skeleon/properties-cards.skeleton'
import { Suspense } from 'react'

const PropertiesPge = () => {
  return (
    <main>
      <PropertyFilter />
      <Suspense fallback={<PropertiesCardsSkeleton />}>
        <PropertyList />
      </Suspense>
    </main>
  )
}

export default PropertiesPge