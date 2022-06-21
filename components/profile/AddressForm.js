import React from "react";
import { Button, Typography, Checkbox, Box } from "@mui/material";

import InputField from "../ui/InputField";
import OptionsTypes from "../onboarding/OptionsTypes";

import AddIcon from "@mui/icons-material/Add";

import stateList from "../../data/states";

const AddressForm = (props) => {
  return (
    <Box>
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
          { text: "PERMANENT", value: "PERMANENT" },
          { text: "BUSINESS", value: "BUSINESS" },
          { text: "DELIVERY", value: "DELIVERY" },
        ])}
      </InputField>
      <Typography variant="h5SemiBold" sx={{ mt: 3 }}>
        Address line 1 *
      </Typography>
      <InputField
        type="text"
        name="address1"
        placeholder="Your house name/no"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Address line 2
      </Typography>
      <InputField
        type="text"
        name="address2"
        placeholder="Your locality/Area"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Town / City
      </Typography>
      <InputField
        type="text"
        name="city"
        placeholder="Your City/Town"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />
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
        {OptionsTypes(stateList)}
      </InputField>
      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        PinCode
      </Typography>
      <InputField
        type="number"
        name="pincode"
        placeholder="eg , 385427"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Typography variant="h5Regular" sx={{ ml: -1, mt: 1.2 }}>
        <Checkbox
          checked={props?.primaryCheck}
          onChange={props?.onCheckPrimary}
        />
        Make this your primary address
      </Typography>

      <Button type="submit" variant="block" color="secondary" sx={{ mt: 2 }}>
        {props?.requestType === "UPDATE" ? (
          "Update address"
        ) : (
          <>
            <AddIcon /> Add Address
          </>
        )}
      </Button>
    </Box>
  );
};

export default AddressForm;
