import React from "react";

import { Button, Paper, Typography } from "@mui/material";

import FlexBox from "../ui/FlexBox";
import InputField from "../ui/InputField";
import OptionsTypes from "./OptionsTypes";
import FileUpload from "./FileUpload";

const DocumentForm = (props) => {
  const methods = props.methods;
  const form = methods.watch();

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
          // {
          //   key: "AADHAAR",
          //   value: "AADHAAR",
          // },
        ])}
      </InputField>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Document Number *
      </Typography>
      {form.docType === "PAN" ? (
        <InputField
          name="PanNumber"
          placeholder="AA11BB22CC"
          settings={{
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      ) : (
        <InputField
          name="AadharNumber"
          placeholder="3100000100020003"
          settings={{
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      )}

      <FileUpload name="docImage" title="Upload Document Copy" />

      <Button
        variant="block"
        color="secondary"
        type="submit"
        sx={{ mt: 2, mb: 2 }}
      >
        Create account
      </Button>
    </Paper>
  );
};
export default DocumentForm;
