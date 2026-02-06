import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import Cart from '@/pages/Cart/Cart'
import React from 'react'

const page = () => {
    return (
        <div>
            <Nav />
            <Cart />
            <Footer />
        </div>
    )
}

export default page