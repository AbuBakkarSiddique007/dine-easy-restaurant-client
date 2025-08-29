import { Link } from 'react-router-dom';
import Cover from '../Cover/Cover';
import ItemMenuCard from '../ItemMenuCard/ItemMenuCard';

const MenuCategory = ({ bgImg, heading, subHeading, items, cat }) => {
    return (
        <div>
            {
                heading && (<Cover
                    bgImg={bgImg}
                    heading={heading}
                    subHeading={subHeading}
                />)
            }
            <div className='grid md:grid-cols-2 gap-4 p-4'>
                {
                    items?.map(item => <ItemMenuCard
                        key={item._id}
                        item={item}
                    />)
                }
            </div>
            {/* {heading || cat && (
                <Link
                    to={`/order/${heading.toLowerCase() ?? cat}`}
                    className="btn btn-success py-5"
                >
                    ORDER YOUR FAVOURITE FOOD{" "}
                    <span className="uppercase text-blue-600">{heading}</span>
                </Link>
            )} */}

            <Link
                to={`/order/${heading || cat}`}
                className="btn btn-success py-5"
            >
                ORDER YOUR FAVOURITE FOOD{" "}
                <span className="uppercase text-blue-600">{heading || cat}</span>
            </Link>


        </div >
    );
};

export default MenuCategory;
