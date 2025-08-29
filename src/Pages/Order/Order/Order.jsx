import Cover from '../../../Shared/Cover/Cover';
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import CoverImg from "../../../assets/images/bgCover/banner2.jpg"
import { useState } from 'react';
import OrderTab from '../OrderTab/OrderTab';
import useMenu from '../../../useMenu/useMenu';
import Loader from '../../../Shared/Loader/Loader';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ["offered", "salad", "pizza", "soup", "dessert", "drinks"]
    const { category } = useParams()

    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex === -1 ? 0 : initialIndex)

    console.log(tabIndex);
    console.log(category);


    const [menu, loading] = useMenu()
    const offered = menu.filter(item => item.category === "offered")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    const soup = menu.filter(item => item.category === "soup")
    const dessert = menu.filter(item => item.category === "dessert")
    const drinks = menu.filter(item => item.category === "drinks")

    if (loading) return <Loader></Loader>

    return (
        <div>
            <Helmet>
                <title> Order | Dine Easy Restaurant</title>
            </Helmet>


            <Cover
                bgImg={CoverImg}
                heading="Order Your Favourite Food"
                subHeading="Would you like to try a dish?"
            ></Cover>

            {/* Tabls: */}
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <div className='flex justify-center items-center py-10'>
                    <TabList>
                        {/* <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab> */}

                        <Tab style={{ color: tabIndex === 0 ? '#3b82f6' : '#6b7280' }}>offered</Tab>
                        <Tab style={{ color: tabIndex === 1 ? '#3b82f6' : '#6b7280' }}>Salad</Tab>
                        <Tab style={{ color: tabIndex === 2 ? '#3b82f6' : '#6b7280' }}>Pizza</Tab>
                        <Tab style={{ color: tabIndex === 3 ? '#3b82f6' : '#6b7280' }}>Soup</Tab>
                        <Tab style={{ color: tabIndex === 4 ? '#3b82f6' : '#6b7280' }}>Desserts</Tab>
                        <Tab style={{ color: tabIndex === 5 ? '#3b82f6' : '#6b7280' }}>Drinks</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <OrderTab
                        items={offered}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={salad}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={pizza}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={soup}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={dessert}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={drinks}
                    ></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;
