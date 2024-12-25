import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getSingleSubject } from "../../features/actions/subjectActions";

const ViewSubject = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { singleSubject } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getSingleSubject(id));
  }, []);

  console.log(singleSubject, "single Subject Info");

  return (
    <div className="mx-5 space-y-12 ml-72 mt-20">
      {/* Blog Title */}
      <div>
        <h1 className="text-3xl">
          Subject Name:{" "}
          <span className="text-orange-400">{singleSubject?.name}</span>
        </h1>
      </div>

      {/* Quantity */}
      <div>
        <h2 className="text-2xl">
          {" "}
          Created At : {moment(singleSubject?.createdAt).format("DD MMM YYYY")}
        </h2>
      </div>

      {/* Banner Image */}
      <div>
        <h1 className="text-4xl">Subject Main Image</h1>
        {singleSubject?.banner[0]?.secure_url && (
          <img
            src={singleSubject?.banner[0]?.secure_url}
            alt="Blog Banner"
            className="w-96 h-96 object-cover rounded-md"
          />
        )}
      </div>

      {/* Brand */}
      <div>
        <h1 className="text-5xl">Faculty </h1>
        <h2 className="text-2xl text-gray-700">
          {/* {singleBlog?.category?.blogCategoryName} */}
        </h2>
      </div>

      {/* Pricing */}
      {/* <div className="space-y-4">
        <h1 className="text-3xl">Author</h1>
        <div className="text-lg">
          <p>
            Email:{" "}
            <span className="font-semibold">{singleBlog?.author?.email}</span>
          </p>
          <p>
            Full Name:{" "}
            <span className="font-semibold">
              {singleBlog?.author?.fullName}
            </span>
          </p>
          <p>
            Role:{" "}
            <span className="font-semibold text-green-600">
              {singleBlog?.author?.role}
            </span>
          </p>
        </div>
      </div> */}

      {/* Content */}
      <div>
        <h1 className="text-5xl">Description </h1>
        <p className="text-gray-800 leading-relaxed mt-4">
          {singleSubject?.description}
        </p>
      </div>
    </div>
  );
};

export default ViewSubject;
