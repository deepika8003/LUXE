import AdminLayout from '@/app/components/layout/AdminLayout'
import React from 'react'
import Customers from './Customers'


const page = () => {
    return (
        <AdminLayout>
            <Customers />
        </AdminLayout>
    )
}

export default page