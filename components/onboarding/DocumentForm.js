import React, { useEffect, useState } from "react";

import { Button, Paper, Typography, Box, Checkbox, Link } from "@mui/material";

import FlexBox from "../ui/FlexBox";
import InputField from "../ui/InputField";
import OptionsTypes from "./OptionsTypes";
import FileUpload from "./FileUpload";

const DocumentForm = (props) => {
  return (
    <Paper variant="card" sx={props.sx}>
      <FlexBox row sx={{ justifyContent: "space-between" }}>
        <Typography variant="h2Bold" color="secondary">
          Complete your account setup
        </Typography>

        <FlexBox row>
          <Typography variant="h4SemiBold" sx={{ color: "#C8D4E0", mr: 1 }}>
            Step:
          </Typography>
          <Typography variant="large" color="secondary">
            04/05
          </Typography>
        </FlexBox>
      </FlexBox>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        DocumentType *
      </Typography>
      <InputField
        name="docType"
        settings={{
          sx: { mt: 1.2 },
          fullWidth: true,
          select: true,
        }}
      >
        {OptionsTypes([
          {
            key: "PAN",
            value: "PAN",
          },
          {
            key: "AADHAAR",
            value: "AADHAAR",
          },
        ])}
      </InputField>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Document Number *
      </Typography>
      <InputField
        name="docNumber"
        placeholder="ABCDEl 1FSK or 3100000100020003"
        settings={{
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <FileUpload name="docImage" title="Upload Document Copy" />

      <Typography display="flex" alignItems="center">
        <Checkbox name="notification" sx={{ pt: 0 }} />
        <Typography
          color="primary"
          variant="body2Regular"
          sx={{
            alignSelf: "center",
            lineHeight: "21.43px",
            pt: 1.375,
          }}
        >
          I agree to receive marketing communications from Canopi. I can change
          my notification preferences at any time.
        </Typography>
      </Typography>

      <Typography display="flex" alignItems="flex-start" sx={{ mt: 1 }}>
        <Checkbox
          name="agreement"
          checked={props?.isChecked}
          onChange={props?.onAgreeChecked}
          sx={{ pt: 0, "& .MuiSvgIcon-root": { fontSize: 24 } }}
        />

        <Typography
          color="primary"
          name="Privacy"
          variant="body2Regular"
          sx={{
            alignSelf: "center",
            lineHeight: "21.43px",
          }}
        >
          By clicking the button below, I agree to be bound by
          <Link
            href="#"
            underline="none"
            variant="body2Regular"
            sx={{ color: "#4EA6FF" }}
          >
            {"Canopi's User Agreement and Privacy Statement."}
          </Link>
        </Typography>
      </Typography>
      {props?.isCheckedcheckedError && (
        <Typography sx={{ color: "red", ml: 5, mt: 0.5 }}>
          *please check the box{" "}
        </Typography>
      )}

      <Button
        variant="block"
        color="secondary"
        type="submit"
        sx={{ mt: 2, mb: 2 }}
      >
        Agree and create account
      </Button>
    </Paper>
  );
};
export default DocumentForm;
