import React from "react";
import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router";
import validator from "validator";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/task/userSlice";
import { serverUrl } from "../utils/helper";

function Login() {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleUserLogin() {
    if (validator.isEmail(userInfo.email) === false) {
      console.log("Please provide a valid email");
      return;
    }

    if (
      validator.isStrongPassword(userInfo.password, {
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      }) === false
    ) {
      console.log("Please provide a strong password");
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/auth/login`, userInfo);

      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(updateUser(response.data.user));
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto px-8 h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl text-gray-700 font-medium ">
        Login to your task manager
      </h1>
      <form className="flex flex-col gap-4 max-w-[500px] w-full bg-blue-100 p-5 rounded">
        <Input
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          placeholder="Email"
        />
        <Input.Password
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          placeholder="Password"
        />
        <Button onClick={handleUserLogin} type="primary">
          Login
        </Button>
        <p>
          Dont have an account ? <Link to={"/signup"}>Sign up heere</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
