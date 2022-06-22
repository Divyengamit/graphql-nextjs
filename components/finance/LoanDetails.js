import React from "react";

import { Button, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InputField from "../ui/InputField";
// import OptionsTypes from "../onboarding/OptionsTypes";
import FileUpload from "../onboarding/FileUpload";
import FlexBox from "../ui/FlexBox";
import style from "../../styles/EquipmentForm.module.css";
import { useStyles } from "@/utils/removeEncrCss";

const LoanDetailsForm = (props) => {
  const classes = useStyles();
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
          Loan Details
        </Typography>
      </FlexBox>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Loan Amount *</strong>
        </Typography>

        <InputField
          className={classes.input}
          type="number"
          name="loanAmount"
          placeholder="Enter loan amount"
          settings={{
            variant: "outlined",
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Preforma Invoice of Equipment</strong>
        </Typography>
        <FileUpload
          name="performaInvoiceFile"
          title="Upload Preforma Invoice of Equipment"
        />
      </div>

      <Button
        type="submit"
        variant="block"
        color="primary"
        sx={{ mt: 2, mb: 3 }}
        // onClick={props.onClickNext}
      >
        Next
      </Button>
    </Paper>
  );
};

export default LoanDetailsForm;
