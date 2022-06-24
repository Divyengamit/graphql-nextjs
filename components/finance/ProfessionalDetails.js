import React, { useState } from "react";

import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  //  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InputField from "../ui/InputField";
import OptionsTypes from "../onboarding/OptionsTypes";
import FileUpload from "../onboarding/FileUpload";
import FlexBox from "../ui/FlexBox";
import style from "../../styles/EquipmentForm.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useStyles } from "@/utils/removeEncrCss";
import ConfirmAlert from "../ui/ConfirmAlert";
import { useRouter } from "next/router";
const ProfessionalDetailsForm = (props) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState();
  const classes = useStyles();
  const { watch, setValue, formState } = props;

  const form = watch();
  const onBackConfirm = () => {
    setShowConfirm(false);
    router.push({ pathname: "/home/eligibility" });
  };
  return (
    <Paper variant="card" sx={props.sx} className={style.form_card_div}>
      <FlexBox row>
        <IconButton
          aria-label="close"
          onClick={() => {
            setShowConfirm(true);
            setConfirmMessage("Are you sure you want to go back?");
          }}
          sx={{ mr: 2, p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h2Bold" color="secondary">
          <strong>Professional Details</strong>
        </Typography>
      </FlexBox>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>University Name *</strong>
        </Typography>

        <InputField
          type="text"
          name="universityName"
          placeholder="Enter University Name"
          settings={{
            variant: "outlined",
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      </div>
      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2, mb: 2 }}>
          <strong>Qualification Year *</strong>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            value={form?.qualificationYear}
            minDate={new Date("1950")}
            maxDate={new Date("2022")}
            onChange={(newValue) => {
              props.setValue("qualificationYear", newValue);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                name="qualificationYear"
                error={!!props.formState?.errors["qualificationYear"]}
                helperText={
                  props.formState?.errors?.["qualificationYear"]?.message
                    ? "Qualification year required "
                    : null
                }
              />
            )}
          />
        </LocalizationProvider>
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Registration Number *</strong>
        </Typography>

        <InputField
          className={classes.input}
          type="number"
          name="registrationNo"
          placeholder="Enter Registration Number:"
          settings={{
            variant: "outlined",
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>State Medical Council *</strong>
        </Typography>

        <InputField
          type="text"
          name="stateMedicalCouncil"
          placeholder="Enter State Medical Council"
          settings={{
            variant: "outlined",
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      </div>

      {/* <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Experience *</strong>
        </Typography>

        <InputField
          className={classes.input}
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
      </div> */}

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Hospital/Diagnostic/Clinic Centre Name *</strong>
        </Typography>

        <InputField
          type="text"
          name="hospitalName"
          placeholder="Enter  Hospital/Diagnostic/Clinic Centre Name"
          settings={{
            variant: "outlined",
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Hospital/Diagnostic/Clinic Centre Vintage *</strong>
        </Typography>

        <InputField
          name="hospitalVintage"
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
            { key: "less", value: "Less than 3 years" },
            { key: "more", value: "More than 3 years" },
          ])}
        </InputField>
      </div>

      {/* <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Business Ownership Status *</strong>
        </Typography>

        <InputField
          name="businessStatus"
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
            { key: "SP", value: "Sole Proprietorship" },
            { key: "PF", value: "Partnership Firm" },
            { key: "LLP", value: "LLP" },
            { key: "Pvt", value: "Private Limited Company" },
            { key: "Plc", value: "Public Limited Company" },
          ])}
        </InputField>
      </div> */}

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Degree Certificate</strong>
        </Typography>
        <FileUpload
          name="degreeCertificateFile"
          title="Upload Degree Certificate"
        />
      </div>

      <ConfirmAlert
        show={showConfirm}
        body={confirmMessage}
        buttonConfirmText="Yes"
        buttonCancelText="No"
        onClose={() => setShowConfirm(false)}
        onConfirm={onBackConfirm}
      />

      <Button
        type="submit"
        variant="block"
        color="primary"
        sx={{ mt: 2, mb: 3 }}
      >
        Next
      </Button>
    </Paper>
  );
};

export default ProfessionalDetailsForm;
