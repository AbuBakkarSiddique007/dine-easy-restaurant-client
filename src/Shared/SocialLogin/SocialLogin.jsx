import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    const { LoginWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        LoginWithGoogle()
            .then(res => {
                const user = res.user

                const userData = {
                    name: user.displayName,
                    email: user.email,
                };

                // Save user to db:
                axiosPublic.post("/users", userData)
                    .then(response => {
                        // console.log("User saved to database:", response.data);

                        Swal.fire({
                            title: "Successfully Logged In with Google!",
                            icon: "success",
                            draggable: true
                        });

                        // Navigate to intended page
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        console.error("Error saving user to database:", error);
                        // Still navigate even if database save fails
                        Swal.fire({
                            title: "Logged in successfully!",
                            text: "Welcome back!",
                            icon: "success",
                            draggable: true
                        });
                        navigate(from, { replace: true });
                    });
            })
            .catch(error => {
                console.error("Google login error:", error);
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error",
                    draggable: true
                });
            });
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80">

                    <span
                        onClick={handleGoogleLogin}

                        className="flex justify-center items-center gap-2 text-sm font-medium text-gray-700"
                    > <FaGoogle></FaGoogle> <span>Google</span></span>
                </button>
                <button className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80">
                    <span className="flex justify-center items-center gap-2 text-sm font-medium text-gray-700">
                        <FaGithub></FaGithub>
                        GitHub</span>
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;
