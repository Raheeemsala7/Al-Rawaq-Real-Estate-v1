import Header from '@/shared/components/header'
import React from 'react'

const WebsiteLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default WebsiteLayout