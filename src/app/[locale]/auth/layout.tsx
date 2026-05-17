import React from 'react'

const authLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen bg-[#FBF9F7] flex items-center justify-center p-4'>
            <div className="w-full max-w-md">
                <div className=" !bg-card rounded-lg p-8 shadow-2xl">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default authLayout