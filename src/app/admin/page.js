import AdminProduct from '@/pages/AdminPage/AdminProduct'
import TopBar from '@/pages/AdminPage/TopBar'
import Product from '@/pages/ProductDetails/Product'
import React from 'react'

const page = () => {
    return (
        <div className=''>
            <TopBar />
           <AdminProduct/>
        </div>
    )
}

export default page