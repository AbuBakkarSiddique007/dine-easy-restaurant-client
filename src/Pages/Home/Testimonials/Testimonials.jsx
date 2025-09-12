import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
    const axiosPublic = useAxiosPublic();

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get("/reviews");
            return res.data;
        }
    });

    return (
        <div className="pb-20 pt-10">
            <SectionTitles
                heading="TESTIMONIALS"
                subHeading="What Our Clients Say"
            />

            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper py-20"
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    1024: { slidesPerView: 2, spaceBetween: 30 },
                }}
            >
                {reviews.map(review => (
                    <SwiperSlide key={review._id} className="px-4 flex">
                        <div className="flex flex-col justify-between items-center gap-4 rounded-xl shadow-lg p-6 text-center transition-transform hover:scale-105 hover:shadow-2xl w-full h-full min-h-[350px]">

                            <div className="w-16 h-16 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 mb-2">
                                <img
                                    src={review?.userPhoto}
                                    alt={review?.name || 'Anonymous'}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h2 className="font-semibold text-lg md:text-xl text-yellow-400">
                                {review.name || 'Anonymous'}
                            </h2>

                            <Rating
                                style={{ maxWidth: 150 }}
                                value={review.rating || 0}
                                readOnly
                            />

                            <span className="text-3xl text-gray-300">
                                <FaQuoteLeft />
                            </span>

                            <p className="text-sm md:text-base text-gray-600">
                                {review.review}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;
