import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils, FaUpload, FaTags, FaDollarSign, FaFileImage } from 'react-icons/fa';
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
        <div className="max-w-3xl mx-auto p-8">
            <div className="text-center mb-8">
                <SectionTitles
                    heading="Add New Item"
                    subHeading="What's new?"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <FaUtensils className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Menu Item Details</h3>
                            <p className="text-sm text-gray-600">Fill in the information below to add a new item</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="group">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                                <FaUtensils className="text-green-500" />
                                <span>Recipe Name *</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Recipe name is required"
                                })}
                                className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Enter delicious recipe name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                                    <span>⚠️</span>
                                    <span>{errors.name.message}</span>
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                                    <FaTags className="text-blue-500" />
                                    <span>Category *</span>
                                </label>
                                <select
                                    {...register("category", {
                                        required: "Category is required"
                                    })}
                                    defaultValue=""
                                    className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 ${errors.category ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <option disabled value="">Select Category</option>
                                    <option value="salad">🥗 Salad</option>
                                    <option value="pizza">🍕 Pizza</option>
                                    <option value="soup">🍜 Soup</option>
                                    <option value="dessert">🍰 Dessert</option>
                                    <option value="drinks">🥤 Drinks</option>
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                                        <span>⚠️</span>
                                        <span>{errors.category.message}</span>
                                    </p>
                                )}
                            </div>

                            <div className="group">
                                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                                    <FaDollarSign className="text-green-500" />
                                    <span>Price *</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
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
                                        className={`w-full pl-10 pr-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 ${errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                                        <span>⚠️</span>
                                        <span>{errors.price.message}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="group">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                                <span className="text-purple-500">📝</span>
                                <span>Recipe Details *</span>
                            </label>
                            <textarea
                                {...register("recipe", {
                                    required: "Recipe details are required",
                                    minLength: {
                                        value: 10,
                                        message: "Recipe details must be at least 10 characters"
                                    }
                                })}
                                rows={5}
                                className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 resize-vertical ${errors.recipe ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                placeholder="Describe the recipe, ingredients, cooking method, special features..."
                            />
                            {errors.recipe && (
                                <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                                    <span>⚠️</span>
                                    <span>{errors.recipe.message}</span>
                                </p>
                            )}
                        </div>

                        <div className="group">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                                <FaFileImage className="text-orange-500" />
                                <span>Recipe Image *</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image", {
                                        required: true
                                    })}
                                    className={`w-full px-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 ${errors.image ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                />
                            </div>
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                                    <span>⚠️</span>
                                    <span>Image is required</span>
                                </p>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-green-600 hover:via-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-500/30 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <FaUtensils className="text-xl" />
                                <span>Add Item to Menu</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItemForm;
