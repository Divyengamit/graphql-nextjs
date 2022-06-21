import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmAlert = (props) => {
  return (
    <Dialog
      open={props.show}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      {props?.title && (
        <DialogTitle id="alert-dialog-title">{props?.title}</DialogTitle>
      )}
      {props?.body && (
        <DialogContent>
          <DialogContentText variant="h4" id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={props.onConfirm} autoFocus>
          {props?.buttonText || "Remove"}
        </Button>
        <Button onClick={props.onClose} autoFocus>
          {props?.buttonText || "Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAlert;
