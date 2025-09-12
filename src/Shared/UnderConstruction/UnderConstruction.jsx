import UnderConstructionImg from "../../assets/images/UnderConstruction/UnderConstruction.jpg";

const UnderConstruction = () => {
    return (
        <div className="flex justify-center items-center rounded-2xl w-1/2 h-1/2 overflow-hidden">
            <img
                src={UnderConstructionImg}
                alt="Under Construction"
                className="w-full h-full object-contain"
            />
        </div>
    );
};

export default UnderConstruction;
