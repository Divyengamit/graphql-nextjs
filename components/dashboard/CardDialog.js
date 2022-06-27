import React from "react";

import { Dialog, DialogContent, Box } from "@mui/material";

const CardDialog = (props) => {
  return (
    <Dialog
      open={props?.state}
      onClose={props?.onClose}
      PaperProps={{
        sx: {
          width: "100%",
          // maxHeight: 360,
        },
      }}
    >
      <DialogContent>
        <Box>
          <iframe
            title="Change Pin"
            src={props?.iframeinfo?.url}
            height="285"
            style={{ width: "100%" }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
