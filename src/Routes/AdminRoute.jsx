import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin/useAdmin";
import useAuth from "../hooks/useAuth/useAuth";
import Loader from "../Shared/Loader/Loader";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()

    const location = useLocation()

    if (loading || isAdminLoading) {
        return <Loader></Loader>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to={"/login"} state={{ from: location }} replace>  </Navigate>

};

export default AdminRoute;
