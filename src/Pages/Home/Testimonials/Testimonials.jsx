import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("/Reviews/reviews.json")
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])

    return (
        <div className="pb-20 pt-10">
            <SectionTitles
                heading={"TESTIMONIALS"}
                subHeading={"What Our Clients Say"}
            ></SectionTitles>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper py-20">
                    {
                        reviews.map(review => (
                            <SwiperSlide
                                key={review._id}
                                className="px-20 "
                            >
                                <div className="flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg p-6 text-center">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review?.rating}
                                        readOnly
                                    />

                                    <span className="text-4xl"><FaQuoteLeft />   </span>
                                    <h2 className="font-semibold text-yellow-400 mb-2 text-3xl">{review.name}</h2>
                                    <p className="mb-3 text-sm">
                                        {review.details}
                                    </p>
                                </div>
                            </SwiperSlide>))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
