import React from "react";

import { Button, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InputField from "../ui/InputField";
import OptionsTypes from "../onboarding/OptionsTypes";
import FileUpload from "../onboarding/FileUpload";
import FlexBox from "../ui/FlexBox";
import style from "../../styles/EquipmentForm.module.css";

const ProfessionalDetailsForm = (props) => {
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
          Equipment Finance Form
        </Typography>
      </FlexBox>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          University Name *
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
          Qualification Year *
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

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          Degree Certificate
        </Typography>
        <FileUpload name="bankStmtFile" title="Upload Bank Statment" />
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          Registration Number *
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
          State Medical Council *
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
      </div>

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          Hospital/Diagnostic/Clinic Centre Name *
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
          Hospital/Diagnostic/Clinic Centre Vintage *
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

      <div>
        <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
          Business Ownership Status *
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
      </div>

      <Button
        type="button"
        variant="block"
        color="primary"
        sx={{ mt: 2, mb: 3 }}
        onClick={props.onClickNext}
      >
        Next
      </Button>
    </Paper>
  );
};

export default ProfessionalDetailsForm;
