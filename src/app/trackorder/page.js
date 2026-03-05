"use client"
import HomeLayout from '@/app/components/layout/HomeLayout'
import TrackOrder from '@/app/trackorder/TrackOrder'
import React from 'react'

const page = () => {
    return (
        <HomeLayout>

            <TrackOrder />

        </HomeLayout>
    )
}

export default page