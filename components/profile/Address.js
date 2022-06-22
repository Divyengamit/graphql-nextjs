import React from "react";
import { Typography, IconButton, Box, Button, Chip } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const Address = (props) => {
  const { primaryAddress, onListAddress, onAddNew } = props;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h2Bold" color="secondary">
          Address
        </Typography>

        <Button variant="text" sx={{ color: "#5F7388" }} onClick={onAddNew}>
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
      >
        {primaryAddress ? (
          <Typography
            variant="h6"
            sx={{ color: "#000000", lineHeight: "24.5px", mt: 1.2 }}
          >
            {primaryAddress?.address1}
            {primaryAddress?.address1}
            <br /> {primaryAddress?.city}, <br /> {primaryAddress?.state} -{" "}
            {primaryAddress?.pincode}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{ color: "#000000", lineHeight: "24.5px", mt: 1.2 }}
          >
            Select Primary Address or Add an Address
          </Typography>
        )}

        <IconButton onClick={onListAddress}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Address;
