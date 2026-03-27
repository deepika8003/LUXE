import HomeLayout from '@/app/components/layout/HomeLayout'
import React from 'react'
import Rewards from './Rewards'

const page = () => {
    return (
        <div><HomeLayout>
            <Rewards />
        </HomeLayout></div>
    )
}

export default page