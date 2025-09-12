import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ContactUs from "../Pages/ContactUs/ContactUs/ContactUs";
import Random from "../Shared/Random/Random";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import ReviewForm from "../Pages/Home/ReviewForm/ReviewForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/order",
                element: <Navigate to="/order/salad" replace />
            },
            {
                path: "/order/:category",
                element: <Order></Order>
            },
            {
                path: "/contactUs",
                element: <ContactUs></ContactUs>

            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/random",
                element: <PrivateRoute>
                    <Random></Random>
                </PrivateRoute>
            }

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // Normal users routes
            {
                path: 'users-home',
                element: <UserHome></UserHome>

            },
            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: 'add-review',
                element: <ReviewForm></ReviewForm>

            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>

            },

            {
                path: "reservation",
                element: <Reservation></Reservation>
            },

            // Admin routes
            {
                path: 'admin-home',
                element: <AdminHome></AdminHome>

            },
            {
                path: 'add-items',
                element: <AdminRoute>
                    <AddItems></AddItems>
                </AdminRoute>

            },
            {
                path: 'manage-items',
                element: <AdminRoute>
                    <ManageItems></ManageItems>
                </AdminRoute>

            },
            {
                path: 'UpdateItem/:id',
                element: <AdminRoute>
                    <UpdateItem></UpdateItem>
                </AdminRoute>,
                // loader: ({ params }) => fetch(`https://dine-easy-restaurant-server.vercel.app/menu/${params.id}`)
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path: "all-users",
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            }
        ]
    }
])
