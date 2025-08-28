import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import ItemMenuCard from '../../../Shared/ItemMenuCard/ItemMenuCard';
import useMenu from '../../../useMenu/useMenu';


const PopularMenu = () => {
    // const [menu, setMenu] = useState([])
    // useEffect(() => {
    //     fetch("/MenuData/menu.json")
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter((item) => item.category === "popular")
    //             setMenu(popularItems)
    //         })
    // }
    //     , [])
    // console.log(menu);


    // New: Using custom hook:
    const [menu, loading] = useMenu()

    if (loading) return <div>Loading menu...</div>
    // console.log(menu);

    const popularItems = menu.filter(item => item.category === "popular")





    return (
        <section>
            <SectionTitles
                heading="FROM OUR POPULAR MENU"
                subHeading="Check it out"
            ></SectionTitles>

            <div className='grid md:grid-cols-2 space-x-3'>
                {
                    popularItems.map(item => <ItemMenuCard
                        key={item._id}
                        item={item}
                    ></ItemMenuCard>)
                }

            </div>

        </section>
    );
};

export default PopularMenu;
