import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "../../features/actions/subjectActions";
import { useForm } from "react-hook-form";
import { sendPdfByAdmin } from "../../features/actions/sendPdfByAdminAction";

const SendPDF = () => {
  const dispatch = useDispatch();
  const { subjects, pagination } = useSelector((state) => state.subject);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedPdfUrl, setSelectedPdfUrl] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleCardSelect = (pdfUrl, checked) => {
    if (checked) {
      setSelectedPdfUrl((prev) => [...prev, pdfUrl]);
    } else {
      setSelectedPdfUrl((prev) => prev.filter((url) => url !== pdfUrl));
    }
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allPdfUrls = subjects.map((subject) => subject.pdf.secure_url);
      setSelectedPdfUrl(allPdfUrls);
    } else {
      setSelectedPdfUrl([]);
    }
  };

  console.log("the selected urls are", selectedPdfUrl);

  const submitForm = (data) => {
    const formData = { ...data, selectedPdfUrl };
    dispatch(sendPdfByAdmin(formData));
    console.log(data); // Handle form submission
  };

  useEffect(() => {
    dispatch(getAllSubjects({ page: currentPage }));
  }, [currentPage]);

  return (
    <div className="ml-72 ">
      {/**form field for getting the user details */}
      <div className="px-12">
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^\d{10}$/, // Basic 10-digit validation
                  message: "Invalid mobile number format",
                },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
      {/** div for selecting the notes */}
      <div className="mt-6 mb-4 flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">
          Select All Subjects
        </label>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 px-12">
        {subjects?.map((subject) => (
          <div
            key={subject._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="relative">
              <img
                src={subject.banner[0].secure_url}
                alt={subject.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <input
                  type="checkbox"
                  checked={selectedPdfUrl.includes(subject.pdf.secure_url)}
                  onChange={(e) =>
                    handleCardSelect(subject.pdf.secure_url, e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-600">{subject.pages} pages</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-600">
                  ₹{subject.discountedPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{subject.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {subject.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendPDF;
