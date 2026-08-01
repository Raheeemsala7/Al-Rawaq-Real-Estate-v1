import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/header'
import React from 'react'

const WebsiteLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default WebsiteLayout