import Product from '@/pages/ProductDetails/Product'
import ProductCard from '@/components/ProductCard'
import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const page = () => {
    return (
        <div>
            <Nav />
            <Product />
            <Footer />

        </div >
    )
}

export default page

