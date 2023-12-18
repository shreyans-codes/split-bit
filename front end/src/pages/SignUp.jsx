import React, { useRef, useState } from "react";
import InputField from "../component/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAsync } from "../redux/authSlice";
import toast from "react-hot-toast";

const SignUp = () => {
  const mfaEnableRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkValues = () => {
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (
      username === "" ||
      password === "" ||
      firstName === "" ||
      email === ""
    ) {
      toast.error("Please fill the details");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a correct email");
      return false;
    }
    if (password != confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      return false;
    }
    return true;
  };

  const signUpToAccount = async (event) => {
    event.preventDefault();
    if (!checkValues()) {
      console.log("Here");
      return;
    }
    const userData = {
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      mfaEnabled: mfaEnableRef.current.checked,
    };
    dispatch(registerAsync(userData)).then((res) => {
      console.log(res);
      if (authState.isError) {
        toast.error(authState.message);
        return;
      } else {
        if (mfaEnableRef.current.checked)
          navigate("/verify", {
            state: {
              username: username,
              password: password,
            },
          });
        else navigate("/login");
      }
    });
  };

  return (
    <div>
      <div className="flex mt-2 justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
              Sign Up
            </span>
          </h2>
          <form>
            <div className="mb-2">
              <InputField
                id={"email"}
                type={"email"}
                label={"Email"}
                placeholder={"Enter your email"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <InputField
                id={"username"}
                type={"text"}
                label={"Username"}
                placeholder={"Enter your username"}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <InputField
                id={"fname"}
                type={"text"}
                label={"First Name"}
                placeholder={"Enter your First Name"}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <InputField
                id={"lname"}
                type={"text"}
                label={"Last Name"}
                placeholder={"Enter your Last Name"}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <InputField
                id={"password"}
                type={"password"}
                label={"Password"}
                placeholder={"Enter your Password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <InputField
                id={"confirm-password"}
                type={"password"}
                label={"Confirm Password"}
                placeholder={"Confirm your Password"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="">
              <label className="label block text-gray-700  text-sm font-bold mb-2 cursor-pointer">
                <i className="fas fa-envelope mr-2"></i>
                <span className="label-text">Enable MFA?</span>
                <input
                  ref={mfaEnableRef}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={signUpToAccount}
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="text-center text-gray-600 mt-6">
            {"Already have an account? "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
