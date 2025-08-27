import React, { useEffect, useState } from 'react';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import ItemMenuCard from '../../../Shared/ItemMenuCard/ItemMenuCard';


const PopularMenu = () => {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        fetch("/MenuData/menu.json")
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter((item) => item.category === "popular")
                setMenu(popularItems)
            })
    }
        , [])
    console.log(menu);


    return (
        <section>
            <SectionTitles
                heading="FROM OUR MENU"
                subHeading="Check it out"
            ></SectionTitles>

            <div className='grid md:grid-cols-2 space-x-3'>
                {
                    menu.map(item => <ItemMenuCard
                        key={item._id}
                        item={item}
                    ></ItemMenuCard>)
                }

            </div>

        </section>
    );
};

export default PopularMenu;
