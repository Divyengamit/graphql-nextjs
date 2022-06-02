import React from "react";

import { Button, Divider, Paper, Typography } from "@mui/material";

import FlexBox from "../ui/FlexBox";

import InputField from "../ui/InputField";

const LoginForm = (props) => {
  return (
    <Paper variant="card" sx={props.sx}>
      <Typography variant="h2Bold" color="secondary">
        Login
      </Typography>
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Username/email *
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
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Password *
      </Typography>
      <InputField
        type="password"
        name="password"
        placeholder="Enter Password"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Button
        sx={{ mt: 1.25, p: 0 }}
        variant="text"
        onClick={props?.onforgetPassword}
      >
        Forgot password?
      </Button>

      <Button
        type="submit"
        variant="block"
        color="secondary"
        sx={{ mt: 1.25, mb: 2 }}
      >
        Login
      </Button>

      <Divider>
        <Typography variant="body2Regular" sx={{ color: "#5F7388" }}>
          New Here?
        </Typography>
      </Divider>
      <Button
        variant="block"
        color="primary"
        sx={{ mt: 2, mb: 3 }}
        onClick={props.onSignup}
      >
        Signup
      </Button>
    </Paper>
  );
};
export default LoginForm;
