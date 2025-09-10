import { FaBus, FaProductHunt, FaUsers, FaWallet } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdFastfood } from 'react-icons/md';


const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })

    console.log(stats);

    return (
        <div>
            <h1 className='text-3xl'>
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user?.displayName : 'Back!'
                }
            </h1>
            <div>
                <div className="stats shadow">
                    <div className="stat place-items-center flex justify-center items-center gap-4">
                        <div className="stat-title"> <FaWallet className='text-3xl'></FaWallet> </div>
                        <div className='flex flex-col justify-center items-start'>
                            <div className="stat-value">${stats?.revenue?.toFixed(2) || '0.00'}</div>
                            <div className="stat-desc text-2xl">Revenue </div>
                        </div>
                    </div>
                    <div className="stat place-items-center flex justify-center items-center gap-4">
                        <div className="stat-title"> <FaUsers className='text-3xl'></FaUsers>  </div>
                        <div className='flex flex-col justify-center items-start'>
                            <div className="stat-value"> {stats?.users} </div>
                            <div className="stat-desc text-2xl">Customers </div>
                        </div>
                    </div>
                    <div className="stat place-items-center flex justify-center items-center gap-4">
                        <div className="stat-title"> <MdFastfood className='text-3xl'></MdFastfood> </div>
                        <div className='flex flex-col justify-center items-start'>
                            <div className="stat-value"> {stats?.menuItems} </div>
                            <div className="stat-desc text-2xl">Products </div>
                        </div>
                    </div>
                    <div className="stat place-items-center flex justify-center items-center gap-4">
                        <div className="stat-title"> <FaBus className='text-3xl'></FaBus> </div>
                        <div className='flex flex-col justify-center items-start'>
                            <div className="stat-value"> {stats?.orders} </div>
                            <div className="stat-desc text-2xl">Orders </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminHome;
