import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import Cover from "../../../Shared/Cover/Cover";
import Banner3 from "../../../assets/images/bgCover/banner3.jpg"


const Menu = () => {
    return (
        <div>
            <Cover
                bgImg={Banner3}
                heading={"OUR MENU"}
                subHeading={"Would you like to try a dish?"}
            ></Cover>


        </div>
    );
};

export default Menu;
