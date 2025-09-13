const SectionTitles = ({ heading, subHeading }) => {
    return (
        <div className='max-w-lg text-center mx-auto mb-8'>
            <p className='text-lg text-yellow-500 italic mb-3'>
                ---{subHeading}---
            </p>
            <h2 className='text-3xl md:text-4xl font-bold py-3 border-t-2 border-t-gray-400 border-b-2 border-b-gray-400 text-gray-800'>
                {heading}
            </h2>
        </div>
    );
};

export default SectionTitles;
