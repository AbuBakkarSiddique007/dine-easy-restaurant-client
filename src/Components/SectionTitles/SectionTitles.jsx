import React from 'react';

const SectionTitles = ({ heading, subHeading }) => {
    return (
        <div className='max-w-lg text-center mx-auto'>
            <p className=' text-xl text-yellow-500 italic pb-4 pt-10'>
                ---{subHeading} ---
            </p>
            <h2 className='text-4xl py-5 border-t-2 border-t-gray-400 border-b-2 border-b-gray-400 mb-12' >
                {heading}
            </h2>

        </div>
    );
};

export default SectionTitles;
