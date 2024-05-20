import { CgAdd } from "react-icons/cg";
import { FaCalendar, FaHome, FaList, FaShoppingCart } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const active = "font-bold text-white";

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen p-6 bg-orange-400 space-y-4">
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
            <span>My Cart</span>
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
          to="/"
          className={({ isActive }) => (isActive ? active : "text-black")}
        >
          <span className="flex items-center gap-1">
            <MdMenu />
            <span>Menu</span>
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
