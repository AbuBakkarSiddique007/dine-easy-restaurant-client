import MenuCard from '../PopularMenu/PopularMenu';
import Advertisement from '../Advertisement/Advertisement';
import Banner from '../Banner/Banner';
import Slider from '../Slider/Slider';
import ChefRecom from '../ChefRecom/ChefRecom';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Slider></Slider>
            <Advertisement></Advertisement>
            <MenuCard></MenuCard>
            <ChefRecom></ChefRecom>

        </div>
    );
};

export default Home;
