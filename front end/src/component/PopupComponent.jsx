import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

const PopupComponent = (props) => {
  return (
    <Dialog open={props.trigger} handler={props.setTrigger}>
      <DialogHeader>{props.heading}</DialogHeader>
      <DialogBody>{props.children}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => props.setTrigger(false)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PopupComponent;
