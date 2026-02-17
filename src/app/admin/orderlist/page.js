
import SideBar from '@/components/AdminPage/SideBar'
import TopBar from '@/components/AdminPage/TopBar'
import OderList from '@/pages/AdminPage/OrderList'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-start '>
            <div className='w-[25%]'>
                <SideBar />

            </div>
            <div className='w-[75%]'>

                <TopBar />
                <OderList />

            </div>
        </div>
    )
}

export default page