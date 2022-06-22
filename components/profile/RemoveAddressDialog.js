import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";

const WarnIcon = require("../../assets/warning.png");

const RemoveAddressDialog = (props) => {
  return (
    <>
      <Dialog
        open={props?.state}
        onClose={props?.onClose}
        fullWidth
        maxWidth={"xs"}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            position: "absolute",
            left: 20,
            top: 16,
          }}
        >
          <IconButton aria-label="close" onClick={props?.onClose}>
            <ArrowBackIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
          <Typography variant="h5SemiBold" sx={{ color: "#5F7388" }}>
            Back
          </Typography>
        </Box>

        <IconButton
          aria-label="close"
          onClick={props?.onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 11,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h2Bold"
          color="secondary"
          sx={{ pb: 1.1, px: 5, pt: 3.25, textAlign: "center" }}
        >
          Remove this Address
        </DialogTitle>

        <DialogContent sx={{ px: 5, py: 4.125 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              mt: 5.5,
              mb: 4,
              px: 4.625,
              pb: 4.125,
              pt: 2.75,
              background: "#F5F7FA",
            }}
          >
            <div style={{ width: "87px", height: "76px" }}>
              <Image alt="warning" src={WarnIcon} />
            </div>

            <Typography
              variant="h2Bold"
              sx={{
                color: "#5F7388",
                lineHeight: "40px",
                mt: 0.8,
                textAlign: "center",
              }}
            >
              Are you sure to remove this address ?
            </Typography>

            <Typography
              variant="h5Regular"
              sx={{
                color: "#000000",
                textAlign: "center",
                mt: 0.8,
                lineHeight: "20.5px",
              }}
            >
              {props?.addressData?.address1} {props?.addressData?.address1}
              <br /> {props?.addressData?.city}, <br />{" "}
              {props?.addressData?.state} - {props?.addressData?.pincode}
            </Typography>
          </Box>
          <Button
            variant="block"
            color="cancel"
            onClick={props?.onRemoveClick}
            sx={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            Remove
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RemoveAddressDialog;
