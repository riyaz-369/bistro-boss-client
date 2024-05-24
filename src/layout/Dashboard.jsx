import { CgAdd } from "react-icons/cg";
import {
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUser,
  FaUtensils,
  FaVoicemail,
} from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  // TODO: get isAdmin value  from the database
  const [isAdmin] = useAdmin();

  const active = "font-bold text-white";

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen p-6 bg-orange-400 space-y-4">
        {isAdmin ? (
          <>
            <NavLink
              to="/dashboard/adminHome"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaHome />
                <span>Admin Home</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/addItems"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaUtensils />
                <span>Add Items</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/manageItems"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaList />
                <span>Manage Items</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/manageBookings"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaBook />
                <span>Manage Bookings</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaUser />
                <span>All Users</span>
              </span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaHome />
                <span>User Home</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/reservation"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaCalendar />
                <span>User Reservation</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaShoppingCart />
                <span>My Cart</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/add"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <CgAdd />
                <span>Add Items</span>
              </span>
            </NavLink>
            <NavLink
              to="/dashboard/list"
              className={({ isActive }) => (isActive ? active : "text-black")}
            >
              <span className="flex items-center gap-1">
                <FaList />
                <span>List</span>
              </span>
            </NavLink>
          </>
        )}

        {/* shared navLinks */}
        <div className="divider"></div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active : "text-black")}
        >
          <span className="flex items-center gap-1">
            <FaHome />
            <span>Home</span>
          </span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? active : "text-black")}
        >
          <span className="flex items-center gap-1">
            <MdMenu />
            <span>Menu</span>
          </span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? active : "text-black")}
        >
          <span className="flex items-center gap-1">
            <FaVoicemail />
            <span>Contact</span>
          </span>
        </NavLink>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
