import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/task/userSlice";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUserLogout() {
    dispatch(updateUser(null));
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-200">
        <NavLink to={"/"}>
          <h1>Self Tracker</h1>
        </NavLink>
        {user === null ? (
          <NavLink
            className={"hover:text-black transition-colors duration-500"}
            to={"/login"}
          >
            Login
          </NavLink>
        ) : (
          <button
            onClick={handleUserLogout}
            className={
              "hover:text-black transition-colors duration-500 text-lg"
            }
          >
            Logout
          </button>
        )}
        {user !== null && (
          <div>
            <p>{user.name}</p>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
