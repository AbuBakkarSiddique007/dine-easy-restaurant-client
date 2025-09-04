import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthBg from "../../assets/images/Auth/authentication.png";
import AuthImg1 from "../../assets/images/Auth/authentication2.png";

import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";


const Login = () => {
    const { loginUser, LoginWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const captchaRef = useRef(null)
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        loadCaptchaEnginge(6);
    },
        [])


    const handleForm = (event) => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value

        // eslint-disable-next-line no-unused-vars
        const formData = {
            email,
            password
        }

        loginUser(email, password)
            .then(result => {
                console.log("User Logged In --->", result.user);
                Swal.fire({
                    title: "User Successfully LogIn",
                    icon: "success",
                    draggable: true
                });

                navigate(from, { replace: true });
            })
    }

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
                        console.log("User saved to database:", response.data);

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

    const handleCaptcha = (e) => {
        e.preventDefault()
        const userCaptchaValue = captchaRef.current.value

        if (validateCaptcha(userCaptchaValue) === true) {
            setDisable(false)
            console.log("Captcha Matched");

        }
        else {
            setDisable(true)
            console.log("Not matched");
        }


    }

    return (
        <div
            className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16 xl:px-44 py-4 sm:py-8 lg:py-16 xl:py-24 relative"
            style={{ backgroundImage: `url(${AuthBg})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="hero backdrop-blur-sm bg-white/10 rounded-2xl shadow-2xl border border-white/20 relative  w-full max-w-6xl">
                <div className="hero-content flex-col lg:flex-row gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8 xl:p-12 w-full">
                    <div className="hidden lg:block lg:w-1/2">
                        <div className="relative group">
                            <img
                                src={AuthImg1}
                                alt="Authentication"
                                className="w-full h-auto rounded-xl shadow-xl transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl"></div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
                        <div className="backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl">
                            <div className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Login
                                    </h1>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Welcome back! Please enter your details.
                                    </p>
                                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
                                </div>

                                <form onSubmit={handleForm} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"


                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"


                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <LoadCanvasTemplate />

                                        <input
                                            type="text"
                                            ref={captchaRef}

                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter your Captcha"
                                            required
                                        />
                                        <button
                                            type="button"

                                            onClick={handleCaptcha}
                                            className="btn btn-warning btn-xs"
                                        >Verify Captcha</button>

                                    </div>

                                    {/* <div className="flex justify-between items-center text-sm">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"

                                                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                            />
                                            <span className="text-gray-600">Remember me</span>
                                        </label>
                                        <a

                                            className="text-purple-600 hover:text-purple-700 transition-colors duration-200 hover:underline font-medium"
                                        >
                                            Forgot password?
                                        </a>
                                    </div> */}

                                    <input
                                        type="submit"
                                        value="Login"
                                        disabled={disable}
                                        className={`w-full py-3 px-6 font-semibold rounded-xl shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 active:scale-95 ${disable
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 hover:shadow-purple-500/25'
                                            }`}
                                    />

                                </form>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">OR</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80">

                                        <span
                                            onClick={handleGoogleLogin}

                                            className="text-sm font-medium text-gray-700"

                                        >Google</span>
                                    </button>
                                    <button className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80">
                                        <span className="text-sm font-medium text-gray-700">GitHub</span>
                                    </button>
                                </div>

                                <div className="text-center pt-4">
                                    <p className="text-gray-600 text-sm">
                                        New here?{" "}

                                        <Link
                                            to={"/register"}
                                            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 hover:underline"
                                        >
                                            Create an account
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
