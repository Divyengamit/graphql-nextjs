import React from "react";
import { Typography, IconButton, Box, Button, Chip } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MoreVert from "@mui/icons-material/MoreVert";

const EmailInfo = (props) => {
  const { onAddEmail, userData, onListEmail } = props;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h2Bold" color="secondary">
          Email Address
        </Typography>

        <Button variant="text" sx={{ color: "#5F7388" }} onClick={onAddEmail}>
          Add New <AddIcon sx={{ ml: 0.9 }} />
        </Button>
      </Box>

      <Chip
        label="Primary"
        sx={{
          mb: 1,
          fontSize: "14px",
          color: "#2C3E50",
          fontWeight: "400",
          borderRadius: 0,
        }}
      />
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#000000", lineHeight: "24.5px", mt: 1.2 }}
        >
          {userData?.emailAddress}
        </Typography>
        <IconButton onClick={onListEmail}>
          <MoreVert />
        </IconButton>
      </Box>

      <Typography
        variant="h6"
        sx={{ color: "#8F8F8F", lineHeight: "21.43px", mt: 1.875 }}
      >
        To update an email address, you must have at least two email address on
        file.
      </Typography>
    </Box>
  );
};

export default EmailInfo;
