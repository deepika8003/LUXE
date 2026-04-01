
import HomeLayout from '@/app/components/layout/HomeLayout'
import React from 'react'
import AccountEdit from './AccountEdit'

const page = () => {
    return (
        <div>
            <HomeLayout>
                <AccountEdit />
            </HomeLayout>
        </div>
    )
}

export default page