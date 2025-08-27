const ItemMenuCard = ({ item }) => {
    const { name, recipe, image, price } = item

    return (
        <div className="flex items-start gap-4 py-5 p-4 bg-white hover:bg-gray-50 transition-colors duration-200">
            <div className="flex-shrink-0 mr-5">
                <img
                    src={image}
                    alt={name}
                    className="w-[118px] h-[104px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px] object-cover bg-gray-200"
                />
            </div>

            <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-800 font-medium text-sm tracking-wider uppercase">
                        {name}
                    </h3>
                    <div className="flex-grow mx-3 border-b border-dashed border-gray-400"></div>
                    <span className="text-amber-600 font-semibold text-lg">
                        {price}
                    </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {recipe}
                </p>
            </div>
        </div>
    );
};

export default ItemMenuCard;
