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
import Addfaculty from "./pages/AddFaculty/Addfaculty";
import ListOrders from "./pages/ListOrders/ListOrders";
import Alluser from "./pages/Users/Alluser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <LayoutComponent />,
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
        element: <Addfaculty />,
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
  {
    path: "/all-users",
    element: <Alluser />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
