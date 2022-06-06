import React from "react";

import { Typography, Dialog, DialogContent, Box, Button } from "@mui/material";
import Image from "next/image";

const successImage = require("../../assets/success.png");

const SuccessDialog = (props) => {
  return (
    <Dialog
      open={props?.state}
      onClose={props?.onClose}
      fullWidth
      maxWidth={"xs"}
    >
      <DialogContent sx={{ pt: 0 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* <img
            src={successImage}
            style={{
              height: "66px",
              width: "66px",
              marginTop: "30px",
              marginBottom: "4px",
            }}
          /> */}

          <Image src={successImage} height={66} width={66} alt="image" />

          <Typography
            color="secondary"
            variant="h2Bold"
            sx={{
              lineHeight: "40px",
            }}
          >
            SUCCESS!
          </Typography>

          <Typography
            color="primary"
            variant="subtitle1Bold"
            sx={{
              lineHeight: "28.35px",
              color: "#5F7388",
            }}
          >
            Details has been received.
          </Typography>

          <Typography
            variant="h5"
            sx={{
              lineHeight: "28.35px",
              color: "#000000",
            }}
          >
            Your card will be issued soon!
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={props?.onClose}
            sx={{ mt: 1.7, mb: 1.4, pr: 2, pl: 2, pt: 1, pb: 1 }}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
