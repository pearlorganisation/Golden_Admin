import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlluser } from "../../features/actions/authActions";

function Alluser() {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getAlluser());
  }, [dispatch]);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return <div className="text-center text-red-500 p-4">Error: {message}</div>;

  return (
    <div className="ml-72 mt-12">
      {isSuccess && user?.data?.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Verified
                </th>
              </tr>
            </thead>
            <tbody>
              {user.data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {item.email}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={
                        item.isVerified ? "text-green-500" : "text-red-500"
                      }
                    >
                      {item.isVerified ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">No users found</div>
      )}
    </div>
  );
}

export default Alluser;
