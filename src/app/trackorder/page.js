import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import TrackOrder from '@/pages/trackorder/TrackOrder'
import React from 'react'

const page = () => {
    return (
        <div>
            <Nav />
            <TrackOrder />
            <Footer />
        </div>
    )
}

export default page