import { Link } from 'react-router-dom';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import useMenu from '../../../hooks/useMenu/useMenu';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';
import { FaUtensils, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2'

const ManageItems = () => {
    const [menu, , refetch] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)

                if (res.data.deletedCount > 0) {
                    refetch()

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }

    const getCategoryBadgeColor = (category) => {
        const colors = {
            salad: 'bg-green-100 text-green-700',
            pizza: 'bg-red-100 text-red-700',
            soup: 'bg-orange-100 text-orange-700',
            dessert: 'bg-pink-100 text-pink-700',
            drinks: 'bg-blue-100 text-blue-700'
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="p-6 space-y-6">
            <div className="text-center mb-8">
                <SectionTitles
                    heading="MANAGE ALL ITEMS"
                    subHeading="Hurry Up!"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <FaUtensils className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
                            <p className="text-gray-600">Manage your restaurant's menu items</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">{menu.length}</div>
                        <p className="text-sm text-gray-500">Total Items</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 sm:px-6 py-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">Menu Items</h3>
                </div>

                <div className="hidden lg:block overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">#</th>
                                <th className="px-6 py-4 text-left font-semibold">Item Image</th>
                                <th className="px-6 py-4 text-left font-semibold">Item Details</th>
                                <th className="px-6 py-4 text-left font-semibold">Category</th>
                                <th className="px-6 py-4 text-left font-semibold">Price</th>
                                <th className="px-6 py-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {menu.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative group">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-gray-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <FaEye className="text-white text-lg" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {item.recipe
                                                    ? item.recipe.length > 60
                                                        ? item.recipe.substring(0, 60) + '...'
                                                        : item.recipe
                                                    : 'No description'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryBadgeColor(item.category)}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-lg font-bold text-green-600">
                                            ${item.price.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link to={`/dashboard/UpdateItem/${item._id}`}>
                                                <button
                                                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 group"
                                                    title="Edit item"
                                                >
                                                    <MdEditDocument className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                                </button>
                                            </Link>
                                            <button
                                                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 group"
                                                onClick={() => handleDelete(item)}
                                                title="Delete item"
                                            >
                                                <MdDeleteForever className="text-lg group-hover:scale-110 transition-transform duration-200" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden space-y-4 p-4">
                    {menu.map((item, index) => (
                        <div key={item._id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-md border-2 border-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">{item.name}</h4>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryBadgeColor(item.category)}`}>
                                                    {item.category}
                                                </span>
                                                <span className="text-xs text-gray-500">#{index + 1}</span>
                                            </div>
                                        </div>
                                        <div className="text-lg sm:text-xl font-bold text-green-600 ml-2">
                                            ${item.price.toFixed(2)}
                                        </div>
                                    </div>

                                    {item.recipe && (
                                        <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2">
                                            {item.recipe.length > 80
                                                ? item.recipe.substring(0, 80) + '...'
                                                : item.recipe}
                                        </p>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <Link to={`/dashboard/UpdateItem/${item._id}`} className="flex-1">
                                            <button className="w-full flex items-center justify-center space-x-2 p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 text-sm font-medium">
                                                <MdEditDocument className="text-base" />
                                                <span>Edit</span>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="flex-1 flex items-center justify-center space-x-2 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 text-sm font-medium"
                                        >
                                            <MdDeleteForever className="text-base" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {menu.length === 0 && (
                    <div className="text-center py-12">
                        <FaUtensils className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Menu Items Found</h3>
                        <p className="text-gray-500">Start by adding your first menu item</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageItems;
