import React from 'react';

const OrderTab = ({ items }) => {
    return (
        <div className='grid md:grid-cols-3 justify-center items-center'>
            {
                items.map(item => (<div className="card bg-base-100 w-96 shadow-sm mb-4">
                    <figure className=" relative">
                        <img
                            src={item?.image}
                            alt="Image"
                            className="rounded-xl"
                        />
                        <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 p-3 rounded-lg text-sm font-semibold">
                            ${item?.price}
                        </span>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{item?.name}</h2>
                        <p>{item?.recipe}</p>
                        <div className="card-actions">
                            <button className="btn btn-outline border-0 border-b-3 border-[#BB8506] text-[#BB8506] hover:bg-[#111827] bg-gray-400/20 ">Add to Cart</button>
                        </div>
                    </div>
                </div>))
            }
        </div>
    );
};

export default OrderTab;
