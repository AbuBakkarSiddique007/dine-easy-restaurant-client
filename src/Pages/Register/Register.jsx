import { Link } from "react-router-dom";

import AuthBg from "../../assets/images/Auth/authentication.png";
import AuthImg1 from "../../assets/images/Auth/authentication2.png";


const Register = () => {

    const handleForm = (event) => {
        event.preventDefault()

        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value

        const formData = {
            name,
            email,
            password,
            confirmPassword
        }

        console.table({ formData });

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

                                <form onSubmit={handleForm} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"

                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter Your Full Name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"

                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                            placeholder="Enter Your Email"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"

                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                                placeholder="Create a password"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"

                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/90 placeholder-gray-400"
                                                placeholder="Confirm your password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"

                                            className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            required
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
                                    </div>

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
