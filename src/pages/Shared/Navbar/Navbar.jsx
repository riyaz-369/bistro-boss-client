import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const activeClassName = "text-yellow-300 font-bold uppercase";
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const admin = isAdmin?.admin;
  console.log(admin);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? activeClassName : "font-bold uppercase"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/contactUs"
        className={({ isActive }) =>
          isActive ? activeClassName : "font-bold uppercase"
        }
      >
        contact us
      </NavLink>
      {user && admin && (
        <NavLink
          to="/dashboard/adminHome"
          className={({ isActive }) =>
            isActive ? activeClassName : "font-bold uppercase"
          }
        >
          DASHBOARD
        </NavLink>
      )}
      {user && !admin && (
        <NavLink
          to="/dashboard/userHome"
          className={({ isActive }) =>
            isActive ? activeClassName : "font-bold uppercase"
          }
        >
          DASHBOARD
        </NavLink>
      )}
      <NavLink
        to="menu"
        className={({ isActive }) =>
          isActive ? activeClassName : "font-bold uppercase"
        }
      >
        Our Menu
      </NavLink>
      <NavLink
        to="/order/salad"
        className={({ isActive }) =>
          isActive ? activeClassName : "font-bold uppercase"
        }
      >
        Order Food
      </NavLink>
      <NavLink to="/dashboard/cart">
        <button className="flex items-center gap-1">
          <FaShoppingCart size={20} />
          <div className="badge badge-secondary">{cart?.length}</div>
        </button>
      </NavLink>
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-black text-white p-4 bg-opacity-30">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <button className="uppercase text-wrap">
          <h1 className=" text-2xl">Bistro Boss</h1>
          <p className="text-sm">R e s t a u r a n t</p>
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button
              className="uppercase font-bold btn-warning btn"
              onClick={logOut}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="uppercase font-bold btn-warning btn">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
