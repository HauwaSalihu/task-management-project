import React from "react";
import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router";
import validator from "validator";
import axios from "axios";
import { serverUrl } from "../utils/helper";

function Signup() {
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleUserSignup() {
    if (validator.isEmpty(userInfo.name, { ignore_whitespace: true })) {
      return alert("Please provide a name");
    }
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
      const response = await axios.post(`${serverUrl}/auth/signup`, userInfo);

      if (response.data.status === "success") {
        console.log("account created successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl text-gray-700 font-medium ">
        Sign up to your task manager
      </h1>
      <form className="flex flex-col gap-4 max-w-[500px] w-full bg-blue-100 p-5 rounded">
        <Input
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          placeholder="name"
        />
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
        <Button onClick={handleUserSignup} type="primary">
          Sign Up
        </Button>
        <p>
          Already have an account ?{" "}
          <Link to={"/login"} className="hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
