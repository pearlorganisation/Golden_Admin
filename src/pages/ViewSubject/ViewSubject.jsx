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
      <div className="flex flex-row justify-between">
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
            Published Date :{" "}
            {moment(singleSubject?.createdAt).format("DD MMM YYYY")}
          </h2>
        </div>
      </div>

      {/* Banner Images */}
      <div>
        <h1 className="text-4xl">Subject Images</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 mt-12">
          {Array.isArray(singleSubject?.banner) &&
            singleSubject?.banner?.map((myImage, index) => (
              <img
                key={index}
                src={myImage.secure_url}
                alt="Blog Banner"
                className="w-24 h-24 object-cover rounded-md"
              />
            ))}
        </div>
      </div>

      {/* Brand */}
      <div className="flex flex-row gap-4">
        <h1 className="text-3xl">Discounted Price </h1>
        <h2 className="text-3xl text-gray-700">
          ₹ {singleSubject?.discountedPrice}
        </h2>
      </div>

      <div className="flex flex-row gap-4">
        <h1 className="text-3xl">Price </h1>
        <h2 className="text-3xl text-gray-700"> ₹ {singleSubject?.price}</h2>
      </div>

      <div className="mb-6 pb-6">
        <h1 className="text-5xl">PDF LINK </h1>
        <p className="text-gray-800 text-2xl leading-relaxed mt-4">
          <a
            href={singleSubject?.pdf?.secure_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Link{" "}
          </a>
        </p>
      </div>

      {/* Content */}
      <div className="mb-6 pb-6">
        <h1 className="text-5xl">Description </h1>
        <p className="text-gray-800 leading-relaxed mt-4">
          {singleSubject?.description}
        </p>
      </div>
    </div>
  );
};

export default ViewSubject;
