import React from 'react';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const UpdateItem = () => {
    const { name, recipe, image, category, price, _id } = useLoaderData()
    const navigate = useNavigate()
    // console.log("RRR",recipe);

    // console.log('Item to update:', { name, recipe, image, category, price, _id });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // Set default values for the form
        defaultValues: {
            name: name,
            category: category,
            price: price,
            recipe: recipe
        }
    });

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        try {
            // console.log("Form Data:", data);

            // Keep existing image by default
            let imageUrl = image;

            // Only upload new image if user selected a file
            if (data.image && data.image.length > 0) {
                // console.log("Uploading new image...");
                const imageFile = { image: data.image[0] };
                const res = await axiosPublic.post(img_hosting_api, imageFile, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                });

                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                    // console.log("New image uploaded:", imageUrl);
                } else {
                    throw new Error("Image upload failed");
                }
            }

            // Create updated menu item
            const updatedMenuItem = {
                name: data.name,
                category: data.category,
                recipe: data.recipe,
                price: parseFloat(data.price),
                image: imageUrl
            };

            // console.log("Updating item with:", updatedMenuItem);

            const menuResponse = await axiosSecure.patch(`/menu/${_id}`, updatedMenuItem);

            // console.log("Update response:", menuResponse.data);

            if (menuResponse.data.modifiedCount > 0 || menuResponse.data.acknowledged) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated successfully!`,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    navigate('/dashboard/manage-items');
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No Changes",
                    text: "No modifications were detected.",
                    confirmButtonText: "OK"
                });
            }

        } catch (error) {
            console.error("Update Error:", error);

            let errorMessage = "Something went wrong while updating the item!";

            if (error.response) {
                errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
            } else if (error.message) {
                errorMessage = error.message;
            }

            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: errorMessage,
                confirmButtonText: "Try Again"
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <SectionTitles
                heading="Update Item Details"
                subHeading="Modify and save changes to your selected item"
            />

            <div className="bg-white p-8 rounded-lg shadow-lg">
                {/* Image Preview */}
                {image && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Image:
                        </label>
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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

                    {/* Category and Price Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                {...register("category", {
                                    required: "Category is required"
                                })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select Category</option>
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

                    {/* File Upload*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Update Image (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            className="file-input file-input-bordered file-input-primary w-full"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            Leave empty to keep the current image
                        </p>
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                        )}
                    </div>

                    {/*  Buttons */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center gap-2"
                        >
                            <FaEdit />
                            Update Item
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/manage-items')}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
