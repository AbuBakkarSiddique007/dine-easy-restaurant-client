import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { BsFillCartPlusFill } from "react-icons/bs";
import useCart from "../../hooks/useCart/useCart";
import useAdmin from "../../hooks/useAdmin/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [carts] = useCart()
    const [isAdmin] = useAdmin()

    const hangleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "User Successfully LogOut!",
                    icon: "success",
                    draggable: true
                });
            })
    }

    const NavOptions = <>
        <li>
            <NavLink to={"/"}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:scale-105 ${isActive
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-gray-200 hover:text-white'
                    }`
                }
            > Home </NavLink>
        </li>
        <li>
            <NavLink to={"/menu"}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:scale-105 ${isActive
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-gray-200 hover:text-white'
                    }`
                }
            >Our Menu</NavLink>
        </li>

        {
            user && isAdmin && <li>
                <NavLink to={"/dashboard/admin-home"}
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:scale-105 ${isActive
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'text-gray-200 hover:text-white'
                        }`
                    }
                >Dashboard</NavLink>
            </li>
        }
        {
            user && !isAdmin && <li>
                <NavLink to={"/dashboard/users-home"}
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:scale-105 ${isActive
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'text-gray-200 hover:text-white'
                        }`
                    }
                >Dashboard</NavLink>
            </li>
        }

        <li>
            <NavLink to={"/order"}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:scale-105 ${isActive
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-gray-200 hover:text-white'
                    }`
                }
            >Order Food</NavLink>
        </li>

        <li>
            <NavLink to={"/contactUs"}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:scale-105 ${isActive
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-gray-200 hover:text-white'
                    }`
                }
            >Contact Us</NavLink>
        </li>

        <li>
            <NavLink to={"/dashboard/cart"}
                className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${isActive
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-gray-200 hover:text-white'
                    }`
                }
            >
                <div className="relative">
                    <button className="btn btn-ghost hover:bg-green-500/20 border-2 border-green-500 text-green-400 hover:text-white transition-all duration-300">
                        <BsFillCartPlusFill className="text-lg" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                            {carts.length}
                        </span>
                    </button>
                </div>
            </NavLink>
        </li>

        {/* <li>
            <NavLink to={"/random"}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-500/20 hover:scale-105 ${isActive
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-gray-200 hover:text-white'
                    }`
                }
            >Random</NavLink>
        </li> */}
    </>

    return (
        <div className="max-w-7xl fixed z-10 navbar bg-gradient-to-r from-black/30 via-gray-900/20 to-black/90 backdrop-blur-sm text-white shadow-2xl border-b border-green-500/20">
            <div className="navbar-start">
                <div className="dropdown z-30">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-green-500/20 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-xl mt-3 w-60 p-4 shadow-2xl bg-gradient-to-b from-gray-900 to-black border border-green-500/20 backdrop-blur-sm z-20">
                        {NavOptions}
                    </ul>
                </div>
                <div className="md:ml-6 py-2">
                    <Link to={"/"} className="flex items-center group">
                        <h1 className="flex flex-col uppercase transition-all duration-300 group-hover:scale-105">
                            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                                Dine Easy
                            </span>
                            <span className="text-lg md:text-xl font-bold text-gray-300 group-hover:text-green-300 transition-colors duration-300">
                                Restaurant
                            </span>
                        </h1>
                    </Link>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex justify-center items-center menu menu-horizontal space-x-1">
                    {NavOptions}
                </ul>
            </div>

            <div className="navbar-end md:mr-6">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-300">
                            <div className="w-10 rounded-full ring-2 ring-green-400 ring-offset-2 ring-offset-gray-900">
                                <img
                                    alt="User Avatar"
                                    referrerPolicy="no-referrer"
                                    src={user?.photoURL}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gradient-to-b from-gray-900 to-black rounded-xl z-[1] mt-3 w-60 p-4 shadow-2xl border border-green-500/20 backdrop-blur-sm">
                            <li className="mb-3">
                                <div className="flex flex-col items-center text-center p-2">
                                    <div className="avatar mb-2">
                                        <div className="w-16 rounded-full ring-2 ring-green-400">
                                            <img src={user?.photoURL} alt="User Avatar" />
                                        </div>
                                    </div>
                                    <p className="text-green-400 font-medium text-sm">Welcome back,</p>
                                    <p className="text-white font-semibold text-lg">{user?.displayName || "User"}</p>
                                    <p className="text-gray-400 text-xs mt-1">{user?.email}</p>
                                </div>
                            </li>
                            <div className="divider my-2"></div>
                            <li>
                                <button
                                    onClick={hangleLogOut}
                                    className="btn btn-outline btn-error w-full hover:bg-red-500 hover:border-red-500 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <NavLink to={"/login"}>
                        <button className="btn btn-outline btn-success hover:bg-green-500 hover:border-green-500 transition-all duration-300 hover:scale-105 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m0 0v3a2 2 0 002 2h10" />
                            </svg>
                            Login
                        </button>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
