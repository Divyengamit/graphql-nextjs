import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import FlexBox from "../ui/FlexBox";
import Image from "next/image";

const DropZone = (props) => {
  const [error, setError] = useState();
  return (
    <FlexBox
      sx={{
        border: "2px dashed #2C3E50",
        mt: 2,
        mb: 1,
        width: "100%",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5SemiBold" sx={{ mt: 2, mb: 1.2 }}>
        {props?.title}
      </Typography>
      <div style={{ maxWidth: "32px" }}>
        <Image src={require("../../assets/icons/upload.png")} alt="image" />
      </div>
      <Typography
        variant="small"
        sx={{ mt: 1, mb: 1.2, fontWeight: "normal" }}
        color="primary.main"
      >
        Drag & Drop your Files here
      </Typography>
      <Typography variant="small" sx={{ mb: 2 }}>
        JPG, GIF, PNG, PDF | Upto 5MB per file
      </Typography>
    </FlexBox>
  );
};

export default DropZone;
