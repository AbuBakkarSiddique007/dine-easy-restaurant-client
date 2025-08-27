import MenuCard from '../PopularMenu/PopularMenu';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Slider from '../Slider/Slider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Slider></Slider>
            <Advertisement></Advertisement>
            <MenuCard></MenuCard>

        </div>
    );
};

export default Home;
