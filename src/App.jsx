import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import LayoutComponent from "./components/Layout/LayoutComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddNotes from "./pages/AddNotes/AddNotes";
import ListNotes from "./pages/ListNotes/ListNotes";
import ListSubjects from "./pages/ListSubjects/ListSubjects";
import AddSubject from "./pages/AddSubject/AddSubject";
import ViewSubject from "./pages/ViewSubject/ViewSubject";
import SendPDF from "./pages/SendPDF/SendPDF";
import EditSubject from "./pages/EditSubject/EditSubject";

import ListOrders from "./pages/ListOrders/ListOrders";
import Alluser from "./pages/Users/Alluser";
import { useSelector } from "react-redux";
import AddFaculty from "./pages/AddFaculty/Addfaculty";

function App() {
  const { isAdminLoggedIn } = useSelector((state) => state.auth);

  console.log(isAdminLoggedIn, "is Admin Logged In");
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAdminLoggedIn ? <LayoutComponent /> : <Login />,
    },
    {
      path: "/login",
      element: !isAdminLoggedIn ? <Login /> : <LayoutComponent />,
    },
    {
      path: "/dashboard",
      element: isAdminLoggedIn ? <LayoutComponent /> : <Login />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "create-notes",
          element: <AddNotes />,
        },
        {
          path: "notes",
          element: <ListNotes />,
        },
        {
          path: "subjects",
          element: <ListSubjects />,
        },
        {
          path: "create-subject",
          element: <AddSubject />,
        },
        {
          path: "viewSubject/:id",
          element: <ViewSubject />,
        },
        {
          path: "editSubject/:id",
          element: <EditSubject />,
        },
        {
          path: "send-pdf",
          element: <SendPDF />,
        },
        {
          path: "create-faculty",
          element: <AddFaculty />,
        },
        {
          path: "orders",
          element: <ListOrders />,
        },
        {
          path: "all-users",
          element: <Alluser />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
