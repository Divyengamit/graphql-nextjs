/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Button, Paper, Typography } from "@mui/material";

import InputField from "../ui/InputField";
import FlexBox from "../ui/FlexBox";

const SignupForm = (props) => {
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

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Mobile Number *
      </Typography>
      <InputField
        type="number"
        placeholder="Enter Phone Number"
        name="mobileNo"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Typography
        variant="body2Regular"
        sx={{ mt: 2, lineHeight: 1.4, color: "#8F8F8F" }}
      >
        By continuing, you confirm that you're the owner or primary user of this
        mobile phone number. You agree to receive automated SMS to confirm your
        phone number. Message and data rates may apply.
      </Typography>

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
