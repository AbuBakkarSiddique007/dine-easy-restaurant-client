import { NavLink } from "react-router-dom";

const Navbar = () => {

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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            NavOptions
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Dine Easy Restaurant</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
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
