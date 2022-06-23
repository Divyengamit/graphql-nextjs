import React from "react";
import { Button, DialogContentText, Typography, Box } from "@mui/material";

import InputField from "../ui/InputField";

const PasswordForm = () => {
  return (
    <Box>
      <Typography variant="h5SemiBold" sx={{ mt: 3 }}>
        Confirm your current password *
      </Typography>
      <InputField
        type="password"
        name="passwordOld"
        placeholder="Current Password"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <DialogContentText
        variant="h5Regular"
        sx={{ mt: 1, ml: 1, color: "#2C3E50" }}
      >
        Enter your new password (Keep account more secure. Don’t use your name.)
      </DialogContentText>
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Your New password *
      </Typography>
      <InputField
        type="password"
        name="passwordNew"
        placeholder="New Password"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Confirm New password *
      </Typography>
      <InputField
        type="password"
        name="passwordConfirm"
        placeholder="Confirm Password"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3.75, mb: 0.5, px: 3.875, py: 1.25 }}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default PasswordForm;
