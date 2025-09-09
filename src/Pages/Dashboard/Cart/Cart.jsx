import React from 'react';
import useCart from '../../../hooks/useCart/useCart';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    console.log("cart data ===>", cart);
    const axiosSecure = useAxiosSecure()

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
                <div>
                    <SectionTitles
                        heading="WANNA ADD MORE?"
                        subHeading="My Cart"
                    />
                </div>
                <div className='bg-white py-8 px-8 text-center'>
                    <p className='text-2xl text-gray-500'>Your cart is empty</p>
                    <p className='text-gray-400 mt-2'>Add some delicious items to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <SectionTitles
                    heading="WANNA ADD MORE?"
                    subHeading="My Cart"
                />
            </div>
            <div className='bg-white py-2 px-8'>
                <div className='text-3xl font-bold flex justify-between items-center uppercase mb-2'>
                    <p>
                        Total orders: {cart.length}
                    </p>
                    <p>
                        Total price: ${totalPrice.toFixed(2)}
                    </p>
                    <Link
                        to="/dashboard/payment"
                    >
                        <button
                            className='btn btn-accent'
                            disabled={cart.length === 0}
                        >
                            Pay
                        </button>
                    </Link>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-orange-400 text-white">
                                <tr>
                                    <th className="rounded-tl-lg">Serial</th>
                                    <th>ITEM IMAGE</th>
                                    <th>ITEM NAME</th>
                                    <th>PRICE</th>
                                    <th className="rounded-tr-lg">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={item._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-semibold">
                                            {item.name}
                                        </td>
                                        <td className="font-medium">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <th>
                                            <button
                                                className="btn btn-error text-2xl"
                                                onClick={() => handleDelete(item._id)}
                                                title="Delete item"
                                            >
                                                <MdDeleteForever />
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
