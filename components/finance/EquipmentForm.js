import React from "react";

import { Button, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InputField from "../ui/InputField";
import OptionsTypes from "../onboarding/OptionsTypes";
import FileUpload from "../onboarding/FileUpload";
import FlexBox from "../ui/FlexBox";

const EquipmentForm = (props) => {
  return (
    <Paper variant="card" sx={props.sx}>
      <FlexBox row>
        <IconButton
          aria-label="close"
          onClick={props?.onBack}
          sx={{ mr: 2, p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h2Bold" color="secondary">
          Check Eligibility Form
        </Typography>
      </FlexBox>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Profile Type *
      </Typography>
      <InputField
        name="profileType"
        settings={{
          fullWidth: true,
          select: true,
          sx: {
            mt: 1.2,
            ".MuiInputBase-input": {
              paddingLeft: 4,
              paddingTop: 3,
              paddingBottom: 3,
            },
          },
        }}
      >
        {OptionsTypes([
          { key: "Salaried", value: "Salaried" },
          { key: "Self_Employed ", value: "Self Employed" },
        ])}
      </InputField>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Highest Qualification *
      </Typography>
      <InputField
        name="highestQualification"
        settings={{
          fullWidth: true,
          select: true,
          sx: {
            mt: 1.2,
            ".MuiInputBase-input": {
              paddingLeft: 4,
              paddingTop: 3,
              paddingBottom: 3,
            },
          },
        }}
      >
        {OptionsTypes([
          { key: "MBBS", value: "MBBS" },
          { key: "BDS ", value: "BDS" },
          { key: "MDS", value: "MDS" },
          { key: "MD ", value: "MD" },
          { key: "MS", value: "MS" },
          { key: "MCh ", value: "MCh" },
          { key: "BAMS", value: "BAMS" },
          { key: "BHMS ", value: "BHMS" },
        ])}
      </InputField>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Experience *
      </Typography>

      <InputField
        type="number"
        name="experience"
        InputProps={{ inputProps: { min: 0, max: 10 } }}
        placeholder="Enter Years of Experience"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Annual Income (in Lakhs) *
      </Typography>

      <InputField
        type="number"
        name="annualIncome"
        placeholder="Enter Annual Income"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Button
        type="submit"
        variant="block"
        color="primary"
        sx={{ mt: 2, mb: 3 }}
      >
        Check Eligibility
      </Button>
    </Paper>
  );
};

export default EquipmentForm;
