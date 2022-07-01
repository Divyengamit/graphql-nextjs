import React from "react";

import { Button, Paper, Typography } from "@mui/material";

import FlexBox from "../../ui/FlexBox";
import InputField from "../../ui/InputField";
import PasswordTooltip from "../PasswordTooltip";

const PasswordForm = (props) => {
  return (
    <Paper variant="card" sx={props.sx}>
      <FlexBox row sx={{ justifyContent: "space-between" }}>
        <Typography variant="h2Bold" color="secondary">
          Create your password
        </Typography>
        {!props?.requestType && (
          <FlexBox row>
            <Typography variant="h4SemiBold" sx={{ color: "#C8D4E0", mr: 1 }}>
              Step:
            </Typography>
            <Typography variant="large" color="secondary">
              02/04
            </Typography>
          </FlexBox>
        )}
      </FlexBox>

      {!props?.requestType && (
        <>
          <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
            Email Address *
          </Typography>

          <InputField
            type="email"
            name="email"
            placeholder="Enter Email"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </>
      )}

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Create New Password * <PasswordTooltip />
      </Typography>
      <InputField
        type="password"
        name="password"
        placeholder="Enter New Password"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Confirm Password *
      </Typography>
      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Button
        variant="block"
        color="secondary"
        type="submit"
        sx={{ mt: 2, mb: 2 }}
        // onClick={props.onNext}
      >
        Next
      </Button>

      {/* <FlexBox row sx={{ mt: 2, mb: 2 }}>
        <Button
          variant="block"
          color="cancel"
          sx={{ mr: 1 }}
          onClick={props.onCancel}
        >
          Cancel
        </Button>
      </FlexBox> */}
    </Paper>
  );
};
export default PasswordForm;
