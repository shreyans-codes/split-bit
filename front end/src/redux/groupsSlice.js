import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  groupList: [
    {
      id: "00001",
      name: "Default Group",
      friends: [
        {
          id: "f-001",
          name: "First Friend",
          transactions: [
            {
              id: "t-001",
              name: "First Transaction",
              amount: 20.0,
            },
          ],
        },
        { id: "f-002", name: "Second Friend", transactions: null },
      ],
    },
  ],
};

export const groupsSlice = createSlice({
  name: "groupsSlice",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      const newGroup = {
        id: uuid(),
        name: action.payload.groupName,
        friends: null,
      };
      state.groupList.push(newGroup);
    },
    addFriend: (state, action) => {
      const newFriend = {
        id: uuid(),
        name: action.payload.fName,
        transactions: null,
      };
      const groupIndex = state.groupList.findIndex(
        (group) => group.id === action.payload.groupId
      );
      if (state.groupList[groupIndex].friends)
        state.groupList[groupIndex].friends.push(newFriend);
      else state.groupList[groupIndex].friends = [newFriend];
    },
    addTransaction: (state, action) => {
      const newTransaction = {
        id: uuid(),
        name: action.payload.transactionName || null,
        amount: action.payload.amount,
      };
      const groupIndex = state.groupList.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const friendIndex = state.groupList[groupIndex].friends.findIndex(
        (friend) => friend.id === action.payload.friendId
      );
      if (state.groupList[groupIndex].friends[friendIndex].transactions)
        state.groupList[groupIndex].friends[friendIndex].transactions.push(
          newTransaction
        );
      else
        state.groupList[groupIndex].friends[friendIndex].transactions = [
          newTransaction,
        ];
    },
    removeFriend: (state, action) => {
      const groupIndex = state.groupList.findIndex(
        (group) => group.id === action.payload.groupId
      );
      state.groupList[groupIndex].friends = state.groupList[
        groupIndex
      ].friends.filter((friend) => friend.id !== action.payload.friendId);
      if (state.groupList[groupIndex].friends.length === 0)
        state.groupList[groupIndex].friends = null;
    },
    removeTransaction: (state, action) => {
      const groupIndex = state.groupList.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const friendIndex = state.groupList[groupIndex].friends.findIndex(
        (friend) => friend.id === action.payload.friendId
      );

      state.groupList[groupIndex].friends[friendIndex].transactions =
        state.groupList[groupIndex].friends[friendIndex].transactions.filter(
          (transaction) => transaction.id !== action.payload.transactionId
        );
      if (
        state.groupList[groupIndex].friends[friendIndex].transactions.length ===
        0
      )
        state.groupList[groupIndex].friends[friendIndex].transactions = null;
    },
  },
});

export const {
  addGroup,
  addFriend,
  addTransaction,
  removeFriend,
  removeTransaction,
} = groupsSlice.actions;

export default groupsSlice.reducer;
