import useCart from '../../../hooks/useCart/useCart';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const handleDelete = (id) => {
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
                axiosSecure.delete(`/carts/${id}`)
                    .then(result => {
                        if (result.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting item:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete item. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (cart.length === 0) {
        return (
            <div>
                <SectionTitles
                    heading="WANNA ADD MORE?"
                    subHeading="My Cart"
                />
                <div className='bg-white py-12 px-8 text-center rounded-xl shadow-lg mt-8'>
                    <p className='text-3xl text-gray-500 font-bold'>Your cart is empty</p>
                    <p className='text-gray-400 mt-2 text-lg'>Add some delicious items to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionTitles
                heading="WANNA ADD MORE?"
                subHeading="My Cart"
            />
            <div className='bg-white py-6 px-2 md:px-8 rounded-xl shadow-lg mt-8'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
                    <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
                        <span className="text-lg md:text-xl font-semibold text-gray-700">
                            Total Orders: <span className="text-orange-500">{cart.length}</span>
                        </span>
                        <span className="text-lg md:text-xl font-semibold text-gray-700">
                            Total Price: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                        </span>
                    </div>
                    <Link to="/dashboard/payment" className="w-full md:w-auto">
                        <button
                            className='btn btn-accent btn-lg px-8 w-full md:w-auto'
                            disabled={cart.length === 0}
                        >
                            Pay
                        </button>
                    </Link>
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="table w-full rounded-xl overflow-hidden">
                        <thead className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                            <tr>
                                <th className="rounded-tl-xl py-4">Serial</th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th className="rounded-tr-xl py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item._id} className="hover:bg-orange-50 transition-colors duration-200">
                                    <td className="font-semibold text-gray-700">{index + 1}</td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-14 w-14 border-2 border-orange-200 shadow">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold text-gray-800">{item.name}</td>
                                    <td className="font-bold text-green-600">${item.price.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-error btn-circle text-2xl"
                                            onClick={() => handleDelete(item._id)}
                                            title="Delete item"
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden space-y-4">
                    {cart.map((item, index) => (
                        <div key={item._id} className="bg-orange-50 rounded-xl p-4 border border-orange-200 flex items-center gap-4">
                            <div className="avatar flex-shrink-0">
                                <div className="mask mask-squircle h-14 w-14 border-2 border-orange-200 shadow">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-800">{item.name}</span>
                                    <span className="font-bold text-green-600">${item.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Serial: {index + 1}</span>
                                    <button
                                        className="btn btn-error btn-circle text-xl"
                                        onClick={() => handleDelete(item._id)}
                                        title="Delete item"
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
