import { useEffect, useState } from "react";

const useMenu = () => {

    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:5000/menu")
            .then((result) => result.json())
            .then((data) => {
                setMenu(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching Menu:", error)
                setLoading(false)
            })
    }, [])

    return [menu, loading]

}

export default useMenu;
