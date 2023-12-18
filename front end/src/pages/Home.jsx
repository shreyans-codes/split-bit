import React, { useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutFromAccount } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const authState = useSelector((state) => state.auth);
  const performLogout = () => {
    dispatch(logoutFromAccount()).then(() => {
      //TODO: replace this on prod
      window.location.replace("http://localhost:8080/logout");
      navigate("/");
    });
  };
  return (
    <>
      <br />
      {/* <h1>{`Hello ${authState.user.firstName}`}</h1> */}
      <br />
      <br />
      <div>
        <button
          className=" cursor-pointer transition-all text-white px-6 py-2 rounded-lg border-yellow-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          Add Friend
        </button>
        {showInput ? (
          <div className=" flex items-center justify-center mt-4 m-auto">
            <FaUser />
            <input
              className=" m-2 rounded"
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              name="name-input"
              id="name-input"
            />
            <button
              className="cursor-pointer transition-all text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={() => {
                console.log("Yuuppp");
                setShowInput(!showInput);
              }}
            >
              Add User
            </button>
          </div>
        ) : null}
        <br />
        <br />
        <button
          className=" cursor-pointer transition-all text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          onClick={performLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
