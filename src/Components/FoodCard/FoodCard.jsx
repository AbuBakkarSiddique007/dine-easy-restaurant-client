import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useCart from "../../hooks/useCart/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()

    const location = useLocation()
    const navigate = useNavigate()

    const handleAddToCart = (food) => {
        // console.log(food);

        if (user && user.email) {
            // console.log("User exist", user.email);
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                price,
                image
            }

            axiosSecure.post("/carts", cartItem)
                .then((result) => {
                    // console.log(result.data);

                    if (result.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} is added to your Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        // Refetch the cart to update the cart items
                        refetch()
                    }

                })
                .catch((error) => {
                    // console.log("Error:", error);
                })
        }
        else {
            Swal.fire({
                title: "You are not logged In!",
                text: "You want to login first?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login First!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-sm mb-4">
            <figure className="relative">
                <img
                    src={image}
                    alt={name}
                    className="rounded-xl"
                />
                <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 py-3 rounded-lg text-sm font-semibold">
                    ${price}
                </span>

            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-outline border-0 border-b-3 border-[#BB8506] text-[#BB8506] hover:bg-[#111827] bg-gray-400/20"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
