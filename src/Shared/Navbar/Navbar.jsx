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
    console.log(carts);


    const hangleLogOut = () => {
        logOut()
            .then(() => {
                console.log("User logout!!!!");
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
                    `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-green-400 text-white'
                        : ''
                    }`
                }

            > Home </NavLink>
        </li>
        <li>
            <NavLink to={"/menu"}
                className={({ isActive }) =>
                    `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-green-400 text-white'
                        : ''
                    }`
                }
            >Our Menu</NavLink>

        </li>

        {
            user && isAdmin && <li>
                <NavLink to={"/dashboard/admin-home"}
                    className={({ isActive }) =>
                        `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                            ? 'bg-green-400 text-white'
                            : ''
                        }`
                    }
                >Dashboard</NavLink>
            </li>
        }
        {
            user && !isAdmin && <li>
                <NavLink to={"/dashboard/users-home"}
                    className={({ isActive }) =>
                        `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                            ? 'bg-green-400 text-white'
                            : ''
                        }`
                    }
                >Dashboard</NavLink>
            </li>
        }


        <li>
            <NavLink to={"/order"}
                className={({ isActive }) =>
                    `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-green-400 text-white'
                        : ''
                    }`
                }
            >Order Food</NavLink>

        </li>

        <li>
            <NavLink to={"/contactUs"}
                className={({ isActive }) =>
                    `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-green-400 text-white'
                        : ''
                    }`
                }
            >Contact Us</NavLink>

        </li>

        <li>
            <NavLink to={"/dashboard/cart"}
                className={({ isActive }) =>
                    `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-green-400 text-white'
                        : ''
                    }`
                }
            >
                <button className="btn btn-outline btn-success">
                    <div className="badge badge-sm badge-secondary">
                        <BsFillCartPlusFill />
                        + {carts.length} </div>
                </button>
            </NavLink>
        </li>
        <li>
            <NavLink to={"/random"}
                className={({ isActive }) =>
                    `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-green-400 text-white'
                        : ''
                    }`
                }
            >Random</NavLink>
        </li>

        <li>
            {
                user ? (<div>
                    <p className="text-lg text-green-600">
                        {user?.displayName}
                    </p>
                    <button onClick={hangleLogOut} className="btn btn-error">Logout</button>

                </div>) :
                    (<div>

                        <NavLink to={"/login"}
                            className={({ isActive }) =>
                                `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-green-400 text-white'
                                    : ''
                                }`
                            }
                        >Login</NavLink>

                    </div>)
            }
        </li>


        {/* <li>
            <NavLink to={"/register"}
                className={({ isActive }) =>
                    `px-4 mr-2 py-2 rounded-lg transition-colors ${isActive
                        ? 'bg-green-400 text-white'
                        : ''
                    }`
                }
            >Register</NavLink>

        </li> */}


    </>

    return (
        <div className="max-w-7xl fixed z-10 navbar bg-black/30 text-white shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-green-950">
                        {
                            NavOptions
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Dine Easy Restaurant</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex justify-center items-center menu menu-horizontal ">
                    {
                        NavOptions
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;
