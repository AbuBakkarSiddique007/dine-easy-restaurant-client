import React, { useEffect, useState } from 'react';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import Loader from '../../../Shared/Loader/Loader';

// {
//         "_id": "642c155b2c4774f05c36ee99",
//         "name": "Goats Cheese Pizza",
//         "recipe": "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
//         "image": "https://cristianonew.ukrdevs.com/wp-content/uploads/2017/01/bbq-370x247.jpg",
//         "category": "pizza",
//         "price": 14.5
// }

const ChefRecom = () => {
    const [menuData, setMenuData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/MenuData/menu.json")
            .then((result) => result.json())
            .then((data) => {
                const specificData = data.filter((item) => item.category === "pizza").slice(0, 3)
                setMenuData(specificData)
                setLoading(false)
            })

    }
        , [])


    if (loading) return <Loader></Loader>
    console.log(menuData);

    return (
        <section>
            <SectionTitles
                heading={"CHEF RECOMMENDS"}
                subHeading={"Should Try"}
            ></SectionTitles>
            <div className='flex'>
                {
                    menuData.map(data => (
                        <div key={data._id} className="card bg-base-100 w-96 shadow-sm">
                            <figure className="px-10 pt-10">
                                <img
                                    src={data?.image}
                                    alt="Image"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{data?.name}</h2>
                                <p>{data?.recipe}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary uppercase">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default ChefRecom;
