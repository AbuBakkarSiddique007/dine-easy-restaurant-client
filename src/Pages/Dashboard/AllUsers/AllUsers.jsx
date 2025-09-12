import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import { FaUsers } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data
        }
    })
    // console.log(users);
    // Email, Name


    const handleDeleteUser = (user) => {
        // console.log("clicked delete btn", user);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <div>
            <div>
                <SectionTitles
                    heading="All Users"
                    subHeading="How Many?"
                >
                </SectionTitles>
            </div>

            <div className='bg-white py-2 px-8'>

                <div className='text-2xl font-bold uppercase py-3'>
                    Total Users: {users.length}
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-orange-400 text-white'>
                                <tr>
                                    <th className='rounded-tl-lg'>Serial</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role </th>
                                    <th className='rounded-tr-lg'>Action </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    users.map((user, index) => (
                                        <tr
                                            key={user._id}

                                            className="bg-base-200">
                                            <th>{index + 1}</th>
                                            <td> {user.name} </td>
                                            <td>{user.email}</td>

                                            <td>
                                                {
                                                    user.role === "admin" ? "Admin" : <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                    >
                                                        <FaUsers className='bg-[#d1a054] text-white text-3xl rounded-2xl'></FaUsers>
                                                    </button>
                                                }
                                            </td>

                                            <td
                                                onClick={() => handleDeleteUser(user)}
                                            >
                                                <MdDelete className='text-white bg-red-600 text-3xl cursor-pointer rounded-sm ' />

                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllUsers;
