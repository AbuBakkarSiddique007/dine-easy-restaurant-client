import Cover from '../Cover/Cover';
import ItemMenuCard from '../ItemMenuCard/ItemMenuCard';

const MenuCategory = ({ bgImg, heading, subHeading, items }) => {
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
        </div>
    );
};

export default MenuCategory;
