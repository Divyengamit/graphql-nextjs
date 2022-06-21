import React from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import Image from "next/image";

const arrowIcon = require("@/assets/icons/blue_arrow.png");

const AccountOptions = (props) => {
  return (
    <Box>
      <Typography variant="h2Bold" color="secondary">
        Account Options
      </Typography>

      <Box display="flex" sx={{ my: 2.875 }}>
        <Typography variant="h4Bold" sx={{ color: "#2C3E50", flex: 1 }}>
          Kit Number
        </Typography>
        <Typography variant="h2Regular" sx={{ color: "#2C3E50", flex: 1 }}>
          123456789
        </Typography>
      </Box>
      <Divider />
      <Box display="flex" sx={{ my: 2.875 }}>
        <Typography variant="h4Bold" sx={{ color: "#2C3E50", flex: 1 }}>
          {props?.userData?.documents[0]?.docType || "Document"} Number
        </Typography>
        <Typography variant="h2Regular" sx={{ color: "#2C3E50", flex: 1 }}>
          {props?.userData?.documents[0]?.docNumber || "-"}
        </Typography>
      </Box>
      <Divider />

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ mt: 2.5, mb: 0.7 }}
      >
        <Button variant="text" onClick={props?.onSecureAccount}>
          Security of your Account{" "}
          <div style={{ width: "20px", height: "20px", marginLeft: "16px" }}>
            <Image alt="arrow" src={arrowIcon} />
          </div>
        </Button>
      </Box>
    </Box>
  );
};

export default AccountOptions;
