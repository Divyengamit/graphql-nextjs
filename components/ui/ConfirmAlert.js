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
      className="info-alert-box"
    >
      <div className="info-alert-title-img">
        {props?.title && (
          <DialogTitle id="alert-dialog-title">{props?.title}</DialogTitle>
        )}
      </div>
      {props?.body && (
        <DialogContent>
          <DialogContentText
            variant="h4"
            id="alert-dialog-description"
            className="info-alert-body-text"
          >
            {props.body}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions className="info-alert-ok-btn">
        <Button onClick={props.onConfirm} autoFocus>
          {props?.buttonConfirmText || "Remove"}
        </Button>
        {props?.hideCancel !== true && (
          <Button onClick={props.onClose} autoFocus>
            {props?.buttonCancelText || "Cancel"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAlert;
