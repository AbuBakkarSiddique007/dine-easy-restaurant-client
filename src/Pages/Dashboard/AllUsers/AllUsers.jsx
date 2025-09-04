import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data
        }
    })


    return (
        <div>
            <div>
                <SectionTitles
                    heading="All Users"
                    subHeading="How Many?"
                >
                </SectionTitles>
            </div>

            <div>

                <div className='text-2xl font-bold'>
                    Total Users: {users.length}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
