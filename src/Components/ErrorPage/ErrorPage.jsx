import { Link } from 'react-router-dom';
import Error404 from "../../assets/images/ErrorPage/404.gif"

const ErrorPage = () => {
    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center px-4'>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto text-gray-800">
                <div className='flex-1 flex flex-col justify-center items-center text-center'>
                    <h2 className="text-3xl font-bold mt-4">Oops! Page Not Found</h2>
                    <p className="text-lg text-gray-600 mt-2">
                        The page you're looking for doesn't exist. <br />
                        It might have been moved or deleted.
                    </p>
                </div>

                <div className='flex-1 flex flex-col justify-center items-center'>
                    <img
                        src={Error404}
                        alt="404 Illustration"
                        className="w-full max-w-80 h-auto"
                    />
                </div>
            </div>
            <Link
                to="/"
                className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
