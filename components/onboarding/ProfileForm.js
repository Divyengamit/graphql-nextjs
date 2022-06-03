import React, { useState } from "react";
import { Button, Paper, Typography } from "@mui/material";

import FlexBox from "../ui/FlexBox";
import InputField from "../ui/InputField";
import GenderTypes from "./GenderTypes";
import OptionsTypes from "./OptionsTypes";

import stateData from "../../data/states";
import { isPastDate } from "../../utils/date";

const ProfileForm = (props) => {
  const [gender, setGender] = useState("male");
  const [addressType, setAddressType] = useState("PERMENANT");
  const [state, setState] = useState();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear() - 18;

  today = yyyy + "-" + mm + "-" + dd;
  console.log("today", today);

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
    props?.onGenderSelect(event.target.value);
  };

  const addressTypeChangeHandler = (event) => {
    setAddressType(event.target.value);
    props?.onAddressTypeSelect(event.target.value);
  };

  const stateChangeHandler = (event) => {
    setState(event.target.value);
    props?.onStateSelect(event.target.value);
  };

  return (
    <Paper variant="card" sx={props.sx}>
      <FlexBox row sx={{ justifyContent: "space-between" }}>
        <Typography variant="h2Bold" color="secondary">
          Set up your profile
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
        Name on Card *
      </Typography>

      <InputField
        type="text"
        name="cardName"
        placeholder="Enter the Card Name"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Date of Birth *
      </Typography>

      <InputField
        type="date"
        name="dob"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
          InputProps: { inputProps: { min: "100", max: today } },
        }}
      />

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Gender *
      </Typography>

      <InputField
        name="gender"
        settings={{
          fullWidth: true,
          select: true,
          sx: {
            mt: 1.2,
            ".MuiInputBase-input": {
              paddingLeft: 2,
              paddingTop: 1,
              paddingBottom: 1,
            },
          },
        }}
      >
        {GenderTypes()}
      </InputField>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Address Type
      </Typography>
      <InputField
        name="addressType"
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
          { key: "PERMANENT", value: "PERMANENT" },
          { key: "BUSINESS", value: "BUSINESS" },
          { key: "DELIVERY", value: "DELIVERY" },
        ])}
      </InputField>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Address Line 1 *
      </Typography>

      <InputField
        type="text"
        name="addressLine"
        placeholder="House Name/Number"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Address Line 2 *
      </Typography>

      <InputField
        type="text"
        name="addressLine2"
        placeholder="Area/Locality"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Town/City
      </Typography>

      <InputField
        type="text"
        name="city"
        placeholder="Mumbai"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <FlexBox row sx={{ mt: 1, mb: 2, alignItems: "flex-start" }}>
        <FlexBox sx={{ flex: 1, alignItems: "flex-start", mr: 1 }}>
          <Typography variant="h5SemiBold" sx={{ mt: 1.2 }}>
            State *
          </Typography>
          <InputField
            name="state"
            settings={{
              select: true,
              fullWidth: true,
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
            {OptionsTypes(stateData)}
          </InputField>
        </FlexBox>
        <FlexBox sx={{ flex: 1, alignItems: "flex-start", ml: 1 }}>
          <Typography variant="h5SemiBold" sx={{ mt: 1.2 }}>
            Pincode *
          </Typography>
          <InputField
            type="number"
            name="pincode"
            placeholder="400001"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
      </FlexBox>

      <Button variant="block" color="secondary" type="submit">
        Next
      </Button>

      {/* <FlexBox row sx={{ mt: 2, mb: 2 }}>
        <Button
          variant="block"
          color="cancel"
          sx={{ mr: 1 }}
          onClick={props.onCancel}
        >
          Cancel
        </Button>
      </FlexBox> */}
    </Paper>
  );
};
export default ProfileForm;