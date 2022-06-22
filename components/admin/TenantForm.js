import React from "react";
import { Button, Typography, Box } from "@mui/material";

import InputField from "../ui/InputField";
import OptionsTypes from "../onboarding/OptionsTypes";
import FlexBox from "../ui/FlexBox";

import AddIcon from "@mui/icons-material/Add";

import stateList from "../../data/states";

const TenantForm = (props) => {
  return (
    <Box>
      <FlexBox row sx={{ mt: 1, mb: 2, alignItems: "flex-start" }}>
        <FlexBox sx={{ flex: 1, alignItems: "flex-start", mr: 1 }}>
          <Typography variant="h5SemiBold" sx={{ mt: 3 }}>
            Name of Business
          </Typography>
          <InputField
            type="text"
            name="companyName"
            placeholder="Enter Business Name "
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
        <FlexBox sx={{ flex: 1, alignItems: "flex-start", ml: 1 }}>
          <Typography variant="h5SemiBold" sx={{ mt: 3 }}>
            GST number
          </Typography>
          <InputField
            type="text"
            name="gstNumber"
            placeholder="Enter GST Number"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
      </FlexBox>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Address line 1
      </Typography>
      <InputField
        type="text"
        name="address1"
        placeholder="Enter Address 1"
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
        placeholder="Enter Address 2"
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
            {OptionsTypes(stateList)}
          </InputField>
        </FlexBox>
        <FlexBox sx={{ flex: 1, alignItems: "flex-start", ml: 1 }}>
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
        </FlexBox>
      </FlexBox>

      <Typography variant="h4SemiBold" sx={{ mt: 3, color: "#19BC9C" }}>
        Admin Details
      </Typography>

      <FlexBox row sx={{ mt: 1, mb: 2, alignItems: "flex-start" }}>
        <FlexBox sx={{ flex: 1, alignItems: "flex-start", mr: 1 }}>
          <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
            Name
          </Typography>
          <InputField
            type="text"
            name="adminName"
            placeholder="Enter Admin Name"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
        <FlexBox sx={{ flex: 1, alignItems: "flex-start", ml: 1 }}>
          <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
            Phone Number
          </Typography>
          <InputField
            type="number"
            name="mobileNo"
            placeholder="Your Phone Number"
            settings={{
              variant: "outlined",
              sx: { mt: 1.2 },
              fullWidth: true,
            }}
          />
        </FlexBox>
      </FlexBox>

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Email
      </Typography>
      <InputField
        type="email"
        name="emailAddress"
        placeholder="Enter Email Address"
        settings={{
          variant: "outlined",
          sx: { mt: 1.2 },
          fullWidth: true,
        }}
      />

      <Button type="submit" variant="block" color="secondary" sx={{ mt: 3 }}>
        {props?.requestType === "UPDATE" ? (
          "Update Tenant"
        ) : (
          <>
            <AddIcon /> Add Tenant
          </>
        )}
      </Button>
    </Box>
  );
};

export default TenantForm;
