import { useDispatch } from "react-redux";
import { logout } from "../../../features/slices/authSlice";
import { axiosInstance } from "../../../services/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../features/actions/authActions";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutAdmin = async () => {
    try {
      const result = await dispatch(userLogout()).unwrap();
      // console.log("Logout API result:", result);

      dispatch(logout());

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="text-xl font-bold">GOLDEN </div>

      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 bg-red-500 rounded-md text-white"
          onClick={logoutAdmin}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
