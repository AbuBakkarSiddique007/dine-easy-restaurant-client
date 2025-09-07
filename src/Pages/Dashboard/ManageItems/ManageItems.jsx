import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import useMenu from '../../../hooks/useMenu/useMenu';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';

const ManageItems = () => {
    const [menu] = useMenu()

    console.log(menu.length);

    const handleUpdate = (item) => {
        console.log(item);


    }
    const handleDelete = (item) => {

        console.log(item);

    }

    return (
        <div>
            <SectionTitles
                heading="MANAGE ALL ITEMS"
                subHeading="Hurry Up!"
            ></SectionTitles>

            <div>
                <h1 className=' text-3xl font-bold py-2 uppercase'>
                    Total items: {menu.length}
                </h1>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-orange-400 text-white">
                                <tr>
                                    <th className="rounded-tl-lg">Serial</th>
                                    <th>ITEM IMAGE</th>
                                    <th>ITEM NAME</th>
                                    <th>PRICE</th>
                                    <th>ACTION</th>
                                    <th className="rounded-tr-lg">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menu.map((item, index) => (
                                    <tr key={item._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-semibold">
                                            {item.name}
                                        </td>
                                        <td className="font-medium">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <th>
                                            <button
                                                className="btn btn-error text-2xl"
                                                onClick={() => handleUpdate(item)}
                                                title="Delete item"
                                            >
                                                <MdEditDocument />
                                            </button>
                                        </th>
                                        <th>
                                            <button
                                                className="btn btn-error text-2xl"
                                                onClick={() => handleDelete(item)}
                                                title="Delete item"
                                            >
                                                <MdDeleteForever />
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageItems;
