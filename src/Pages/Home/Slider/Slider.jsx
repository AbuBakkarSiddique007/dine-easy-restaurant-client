import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/images/Slider/slide1.jpg';
import slide2 from '../../../assets/images/Slider/slide2.jpg';
import slide3 from '../../../assets/images/Slider/slide3.jpg';
import slide4 from '../../../assets/images/Slider/slide4.jpg';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';

const Slider = () => {
    return (
        <section>
            <SectionTitles
                subHeading={"From 11:00am to 10:00pm"}
                heading={"ORDER ONLINE"}
            ></SectionTitles>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <p className='text-3xl uppercase text-center -mt-15'>
                        Salads
                    </p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <p className='text-3xl uppercase text-center -mt-15'>
                        Soups
                    </p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <p className='text-3xl uppercase text-center -mt-15'>
                        Pizzas
                    </p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <p className='text-3xl uppercase text-center -mt-15'>
                        Desserts
                    </p>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Slider;
