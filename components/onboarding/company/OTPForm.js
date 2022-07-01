import React, { useState } from "react";

import { Button, Paper, Typography } from "@mui/material";
import OtpInput from "react-otp-input";

import FlexBox from "../../ui/FlexBox";

const OTPForm = (props) => {
  const [otp, setOtp] = useState("");

  const OTPLength = props?.userData?.requestType == "RESET" ? 4 : 4;

  const handleChange = (otp) => {
    setOtp(otp);
    props?.onChangeOtp(otp);
  };

  const onResendHandler = () => {
    setOtp("");
    props?.onResend();
  };

  return (
    <Paper variant="card" sx={props.sx}>
      <FlexBox row sx={{ justifyContent: "space-between" }}>
        {!props?.userData?.requestType && (
          <>
            <Typography variant="h2Bold" color="secondary">
              Customer Registration
            </Typography>
            <FlexBox row>
              <Typography variant="h4SemiBold" sx={{ color: "#C8D4E0", mr: 1 }}>
                Step:
              </Typography>
              <Typography variant="large" color="secondary">
                04/04
              </Typography>
            </FlexBox>
          </>
        )}
      </FlexBox>
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Code sent to {""}
        {props?.userData?.mobile
          ? "+" + props?.userData?.mobile
          : props?.userData?.email}
      </Typography>
      <FlexBox
        row
        sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}
      >
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={OTPLength}
          shouldAutoFocus={true}
          inputStyle={{
            margin: 10,
            width: 72,
            height: 72,
            fontSize: 25,
            borderColor: "#EAF0F6",
            borderWidth: 2,
            borderRadius: 5,
            borderStyle: "solid",
            color: "#2C3E50",
          }}
          focusStyle={{
            borderColor: "#2C3E50",
          }}
          placeholder={
            props?.userData?.requestType == "RESET" ? "----" : "------"
          }
        />
      </FlexBox>

      <FlexBox sx={{ justifyContent: "center" }}>
        <Button variant="text" onClick={onResendHandler}>
          Didn’t received? Send code again.
        </Button>
      </FlexBox>

      {otp.length >= OTPLength && (
        <Button
          variant="block"
          sx={{ mt: 2, mb: 3 }}
          color="secondary"
          onClick={props?.onSubmit}
        >
          Next
        </Button>
      )}
    </Paper>
  );
};
export default OTPForm;
