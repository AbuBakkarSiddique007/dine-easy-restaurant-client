import featuredImg from "../../../assets/images/featured/featured.jpg"
import SectionTitles from "../../../Components/SectionTitles/SectionTitles";

const Featured = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col justify-center items-center relative"
            style={{
                backgroundImage: `url(${featuredImg})`
            }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
                <div className="mb-16">
                    <SectionTitles
                        heading={"FROM OUR MENU"}
                        subHeading={"Check it out"}
                    />
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-8 flex justify-center items-center bg-gray-50">
                            <div className="relative group">
                                <img
                                    src={featuredImg}
                                    alt="Featured Dish"
                                    className="rounded-xl shadow-lg max-w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                            <div className="text-left space-y-6">
                                <div className="space-y-2">
                                    <p className="text-amber-600 font-medium text-sm uppercase tracking-widest">
                                        March 20, 2023
                                    </p>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                                        WHERE CAN I GET SOME?
                                    </h3>
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Discover our signature dish that combines traditional flavors with modern culinary techniques.
                                    Made with the finest locally-sourced ingredients and crafted by our expert chefs, this featured
                                    item represents the best of what Dine Easy Restaurant has to offer.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                                        Order Now
                                    </button>
                                    <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                        <div className="text-3xl font-bold text-amber-600 mb-2">4.8★</div>
                        <p className="text-gray-700 font-medium">Customer Rating</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                        <div className="text-3xl font-bold text-amber-600 mb-2">1000+</div>
                        <p className="text-gray-700 font-medium">Happy Customers</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                        <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
                        <p className="text-gray-700 font-medium">Signature Dishes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
