import React from "react";

import { Button, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InputField from "../ui/InputField";
import OptionsTypes from "../onboarding/OptionsTypes";
import FileUpload from "../onboarding/FileUpload";
import FlexBox from "../ui/FlexBox";
import style from "../../styles/EquipmentForm.module.css";

const FinancialDocumentsForm = (props) => {
  return (
    <Paper variant="card" sx={props.sx} className={style.form_card_div}>
      <FlexBox row>
        <IconButton
          aria-label="close"
          onClick={props?.onBack}
          sx={{ mr: 2, p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h2Bold" color="secondary">
          Financial Documents Form
        </Typography>
      </FlexBox>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Address Proof (PAN Card/ Driving License/ Passport/ Voter's ID/ Aadhaar Card)
        </Typography>
        <FileUpload name="bankStmtFile" title="Upload Bank Statment" />
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Bank Statement (Last 6 months)
        </Typography>
        <FileUpload name="bankStmtFile" title="Upload Bank Statment" />
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Ownership Proof (Agreement Copy / Electricity Bill / Maintenance Bill with share certificate / Municipal tax bill/Share certificate)
        </Typography>
        <FileUpload name="bankStmtFile" title="Upload Bank Statment" />
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        ITR
        </Typography>
        <FileUpload name="bankStmtFile" title="Upload Bank Statment" />
      </div>
      

      <Button
        type="button"
        variant="block"
        color="primary"
        sx={{ mt: 2, mb: 3 }}
        onClick={props.onClickNext}

      >
        Submit
      </Button>
    </Paper>
  );
};

export default FinancialDocumentsForm;
