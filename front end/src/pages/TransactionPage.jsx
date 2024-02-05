import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addFriend,
  addTransaction,
  removeFriend,
  removeTransaction,
} from "../redux/groupsSlice";
import { FaTrash } from "react-icons/fa6";

import PopupComponent from "../component/PopupComponent";
import {
  Button,
  Card,
  Chip,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import SplitPaymentCalcClass from "../helper/SplitBill";

export const TransactionPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showTransactionPopup, setShowTransactionPopup] = useState(false);
  const [friendName, setFriendName] = useState(null);
  const [transactionName, setTransactionName] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [afterTrs, setAfterTrs] = useState(null);
  const groupsState = useSelector((state) => state.groups.groupList);
  const dispatch = useDispatch();
  const location = useLocation();
  const groupId = location.state.groupId;
  const currentGroup = groupsState.find((group) => group.id === groupId);

  const resetValue = () => {
    setShowPopup(false);
    setShowTransactionPopup(false);
    setFriendName(null);
    setSelectedFriend(null);
    setTransactionName(null);
    setTransactionAmount(null);
  };
  return (
    <div className=" p-2 w-full">
      <Typography variant="h1">Group: {currentGroup.name}</Typography>
      <Card className="w-2/6 gap-2 px-10 m-auto">
        <Typography variant="h3">Friends</Typography>
        {currentGroup.friends &&
          currentGroup.friends.map((friend) => (
            <div key={friend.id} className="flex gap-4 justify-between">
              <Typography variant="paragraph">{friend.name}</Typography>
              <Button
                variant="outlined"
                color="red"
                className="p-1 px-3"
                onClick={() => {
                  dispatch(
                    removeFriend({
                      groupId: groupId,
                      friendId: friend.id,
                    })
                  );
                }}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        <Button
          variant="outlined"
          color="blue"
          className="w-full my-2"
          onClick={() => {
            setShowPopup(true);
          }}
        >
          Add Friend
        </Button>
        {currentGroup.friends && (
          <div>
            <Typography variant="h3">Transactions</Typography>
            {currentGroup.friends.map((friend) => {
              return (
                <div key={friend.id}>
                  {friend.transactions &&
                    friend.transactions.map((trns) => (
                      <div key={trns.id} className="flex justify-between my-2">
                        <div className="flex gap-2">
                          <Chip
                            variant="filled"
                            value={friend.name}
                            className="rounded-full"
                          />
                          <Typography variant="paragraph">
                            {trns.name}:
                          </Typography>

                          <Typography variant="paragraph">
                            {trns.amount}
                          </Typography>
                        </div>
                        <Button
                          variant="outlined"
                          color="red"
                          className="p-2"
                          onClick={() => {
                            dispatch(
                              removeTransaction({
                                groupId: groupId,
                                friendId: friend.id,
                                transactionId: trns.id,
                              })
                            );
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ))}
                </div>
              );
            })}
            <Button
              variant="outlined"
              color="blue"
              className="w-full mt-2 mb-4"
              onClick={() => setShowTransactionPopup(true)}
            >
              Add Transaction
            </Button>
          </div>
        )}
      </Card>
      <Button
        variant="filled"
        color="blue"
        className="mt-2"
        onClick={() => {
          const expenses = [];
          currentGroup.friends.map((friend) => {
            if (friend.transactions) {
              friend.transactions.map((trs) => {
                const existingExpense = expenses.findIndex(
                  (exp) => exp.friend === friend.name
                );
                if (existingExpense !== -1)
                  expenses[existingExpense].amount += parseFloat(trs.amount);
                else
                  expenses.push({
                    friend: friend.name,
                    amount: parseFloat(trs.amount),
                  });
              });
            } else {
              expenses.push({
                friend: friend.name,
                amount: parseFloat(0),
              });
            }
          });
          const splitTracker = new SplitPaymentCalcClass(expenses);
          setAfterTrs(splitTracker.get_transactions());
          console.log(afterTrs);
        }}
      >
        Calculate Split
      </Button>

      {afterTrs &&
        afterTrs.map((trs) => {
          return (
            <div key={trs.id}>
              <Typography variant="paragraph">
                <b>{trs.from_friend}</b> will pay {trs.amount} to{" "}
                {trs.to_friend}
              </Typography>
            </div>
          );
        })}
      <PopupComponent
        trigger={showPopup}
        setTrigger={setShowPopup}
        heading={"Add a friend"}
      >
        <div className="flex gap-4">
          <Input
            label="Friend's name"
            variant="static"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            placeholder="Enter friend's name"
          />
          <Button
            variant="outlined"
            color="blue"
            className="w-72"
            onClick={() => {
              dispatch(
                addFriend({ groupId: currentGroup.id, fName: friendName })
              );
              setShowPopup(false);
              resetValue();
            }}
          >
            Add Friend
          </Button>
        </div>
      </PopupComponent>
      <PopupComponent
        trigger={showTransactionPopup}
        setTrigger={setShowTransactionPopup}
        heading={"Add a Transaction"}
      >
        <div className=" mb-4">
          <Select
            label="Select a friend"
            id="friend_name"
            selected={(e) => {
              if (e) {
                const selectedValue = e.props.value;
                setSelectedFriend(e.key);
                return selectedValue;
              }
            }}
          >
            {currentGroup.friends &&
              currentGroup.friends.map((friend) => (
                <Option key={friend.id} value={friend.name}>
                  {friend.name}
                </Option>
              ))}
          </Select>
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            variant="static"
            label="Transaction Name"
            value={transactionName}
            placeholder="Enter Transaction Name"
            onChange={(e) => setTransactionName(e.target.value)}
          />
          <Input
            variant="static"
            label="Amount"
            type="number"
            value={transactionAmount}
            placeholder="Enter Transaction Amount"
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </div>
        <Button
          variant="outlined"
          color="blue"
          onClick={() => {
            dispatch(
              addTransaction({
                groupId: currentGroup.id,
                friendId: selectedFriend,
                transactionName: transactionName,
                amount: transactionAmount,
              })
            );
            setShowTransactionPopup(false);
            resetValue();
          }}
        >
          Add Transaction
        </Button>
      </PopupComponent>
    </div>
  );
};
