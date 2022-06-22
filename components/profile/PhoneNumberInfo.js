import React from "react";
import {
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { formatPhoneNumber } from "@/utils/format";

const PhoneNumberInfo = (props) => {
  const { userData, phoneList, onAddNew, onremove } = props;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2Bold" color="secondary">
          Phone Number
        </Typography>

        <Button variant="text" sx={{ color: "#5F7388" }} onClick={onAddNew}>
          Add New <AddIcon sx={{ ml: 0.9 }} />
        </Button>
      </Box>
      <Chip
        label="Primary (Mobile)"
        sx={{
          mt: 2.5,
          mb: 1,
          fontSize: "14px",
          color: "#2C3E50",
          fontWeight: "400",
          borderRadius: 0,
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#000000", lineHeight: "24.5px", my: 0.75 }}
        >
          +{formatPhoneNumber(userData?.mobileNo)}
        </Typography>
      </Box>

      {phoneList?.map((item) => {
        return (
          <>
            <Divider />
            <Chip
              label="Secondary (Mobile)"
              sx={{
                mt: 2.5,
                mb: 1,
                fontSize: "14px",
                color: "#2C3E50",
                fontWeight: "400",
                borderRadius: 0,
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#000000", lineHeight: "24.5px" }}
              >
                +{formatPhoneNumber(item?.mobileNo)}
              </Typography>

              <IconButton onClick={() => onremove(item)}>
                <RemoveCircleOutlineIcon style={{ color: "#FF4141" }} />
              </IconButton>
            </Box>
          </>
        );
      })}
    </Box>
  );
};

export default PhoneNumberInfo;
