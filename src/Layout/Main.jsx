import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation()
    const noHeaderAndFooter = location.pathname.includes("login") || location.pathname.includes("register")

    return (
        <div>
            {
                noHeaderAndFooter || <Navbar></Navbar>
            }

            <Outlet></Outlet>

            {
                noHeaderAndFooter || <Footer></Footer>
            }

        </div>
    );
};

export default Main;
