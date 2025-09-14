import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-[300px] w-full">
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
        </div>
    );
};

export default Loader;
