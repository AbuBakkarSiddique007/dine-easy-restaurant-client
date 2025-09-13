import { FaBars, FaBook, FaCalendar, FaDollarSign, FaHamburger, FaHome, FaStar, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendarCheck, FaCartShopping, FaShop } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart/useCart";
import useAdmin from "../hooks/useAdmin/useAdmin";
import useMenu from "../hooks/useMenu/useMenu";

const Dashboard = () => {
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    const [menu] = useMenu()

    return (
        <div className="flex min-h-screen">
            <div className="w-64 min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-black shadow-2xl border-r border-slate-700">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white mb-1">
                        {isAdmin ? 'Admin Panel' : 'Dashboard'}
                    </h2>
                    <p className="text-sm text-slate-400">
                        {isAdmin ? 'Manage your restaurant' : 'Welcome back'}
                    </p>
                </div>

                <ul className="menu flex flex-col justify-start items-start p-4 space-y-2">
                    {
                        isAdmin ? <>
                            {/* Admin routes */}
                            <li className="w-full">
                                <NavLink
                                    to={"admin-home"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                            ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`
                                    }
                                >
                                    <FaHome className="text-lg" />
                                    <span>Admin Home</span>
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"add-items"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                            ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`
                                    }
                                >
                                    <FaUtensils className="text-lg" />
                                    <span>Add Items</span>
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"manage-items"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                            ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`
                                    }
                                >
                                    <FaBars className="text-lg" />
                                    <div className="flex items-center justify-between w-full">
                                        <span>Manage Items</span>
                                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                            {menu.length}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"manage-bookings"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                            ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`
                                    }
                                >
                                    <FaBook className="text-lg" />
                                    <span>Manage Bookings</span>
                                </NavLink>
                            </li>

                            <li className="w-full">
                                <NavLink
                                    to={"all-users"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                            ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`
                                    }
                                >
                                    <FaUsers className="text-lg" />
                                    <span>All Users</span>
                                </NavLink>
                            </li>

                        </> :
                            <>
                                {/* Normal users routes */}
                                <li className="w-full">
                                    <NavLink
                                        to={"users-home"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }`
                                        }
                                    >
                                        <FaHome className="text-lg" />
                                        <span>User Home</span>
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"reservation"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }`
                                        }
                                    >
                                        <FaCalendar className="text-lg" />
                                        <span>Reservation</span>
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"payment-history"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }`
                                        }
                                    >
                                        <FaDollarSign className="text-lg" />
                                        <span>Payment History</span>
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"cart"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }`
                                        }
                                    >
                                        <FaCartShopping className="text-lg" />
                                        <div className="flex items-center justify-between w-full">
                                            <span>My Cart</span>
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                {cart.length}
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"add-review"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }`
                                        }
                                    >
                                        <FaStar className="text-lg" />
                                        <span>Add Review</span>
                                    </NavLink>
                                </li>
                                <li className="w-full">
                                    <NavLink
                                        to={"my-booking"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }`
                                        }
                                    >
                                        <FaCalendarCheck className="text-lg" />
                                        <span>My Booking</span>
                                    </NavLink>
                                </li>
                            </>
                    }

                    {/* Divider */}
                    <div className="w-full my-4">
                        <div className="border-t border-slate-600"></div>
                        <p className="text-xs text-slate-500 mt-3 mb-1 px-2 uppercase tracking-wide">
                            Quick Access
                        </p>
                    </div>

                    <li className="w-full">
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                    ? 'text-white bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                                }`
                            }
                        >
                            <FaHome className="text-lg" />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to={"/menu"}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                    ? 'text-white bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                                }`
                            }
                        >
                            <FaHamburger className="text-lg" />
                            <span>Menu</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to={"/order"}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                    ? 'text-white bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                                }`
                            }
                        >
                            <FaShop className="text-lg" />
                            <span>Shop</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to={"/contactUs"}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 w-full text-sm font-medium ${isActive
                                    ? 'text-white bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                                }`
                            }
                        >
                            <FaCalendarCheck className="text-lg" />
                            <span>Contact</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard content */}
            <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
