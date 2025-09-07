import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";

const useMenu = () => {

    // const [menu, setMenu] = useState([])
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     fetch("http://localhost:5000/menu")
    //         .then((result) => result.json())
    //         .then((data) => {
    //             setMenu(data)
    //             setLoading(false)
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching Menu:", error)
    //             setLoading(false)
    //         })
    // }, [])
    // return [menu, loading]

    // Using Axios and TanStack Query :
    const axiosPublic = useAxiosPublic()

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu')
            return res.data
        }
    })

    return [menu, loading, refetch]
}

export default useMenu;
