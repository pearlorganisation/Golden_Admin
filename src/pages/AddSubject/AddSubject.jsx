import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import { createSubject } from "../../features/actions/subjectActions";

const AddSubject = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [pdf, setPdf] = useState(null);

  const {
    register,
    handleSubmit,
    watch,

    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      pages: "",
      price: "",
      banner: null,
      pdf: null,
    },
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.subject
  );

  /** handle for selecting the images */
  const handleSelectImage = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSelectPdf = (e) => {
    setPdf(e.target.files[0]);
  };

  const onSubmit = (data) => {
    const formData = { ...data, banner: selectedImages, pdf };
    setLoading(true);
    dispatch(createSubject(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSelectedImages([]);
      setPdf(null);
      setImagePreview(null);
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (isError) {
      toast.error(message || "An error occurred");
    }
  }, [isError, message]);

  return (
    <div className="ml-72">
      <div className="container mx-auto p-10">
        <h1 className="text-4xl"> Add Subject </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-md shadow-md p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="images"
              className="block text-4xl font-medium text-gray-700 mb-2"
            >
              Upload Subject images
            </label>
            <input
              type="file"
              id="banner"
              accept="image/*"
              multiple
              {...register("banner", {
                required: "Subject Images are required",
              })}
              onChange={handleSelectImage}
              className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${
                errors.banner ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          {imagePreview && (
            <div className="flex space-x-4">
              {imagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="h-20 w-20 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Subject Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`shadow-sm bg-gray-50 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
              placeholder="Enter Subject Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Subject Description */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Subject Description
            </label>
            <input
              type="text"
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
              placeholder="Enter Subject Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Subject Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Subject Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", {
                required: "Price is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
              placeholder="Enter Subject Price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Subject Discounted Price */}
          <div className="mb-6">
            <label
              htmlFor="discountedPrice"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Subject Discounted Price
            </label>
            <input
              type="number"
              id="discountedPrice"
              {...register("discountedPrice", {
                required: " Discounted Price is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.discountedPrice ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
              placeholder="Enter Subject Discounted Price"
            />
            {errors.discountedPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discountedPrice.message}
              </p>
            )}
          </div>

          {/* Subject Pages */}
          <div className="mb-6">
            <label
              htmlFor="pages"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Subject Pages
            </label>
            <input
              type="number"
              id="pages"
              {...register("pages", {
                required: " Pages is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.pages ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
              placeholder="Enter Pages"
            />
            {errors.pages && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pages.message}
              </p>
            )}
          </div>

          {/* Subject PDF Upload */}
          <div className="mb-6">
            <label
              htmlFor="pdf"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Upload Subject PDF
            </label>
            <input
              type="file"
              id="pdf"
              accept=".pdf"
              {...register("pdf", {
                required: "PDF file is required",
              })}
              onChange={handleSelectPdf}
              className={`block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 ${
                errors.pdf ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.pdf && (
              <p className="text-red-500 text-sm mt-1">{errors.pdf.message}</p>
            )}
          </div>

          <>
            <button
              type="submit"
              disabled={isLoading}
              className={`p-3 rounded-lg transition-colors ${
                loading
                  ? "bg-gray-400 text-gray-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Saving..." : "Save Subject"}
            </button>
          </>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
