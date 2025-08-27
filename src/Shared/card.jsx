import React from 'react';

const MenuCard = ({
    image = "/api/placeholder/80/80",
    title = "TUNA NIÇOISE",
    description = "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
    price = "$14.5"
}) => {
    return (
        <div className="flex items-start gap-4 p-4 bg-white hover:bg-gray-50 transition-colors duration-200">
            {/* Image */}
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-20 h-20 rounded-full object-cover bg-gray-200"
                />
            </div>

            {/* Content */}
            <div className="flex-grow">
                {/* Title with dashed line */}
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-800 font-medium text-sm tracking-wider uppercase">
                        {title}
                    </h3>
                    <div className="flex-grow mx-3 border-b border-dashed border-gray-400"></div>
                    <span className="text-amber-600 font-semibold text-lg">
                        {price}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

// Example usage with multiple items
const MenuSection = () => {
    const menuItems = [
        {
            image: "/api/placeholder/80/80",
            title: "TUNA NIÇOISE",
            description: "Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce",
            price: "$14.5"
        },
        {
            image: "/api/placeholder/80/80",
            title: "SALMON TERIYAKI",
            description: "Fresh salmon fillet glazed with house-made teriyaki sauce, served with jasmine rice and steamed vegetables",
            price: "$18.0"
        },
        {
            image: "/api/placeholder/80/80",
            title: "BEEF WELLINGTON",
            description: "Premium beef tenderloin wrapped in puff pastry with mushroom duxelles and prosciutto",
            price: "$32.0"
        }
    ];

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Our Menu
            </h2>
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                {menuItems.map((item, index) => (
                    <MenuCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default MenuSection;
