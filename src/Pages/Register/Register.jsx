import { Link, useNavigate } from "react-router-dom";
import AuthBg from "../../assets/images/Auth/authentication.png";
import AuthImg1 from "../../assets/images/Auth/authentication2.png";

import { useForm } from "react-hook-form"
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Register = () => {

    // const handleForm = (event) => {
    //     event.preventDefault()

    //     const form = event.target
    //     const name = form.name.value
    //     const email = form.email.value
    //     const password = form.password.value
    //     const confirmPassword = form.confirmPassword.value

    //     const formData = {
    //         name,
    //         email,
    //         password,
    //         confirmPassword
    //     }
    //     console.table({ formData });
    // }

    /**
     * Using React hook Form
     */

    const { createUser, updateUserProfile } = useContext(AuthContext)
    const naviaget = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // console.log(data)

        createUser(data.email, data.password)
            .then(userCredential => {
                const user = userCredential.user
                console.log(user);
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        reset()
                        Swal.fire({
                            title: "User Profile Updated!",
                            icon: "success",
                            draggable: true
                        });
                        naviaget("/")
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "An error occurred",
                            icon: "success",
                            draggable: true
                        });
                        console.log("error--->", error);
                    });
            })
    }

    return (
        <div
            className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16 xl:px-44 py-4 sm:py-8 lg:py-16 xl:py-24 relative"

            style={{ backgroundImage: `url(${AuthBg})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="hero backdrop-blur-sm bg-white/10 rounded-2xl shadow-2xl border border-white/20 relative  w-full max-w-7xl">
                <div className="hero-content flex-col lg:flex-row gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8 xl:p-12 w-full">
                    <div className="hidden lg:block lg:w-1/2">
                        <div className="relative group">
                            <img
                                src={AuthImg1}
                                alt="Registration"
                                className="w-full h-auto rounded-xl shadow-xl transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl"></div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
                        <div className="backdrop-blur-xl bg-white/95 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/30">
                            <div className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                        Create Account
                                    </h1>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Join us today! Please fill in your details.
                                    </p>
                                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
                                </div>

                                {/* Form Section */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            {...register("name", { required: true })}


                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter Your Full Name"

                                        />
                                        {errors.name?.type === "required" && <p className="text-red-600">This Name field is required</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            PhotoURL
                                        </label>
                                        <input
                                            type="url"
                                            name="photoURL"
                                            {...register("photoURL", { required: true })}


                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter Your Full Name"

                                        />
                                        {errors.photoURL?.type === "required" && <p className="text-red-600">This photoURL field is required</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            {...register("email", { required: true })}


                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter Your Email"
                                        />
                                        {errors.email?.type === "required" && <p className="text-red-600">This EEEEmail field is required</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters"
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        message: "Password must not exceed 20 characters"
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
                                                    }
                                                })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                                placeholder="Create a password"
                                            />
                                            {errors.password && (
                                                <span className="text-red-600 text-sm">
                                                    {errors.password.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                {...register("confirmPassword", {
                                                    required: "Please confirm your password",
                                                    validate: (value) => {
                                                        if (watch('password') !== value) {
                                                            return "Passwords do not match";
                                                        }
                                                    }
                                                })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                                placeholder="Confirm your password"
                                            />
                                            {errors.confirmPassword && (
                                                <span className="text-red-600 text-sm">
                                                    {errors.confirmPassword.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* <div className="flex items-start space-x-2">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"

                                            className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"

                                        />
                                        <label className="text-sm text-gray-600 leading-relaxed">
                                            I agree to the{" "}
                                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div> */}

                                    <input
                                        type="submit"
                                        value="Create Account"

                                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                                    <button className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80">
                                        <span className="text-sm font-medium text-gray-700">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80">
                                        <span className="text-sm font-medium text-gray-700">GitHub</span>
                                    </button>
                                </div>

                                <div className="text-center pt-4">
                                    <p className="text-gray-600 text-sm">
                                        Already have an account?{" "}
                                        <Link
                                            to={"/login"}
                                            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                                        >
                                            Sign in here
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

export default Register;
