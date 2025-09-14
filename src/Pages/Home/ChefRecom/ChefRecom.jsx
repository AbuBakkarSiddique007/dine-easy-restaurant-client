import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import Loader from '../../../Shared/Loader/Loader';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const ChefRecom = () => {
    const axiosPublic = useAxiosPublic()
    const { data: menuData = [], isPending: loading } = useQuery({
        queryKey: ['menuData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu')
            const specificData = res.data.filter((item) => item.category === "pizza").slice(0, 3)
            return specificData
        }
    })

    if (loading) return <Loader></Loader>

    return (
        <section>
            <SectionTitles
                heading={"CHEF RECOMMENDS"}
                subHeading={"Should Try"}
            ></SectionTitles>
            <div className='md:flex'>
                {
                    menuData.map(data => (
                        <div key={data._id} className="card bg-base-100 w-96 shadow-sm">
                            <figure className="px-10 pt-10">
                                <img
                                    src={data?.image}
                                    alt="Image"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{data?.name}</h2>
                                <p>{data?.recipe}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary uppercase">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default ChefRecom;
