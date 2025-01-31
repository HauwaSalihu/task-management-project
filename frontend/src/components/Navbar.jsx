import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/task/userSlice";

import { Avatar } from "antd";
const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

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
      <nav className="flex justify-around items-center shadow-xl p-4 bg-blue-100 text-gray-800 font-bold">
        <NavLink to={"/"}>
          <h1>Self Tracker</h1>
        </NavLink>
        <div className="flex gap-5 text-lg">
          <NavLink to={"/tasks"}>
            <h1>Tasks</h1>
          </NavLink>
          {user === null ? (
            <NavLink
              className={
                "hover:text-black transition-colors text-lg duration-500"
              }
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
        </div>
        {user !== null && (
          <div className="flex items-center gap-4">
            <Avatar
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
            >
              {user.name[0].toUpperCase()}
            </Avatar>
            <div>
              <p className="text-sm text-gray-400">{user.name}</p>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
