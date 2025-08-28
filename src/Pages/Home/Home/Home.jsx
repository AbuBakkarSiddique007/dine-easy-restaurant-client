import { Helmet } from 'react-helmet-async';
import MenuCard from '../PopularMenu/PopularMenu';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Slider from '../Slider/Slider';
import ChefRecom from '../ChefRecom/ChefRecom';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import CallUs from '../CallUs/CallUs';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Dine Easy Restaurant</title>
            </Helmet>

            <Banner></Banner>
            <Slider></Slider>
            <Advertisement></Advertisement>
            <MenuCard></MenuCard>
            <CallUs></CallUs>
            <ChefRecom></ChefRecom>
            <Featured></Featured>
            <Testimonials></Testimonials>

        </div>
    );
};

export default Home;
