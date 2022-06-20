import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import not_allow_image from "../../assets/not-allow.png";
import success_icon from "../../assets/success-icon.png";

const InfoAlert = (props) => {
  return (
    <Dialog
      open={props.show}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      className="info-alert-box"
    >
      <div className="info-alert-title-img">
        {
          <>
            {props?.title === "Error" ? (
              <Image src={not_allow_image} alt="icon" />
            ) : (
              ""
            )}
            {props?.title === "Success" ? (
              <Image src={success_icon} alt="icon" />
            ) : (
              ""
            )}
            {props?.title === "Progress" ? <h4>Please Wait...</h4> : ""}
          </>
        }
      </div>
      {props?.body && (
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="info-alert-body-text"
          >
            {props.body}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions className="info-alert-ok-btn">
        <Button onClick={props.onClose} autoFocus>
          {props?.buttonText || "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoAlert;
