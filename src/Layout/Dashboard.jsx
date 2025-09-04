import { FaBars, FaBook, FaCalendar, FaDollarSign, FaHamburger, FaHome, FaPlus, FaStar, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { FaCalendarCheck, FaCartShopping, FaShop } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart/useCart";

const Dashboard = () => {
    const [cart] = useCart()
    const isAdmin = true
    return (
        <div className="flex">

            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-300">
                <ul className="menu uppercase flex flex-col justify-start items-start p-4">
                    {
                        isAdmin ? <>
                            <li className="w-full">
                                <NavLink
                                    to={"/dashboard/admin-home"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                        }`
                                    }
                                >
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"/dashboard/add-items"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                        }`
                                    }
                                >
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"/dashboard/manage-items"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                        }`
                                    }
                                >
                                    <FaBars />
                                    Manage Items
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"/dashboard/manage-bookings"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                        }`
                                    }
                                >
                                    <FaBook />
                                    Manage Bookings
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"/dashboard/all-users"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                        }`
                                    }
                                >
                                    <FaUsers />
                                    All Users
                                </NavLink>
                            </li>

                        </> :
                            <>
                                <li className="w-full">
                                    <NavLink
                                        to={"/dashboard/home"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                            }`
                                        }
                                    >
                                        <FaHome />
                                        User Home
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"/dashboard/reservation"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                            }`
                                        }
                                    >
                                        <FaCalendar />
                                        Reservation
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"/dashboard/payment-history"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                            }`
                                        }
                                    >
                                        <FaDollarSign />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"/dashboard/cart"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                            }`
                                        }
                                    >
                                        <FaCartShopping />
                                        My Cart ({cart.length})
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"/dashboard/add-review"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                            }`
                                        }
                                    >
                                        <FaStar />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"/dashboard/my-booking"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                            }`
                                        }
                                    >
                                        <FaCalendarCheck />
                                        My Booking
                                    </NavLink>
                                </li>
                            </>

                    }

                    {/*---------------------------- Divider---------------------- */}
                    <div className="divider"></div>

                    <li className="w-full">
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                }`
                            }
                        >
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to={"/menu"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                }`
                            }
                        >
                            <FaHamburger></FaHamburger>
                            Menu
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to={"/order"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                }`
                            }
                        >
                            <FaShop></FaShop>
                            Shop
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to={"/contactUs"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'text-white bg-orange-500' : 'text-black hover:bg-orange-400'
                                }`
                            }
                        >
                            <FaCalendarCheck />
                            Contact
                        </NavLink>
                    </li>

                </ul>
            </div>


            {/* Dashboard content */}
            <div className="flex-1 p-4 bg-[#E8E8E8]">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
