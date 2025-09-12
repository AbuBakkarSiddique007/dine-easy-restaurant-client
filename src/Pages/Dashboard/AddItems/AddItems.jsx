import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils, FaUpload } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2'
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const AddItemForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        try {
            // console.log("Form Data:", data);

            // Upload image
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(img_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });

            if (res.data.success) {
                // Create menu item
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    recipe: data.recipe,
                    price: parseFloat(data.price),
                    image: res.data.data.display_url
                };

                // Save to db
                const menuResponse = await axiosSecure.post("/menu", menuItem);

                if (menuResponse.data.insertedId) {
                    // Reset form
                    reset();

                    // Success alert
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} added to the menu`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!!!",
            });
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <SectionTitles
                heading="Add New Item"
                subHeading="What's new?"
            ></SectionTitles>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6">

                {/* Recipe Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipe Name *
                    </label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Recipe name is required"
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter recipe name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                    </label>
                    <select
                        {...register("category", {
                            required: "Category is required"
                        })}
                        defaultValue=""
                        className={`select select-primary w-full ${errors.category ? 'select-error' : ''
                            }`}
                    >
                        <option disabled value="">Select Category</option>
                        <option value="salad">Salad</option>
                        <option value="pizza">Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="dessert">Dessert</option>
                        <option value="drinks">Drinks</option>
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 0.01,
                                    message: "Price must be greater than 0"
                                }
                            })}
                            className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition ${errors.price ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="0.00"
                        />
                    </div>
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                {/* Recipe Details */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipe Details *
                    </label>
                    <textarea
                        {...register("recipe", {
                            required: "Recipe details are required",
                            minLength: {
                                value: 10,
                                message: "Recipe details must be at least 10 characters"
                            }
                        })}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-vertical ${errors.recipe ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Describe the recipe, ingredients, cooking method..."
                    />
                    {errors.recipe && (
                        <p className="text-red-500 text-sm mt-1">{errors.recipe.message}</p>
                    )}
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipe Image *
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            required: true
                        })}
                        className={`file-input file-input-primary w-full ${errors.image ? 'file-input-error' : ''
                            }`}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center gap-2"
                >
                    <FaUtensils />
                    Add Item
                </button>
            </form>
        </div >
    );
};

export default AddItemForm;
