import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isPdfOrderOpen, setIsPdfOrderOpen] = useState(false);
  return (
    <div>
      <aside className="bg-gray-800 text-white w-64 py-8 px-2 fixed top-0 bottom-0 z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">GOLDEN</h2>
        </div>
        <nav>
          {/* User Section */}
          <div className="mb-4">
            <div
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span>User</span>
              {isUsersOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isUsersOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="all-users">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    All Users
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/* Subjects Section */}
          <div className="mb-4">
            <div
              onClick={() => setIsSubjectOpen(!isSubjectOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span>Subjects </span>
              {isSubjectOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isSubjectOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="create-subject">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    Create Subject
                  </li>
                </Link>
                <Link to="subjects">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    List Subjects
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/*------------Notes section---------------*/}

          {/* Orders Section */}
          <div className="mb-1">
            <div
              onClick={() => setIsOrdersOpen(!isOrdersOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              {" "}
              <span>Orders</span>
              {isOrdersOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isOrdersOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="orders">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span> List Orders </span>
                    </div>
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/** for sending the pdf by admin panel */}
          <div className="mb-4">
            <Link
              to="send-pdf"
              className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              Send PDF
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
