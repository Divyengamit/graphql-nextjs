import React, { useState } from "react";

import {
  Button,
  Paper,
  // TextField,
  Typography,
  //  IconButton
} from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InputField from "../ui/InputField";
import OptionsTypes from "../onboarding/OptionsTypes";
import FileUpload from "../onboarding/FileUpload";
import FlexBox from "../ui/FlexBox";
import style from "../../styles/EquipmentForm.module.css";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ProfessionalDetailsForm = (props) => {
  // const { watch, setValue, formState } = props;
  // console.log("watch props data", props);
  // const [yearValue, setYearValue, formState] = useState(new Date());

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  return (
    <Paper variant="card" sx={props.sx} className={style.form_card_div}>
      <FlexBox row>
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
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Qualification Year *</strong>
        </Typography>

        <InputField
          type="number"
          name="qualificationYear"
          placeholder="Enter Qualification Year"
          settings={{
            variant: "outlined",
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      </div>
      {/* <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2, mb: 2 }}>
          <strong>Qualification Year *</strong>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            fullWidth
            // value={yearValue}
            value={new Date(props.watch.qualificationYear)}
            onChange={(newValue) => {
              props.setValue("qualificationYear", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="qualificationYear"
                // error={!!props.formState?.errors["qualificationYear"]}
                helperText={null}
                // props.formState?.errors?.["qualificationYear"]?.message
              />
            )}
          />
        </LocalizationProvider>
      </div> */}

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Registration Number *</strong>
        </Typography>

        <InputField
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

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Experience *</strong>
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
      </div>

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
          type="text"
          name="businessStatus"
          placeholder=" Business Ownership Status"
          settings={{
            variant: "outlined",
            sx: { mt: 1.2 },
            fullWidth: true,
          }}
        />
      </div> */}

      <div>
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
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          <strong>Degree Certificate</strong>
        </Typography>
        <FileUpload
          name="degreeCertificateFile"
          title="Upload Degree Certificate"
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

export default ProfessionalDetailsForm;
