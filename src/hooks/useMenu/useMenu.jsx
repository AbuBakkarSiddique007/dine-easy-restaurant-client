import { useEffect, useState } from "react";

const useMenu = () => {

    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/MenuData/menu.json")
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
