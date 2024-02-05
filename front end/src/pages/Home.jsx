import React, { useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutFromAccount } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import {
  addFriend,
  removeFriend,
  addGroup,
  removeTransaction,
} from "../redux/groupsSlice";

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupsState = useSelector((state) => state.groups.groupList);
  // const authState = useSelector((state) => state.auth);
  const performLogout = () => {
    dispatch(logoutFromAccount()).then(() => {
      //TODO: replace this on prod
      window.location.replace("http://localhost:8080/logout");
      navigate("/");
    });
  };
  console.log(groupsState);
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
              className=" border-0 active:border-spacing-2 m-2 rounded"
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
                dispatch(
                  removeFriend({ groupId: groupsState[0].id, fName: userName })
                );
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
          className="cursor-pointer transition-all text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          onClick={performLogout}
        >
          Logout
        </button>
        {groupsState.map((group) => {
          console.log(group);
          return (
            <div key={group.id}>
              <p>{group.name}</p>
              <div className="ml-8 flex flex-col">
                {group.friends.map((friend) => (
                  <div key={friend.id}>
                    {"||"}
                    --{friend.name}
                    <button
                      onClick={() => {
                        console.log("Yuuppp");
                        dispatch(
                          removeTransaction({
                            groupId: group.id,
                            friendId: "f-001",
                            transactionId: "t-001",
                          })
                        );
                      }}
                    >
                      Remove User
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
