import InputField from "../component/InputField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginAsync } from "../redux/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const loginToAccount = async (event) => {
    if (username === "") {
      toast.error("Please enter a username");
      return;
    }
    if (password === "") {
      toast.error("Please enter a password");
      return;
    }
    event.preventDefault();
    dispatch(loginAsync({ username: username, password: password })).then(
      () => {
        if (authState.isError) {
          toast.error(authState.message);
        } else {
          if (authState.mfaEnabled) {
            navigate("/verify", {
              state: { username: username, password: password },
            });
          } else {
            navigate("/home");
          }
        }
      }
    );
  };

  const redirectToGitHub = () => {
    window.location.replace(
      "http://localhost:8080/oauth2/authorization/github"
    );
  };

  const redirectToGoogle = () => {
    window.location.replace(
      "http://localhost:8080/oauth2/authorization/google"
    );
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
              LogIn
            </span>
          </h2>
          <form>
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
                id={"password"}
                type={"password"}
                label={"Password"}
                placeholder={"Enter your Password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={loginToAccount}
              >
                LogIn
              </button>
            </div>
            <div className="text-center mt-4">
              <a href="#" className="text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>
            {/* <a href="http://localhost:8080/oauth2/authorization/google"> */}
          </form>
          <button
            className="mt-2 m-auto flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={redirectToGoogle}
          >
            <FcGoogle size={20} className="mr-6" />
            <span>Continue with Google</span>
          </button>
          {/* </a> */}
          <button
            className="mt-2 m-auto flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={redirectToGitHub}
          >
            <FaGithub size={20} className="mr-6" />
            <span>Continue with Github</span>
          </button>
          <p className="text-center text-gray-600 mt-6">
            {"Don't have an account? "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
