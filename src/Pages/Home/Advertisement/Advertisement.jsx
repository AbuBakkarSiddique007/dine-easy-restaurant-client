import bgImg from '../../../assets/images/advertisement/chef-service.jpg'

const Advertisement = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div
                className="bg-cover bg-center bg-no-repeat h-96 rounded-lg relative flex items-center justify-center bg-fixed"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                <div className="absolute inset-0 bg-black/40 rounded-lg"></div>

                <div className="relative z-10 max-w-3xl mx-auto px-8 py-12 bg-white/90 backdrop-blur-sm rounded-lg text-center shadow-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        Where Great Food Meets Great Service
                    </h1>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        At Dine Easy Restaurant, we believe dining should be effortless and enjoyable. From our carefully curated menu to our friendly staff, every detail is designed to make your visit comfortable, delicious, and unforgettable.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;
