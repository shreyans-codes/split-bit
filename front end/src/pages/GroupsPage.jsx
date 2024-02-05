import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../redux/groupsSlice";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";

const GroupsPage = () => {
  const [groupName, setGroupName] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const groupsState = useSelector((state) => state.groups.groupList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navWithGroup = (groupId) => {
    navigate("/transaction", {
      state: { groupId: groupId },
    });
  };

  return (
    <div className="block">
      <Typography variant="h1">Groups</Typography>
      {groupsState.map((group) => {
        return (
          <div key={group.id}>
            <button
              className="border-none bg-inherit"
              onClick={() => {
                navWithGroup(group.id);
              }}
            >
              {group.name}
            </button>
          </div>
        );
      })}
      {showInput ? (
        <div className="flex m-auto justify-center gap-3">
          <div className="w-72">
            <Input
              size="md"
              variant="outlined"
              color="green"
              label="Group Name"
              placeholder="Enter group name"
              type="text"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              name="name-input"
              id="name-input"
            />
          </div>
          <div>
            <Button
              variant="filled"
              color="green"
              onClick={() => {
                dispatch(addGroup({ groupName: groupName }));
                setShowInput(!showInput);
              }}
            >
              Add Group
            </Button>
            <Button
              variant="text"
              color="red"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
      <button onClick={() => setShowInput(!showInput)}>
        Add another group
      </button>
    </div>
  );
};

export default GroupsPage;
