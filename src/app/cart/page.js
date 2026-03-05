"use client"
import HomeLayout from '@/app/components/layout/HomeLayout'
import Cart from '@/app/cart/Cart'
import React from 'react'

const page = () => {
    return (
        <HomeLayout>

            <Cart />

        </HomeLayout>
    )
}

export default page;