import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import { FaUsers, FaCrown, FaUserShield } from 'react-icons/fa';
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

    const handleDeleteUser = (user) => {
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
                                text: "User has been deleted.",
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
                        title: `${user.name} is now an admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const getRoleDisplay = (user) => {
        if (user.role === "admin") {
            return (
                <div className="flex items-center space-x-2">
                    <FaCrown className="text-yellow-500" />
                    <span className="font-semibold text-yellow-700">Admin</span>
                </div>
            );
        }
        return (
            <button
                onClick={() => handleMakeAdmin(user)}
                className="p-2 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg transition-all duration-200 group"
                title="Make Admin"
            >
                <FaUsers className="text-lg group-hover:scale-110 transition-transform duration-200" />
            </button>
        );
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="text-center mb-8">
                <SectionTitles
                    heading="All Users"
                    subHeading="How Many?"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
                            <FaUsers className="text-xl sm:text-2xl text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h2>
                            <p className="text-sm sm:text-base text-gray-600">Manage all registered users</p>
                        </div>
                    </div>
                    <div className="text-center sm:text-right">
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600">{users.length}</div>
                        <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 sm:px-6 py-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">Registered Users</h3>
                </div>

                <div className="hidden lg:block overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">#</th>
                                <th className="px-6 py-4 text-left font-semibold">Name</th>
                                <th className="px-6 py-4 text-left font-semibold">Email</th>
                                <th className="px-6 py-4 text-left font-semibold">Role</th>
                                <th className="px-6 py-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-600">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRoleDisplay(user)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 group"
                                                title="Delete user"
                                            >
                                                <MdDelete className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="lg:hidden space-y-4 p-4">
                    {users.map((user, index) => (
                        <div key={user._id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FaUserShield className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{user.name}</h4>
                                        <p className="text-xs sm:text-sm text-gray-500">#{index + 1}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {user.role === "admin" && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                                            <FaCrown className="mr-1" />
                                            Admin
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">Email:</p>
                                <p className="text-sm sm:text-base text-gray-800 break-all">{user.email}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                {user.role !== "admin" && (
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="flex-1 flex items-center justify-center space-x-2 p-3 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg transition-colors duration-200 text-sm font-medium"
                                    >
                                        <FaUsers className="text-base" />
                                        <span>Make Admin</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className={`${user.role !== "admin" ? 'flex-1' : 'w-full'} flex items-center justify-center space-x-2 p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 text-sm font-medium`}
                                >
                                    <MdDelete className="text-base" />
                                    <span>Delete User</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Users Found</h3>
                        <p className="text-gray-500">No registered users yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
