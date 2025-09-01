import Cover from '../../../Shared/Cover/Cover';
import CoverImg from "../../../assets/images/bgCover/banner1.jpg"
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";

const ContactUs = () => {

    const handleSubmit = (event) => {
        event.preventDefault()

    }


    const cards = [
        {
            icon: <IoCall className="w-8 h-8 text-white" />,
            title: "PHONE",
            content1: "+38 (012) 34 56 789",
            bgColor: "bg-yellow-600"
        },
        {
            icon: <FaLocationDot className="w-8 h-8 text-white" />,
            title: "ADDRESS",
            content1: "123 Main Street, City, State 12345",
            bgColor: "bg-blue-600"
        },
        {
            icon: <IoIosTime className="w-8 h-8 text-white" />,
            title: "WORKING HOURS",
            content1: "MON-FRIDAY: 08:00-22:00",
            content2: "SAT-SUN: 10:00-23:00",
            bgColor: "bg-green-600"
        }
    ];

    return (
        <div>

            <Cover
                bgImg={CoverImg}
                heading="CONTACT US"
                subHeading="Would you like to try a dish?"
            >
            </Cover>

            <SectionTitles
                heading="OUR LOCATION"
                subHeading="Visit Us"
            ></SectionTitles>

            <div className="flex flex-wrap gap-6 justify-center p-4">
                {cards.map((card, index) => (
                    <div key={index} className="w-80 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className={`${card.bgColor} h-24 flex items-center justify-center`}>
                            {card.icon}
                        </div>

                        <div className="bg-gray-100 p-8 text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
                                {card.title}
                            </h2>
                            <p className="text-gray-600 text-lg">
                                {card.content1}
                            </p>
                            {
                                card?.content2 && <p className="text-gray-600 text-lg">
                                    {card.content2}
                                </p>
                            }
                        </div>
                    </div>
                ))}
            </div>

            <SectionTitles
                heading="CONTACT FORM"
                subHeading="Send Us a Message"
            >
            </SectionTitles>


            {/* Contact Us form */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"

                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <IoMdMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"

                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <IoCall className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"

                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message *
                            </label>
                            <div className="relative">
                                <AiFillMessage className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <textarea
                                    id="message"
                                    name="message"

                                    required
                                    rows={5}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                    placeholder="Enter your message..."
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="recaptcha"

                                    className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="recaptcha" className="text-sm text-gray-700">
                                    I'm not a robot
                                </label>
                                <div className="ml-auto">
                                    <div className="text-xs text-gray-500">reCAPTCHA</div>
                                    <div className="text-xs text-gray-400">Privacy - Terms</div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg text-white font-medium transition-colors bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
