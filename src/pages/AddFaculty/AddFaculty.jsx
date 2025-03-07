import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CreateFaculty } from "../../features/actions/facultyAction";
import { useDispatch } from "react-redux";

function AddFaculty() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: errors,
  } = useForm({
    defaultValues: {
      name: "",
      institute: "",
    },
  });

  const onSubmit = (data) => {
    const formData = { ...data };
    dispatch(CreateFaculty(formData));
  };
  return (
    <div>
      <div className="ml-72">
        <div className="container mx-auto p-10">
          <h1 className="text-4xl">Add Faculty</h1>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-white rounded-md shadow-md p-8"
          >
            <div className="mb-6">
              <label
                htmlFor="FacultyName"
                className="block text-2xl font-medium text-gray-700 mb-2"
              >
                FacultyName
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "name is required" })}
                className={`shadow-md  bg-gray-50 border 
        ${
          errors.title ? "border-red-500" : " border-gray-300"
        }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 `}
                placeholder="enter faculty name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}{" "}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="institute"
                className="block text-2xl font-medium text-gray-700 mb-2"
              >
                institute{" "}
              </label>
              <input
                type="text"
                id="institute"
                {...register("institute", {
                  required: "institute is required",
                })}
                className={`shadow-md bg-gray-50 border
${
  errors.institute ? "border-red-500" : "border-gray-300"
} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                placeholder="enter institute Name"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
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
    </div>
  );
}

export default AddFaculty;
