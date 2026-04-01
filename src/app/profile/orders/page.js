
import HomeLayout from '@/app/components/layout/HomeLayout'
import React from 'react'
import Orders from './Orders'

const page = () => {
    return (
        <div>
            <HomeLayout>
                <Orders />
            </HomeLayout>
        </div>
    )
}

export default page