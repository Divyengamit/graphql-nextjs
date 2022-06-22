/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Checkbox, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import InputField from "../ui/InputField";
import FlexBox from "../ui/FlexBox";
import Link from "next/link";
const useStyles = makeStyles({
  input: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

const SignupForm = (props) => {
  const classes = useStyles();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear() - 18;

  today = yyyy + "-" + mm + "-" + dd;

  return (
    <Paper variant="card" sx={props.sx}>
      <FlexBox row sx={{ justifyContent: "space-between" }}>
        <Typography variant="h2Bold" color="secondary">
          Customer Registration
        </Typography>

        <FlexBox row>
          <Typography variant="h4SemiBold" sx={{ color: "#C8D4E0", mr: 1 }}>
            Step:
          </Typography>
          <Typography variant="large" color="secondary">
            01/05
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox row sx={{ mt: 2, alignItems: "flex-start" }}>
        <FlexBox sx={{ mr: 1, flex: 1, alignItems: "flex-start" }}>
          <Typography variant="h5SemiBold">First Name *</Typography>
          <InputField
            type="text"
            name="firstName"
            placeholder="eg; Prabal"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
        <FlexBox sx={{ ml: 1, flex: 1, alignItems: "flex-start" }}>
          <Typography variant="h5SemiBold">Last Name *</Typography>
          <InputField
            type="text"
            name="lastName"
            placeholder="eg; Krishna"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
      </FlexBox>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Middle Name
      </Typography>
      <InputField
        type="text"
        name="middleName"
        placeholder="eg; Munnur"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <FlexBox row sx={{ mt: 1, alignItems: "flex-start" }}>
        <FlexBox sx={{ mr: 1, flex: 1, alignItems: "flex-start" }}>
          <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
            Mobile Number *
          </Typography>
          <InputField
            className={classes.input}
            maxLength={10}
            type="number"
            placeholder="Enter Phone Number"
            name="mobileNo"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
        <FlexBox sx={{ mr: 1, flex: 1, alignItems: "flex-start" }}>
          <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
            Date of Birth *
          </Typography>

          <InputField
            type="date"
            name="dob"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
              InputProps: { inputProps: { min: "100", max: today } },
            }}
          />
        </FlexBox>
      </FlexBox>

      <Typography
        variant="body2Regular"
        sx={{ mt: 2, lineHeight: 1.4, color: "#8F8F8F" }}
      >
        By continuing, you confirm that you're the owner or primary user of this
        mobile phone number. You agree to receive automated SMS to confirm your
        phone number. Message and data rates may apply.
      </Typography>

      <Typography display="flex" alignItems="center" sx={{ mt: 1 }}>
        <Checkbox
          name="privacy"
          checked={props?.isChecked.privacy}
          onChange={(e) => props?.onAgreeHandler("privacy", e.target.checked)}
          sx={{ p: 0, m: 0, mr: 1 }}
        />
        <Typography
          color="primary"
          variant="body2Regular"
          sx={{
            alignSelf: "center",
            lineHeight: "21.43px",
          }}
        >
          I agree to provide my consent to receive my CIR on my behalf.{" "}
          <a
            href="https://canopi.in/terms-of-service.html"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#0028ff" }}
          >
            Click here
          </a>{" "}
          to view the Consent Agreement
        </Typography>
      </Typography>

      <Typography display="flex" alignItems="flex-start" sx={{ mt: 1 }}>
        <Checkbox
          name="agreement"
          checked={props?.isChecked.agreement}
          onChange={(e) => props?.onAgreeHandler("agreement", e.target.checked)}
          sx={{ p: 0, m: 0, mr: 1, "& .MuiSvgIcon-root": { fontSize: 24 } }}
        />

        <Typography
          color="primary"
          name="Privacy"
          variant="body2Regular"
          sx={{
            alignSelf: "center",
            lineHeight: "21.43px",
          }}
        >
          By clicking the button below, I agree to be bound by{" "}
          <Link href="#">Canopi's User Agreement and Privacy Statement.</Link>
        </Typography>
      </Typography>

      {props?.checkedError && (
        <Typography
          variant="body2Regular"
          sx={{ color: "red", ml: 5, mt: 0.5 }}
        >
          *please check the box{" "}
        </Typography>
      )}

      <FlexBox row sx={{ mt: 2, mb: 2 }}>
        <Button
          variant="block"
          color="cancel"
          sx={{ mr: 1 }}
          onClick={props.onCancel}
        >
          Back to Login
        </Button>
        <Button variant="block" color="secondary" sx={{ ml: 1 }} type="submit">
          Next
        </Button>
      </FlexBox>
    </Paper>
  );
};
export default SignupForm;
