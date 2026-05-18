import PropertyFilter from '@/features/properties/_components/property-filter'
import { PropertyList } from '@/features/properties/_components/property-list'
import React from 'react'

const PropertiesPge = () => {
  return (
    <main>
        <PropertyFilter />
        <PropertyList />
    </main>
  )
}

export default PropertiesPge