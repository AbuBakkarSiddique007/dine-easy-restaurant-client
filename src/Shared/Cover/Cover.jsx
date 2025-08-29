import { Parallax, Background } from 'react-parallax';

const Cover = ({ bgImg, heading, subHeading }) => {
    return (

        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={bgImg}
            bgImageAlt="Cover Photo"
            strength={-200}
            className='py-20'
        >
            <div className="relative h-[400px] overflow-hidden mt-10">
                {/* <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${bgImg})`
                    }}
                >
                </div> */}

                <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
                    <div className=" flex flex-col justify-center items-center bg-black/60 shadow-2xl w-3xl h-72 max-w-4xl text-center">
                        <h1 className="text-5xl font-bold uppercase  mb-6 leading-tight drop-shadow-lg">
                            {heading}
                        </h1>
                        <p className="text-xl uppercase leading-relaxed drop-shadow-md">
                            {
                                subHeading
                            }
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;
