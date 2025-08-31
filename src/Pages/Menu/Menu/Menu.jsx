import { Helmet } from "react-helmet-async";
import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import Cover from "../../../Shared/Cover/Cover";
import MenuCategory from "../../../Shared/MenuCategory/MenuCategory";
import Banner3 from "../../../assets/images/bgCover/banner3.jpg"
import useMenu from "../../../useMenu/useMenu";

import dessertBg from "../../../assets/images/menu/dessert-bg.jpeg"
import pizzaBg from "../../../assets/images/menu/pizza-bg.jpg"
import saladBg from "../../../assets/images/menu/salad-bg.jpg"
import soupBg from "../../../assets/images/menu/soup-bg.jpg"
import Loader from "../../../Shared/Loader/Loader";


const Menu = () => {
    const [menu, loading] = useMenu()
    const offered = menu.filter(item => item.category === "offered")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    const soup = menu.filter(item => item.category === "soup")
    const dessert = menu.filter(item => item.category === "dessert")

    if (loading) return <Loader></Loader>
    if (!menu.length) return <div className="text-center py-8">No menu items found</div>

    return (
        <div>
            <Helmet>
                <title>Our Menu | Dine Easy Restaurant</title>
            </Helmet>

            {/* Main Banner */}
            <Cover
                bgImg={Banner3}
                heading={"OUR MENU"}
                subHeading={"Would you like to try a dish?"}
            ></Cover>


            {/* TODAY'S OFFER */}
            <SectionTitles
                heading={"TODAY'S OFFER"}
                subHeading={"Don't miss"}
            ></SectionTitles>

            <MenuCategory
                bgImg={undefined}
                heading=""
                subHeading=""
                items={offered}
                cat="offered"
            >
            </MenuCategory>

            {/* SALADS */}
            <MenuCategory
                bgImg={saladBg}
                heading="salad"
                subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
                items={salad}
            >
            </MenuCategory>

            {/* PIZZA */}
            <MenuCategory
                bgImg={pizzaBg}
                heading="pizza"
                subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                items={pizza}
            >
            </MenuCategory>

            {/* SOUPS */}
            <MenuCategory
                bgImg={soupBg}
                heading="soup"
                subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                items={soup}
            >
            </MenuCategory>

            {/* DESSERTS */}
            <MenuCategory
                bgImg={dessertBg}
                heading="dessert"
                subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                items={dessert}
            >
            </MenuCategory>




        </div>
    );
};

export default Menu;
