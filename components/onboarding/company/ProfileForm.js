import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Radio,
  Typography,
} from "@mui/material";
import FlexBox from "../../ui/FlexBox";
import InputField from "../../ui/InputField";
import GenderTypes from "../GenderTypes";
import OptionsTypes from "../OptionsTypes";
import stateData from "../../../data/states";
import { Decryption } from "../../../utils/EncryptDecrypt";
import { getLocal } from "../../../utils/storage";
import { useStyles } from "@/utils/removeEncrCss";

const ProfileForm = (props) => {
  const classes = useStyles();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear() - 18;

  today = yyyy + "-" + mm + "-" + dd;
  const methods = props.methods;
  const reset = methods.reset;
  const setValue = methods.setValue;
  const form = methods.watch();

  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (
      urlParamsData?.state?.AddressInfo &&
      urlParamsData?.state?.AddressInfo?.length
    ) {
      setIsOpen(true);
    }
  }, []);

  const onSelectAddress = () => {
    const selectedAddress =
      urlParamsData?.state?.AddressInfo[form.address] || {};

    const temp = {
      state: selectedAddress?.State || "",
      addressLine: selectedAddress?.Address || "",
      // addressLine2: "",
      city: selectedAddress?.State || "",
      pincode: selectedAddress?.Postal || "",
    };

    reset({
      ...form,
      ...temp,
    });
    onClose();
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
            03/04
          </Typography>
        </FlexBox>
      </FlexBox>

      {/* <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
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
      </InputField> */}

      {urlParamsData?.state?.AddressInfo &&
        urlParamsData?.state?.AddressInfo?.length && (
          <Button sx={{ mt: 2 }} onClick={() => setIsOpen(true)}>
            Click To Select Address
          </Button>
        )}

      <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
        Address Line 1 *
      </Typography>

      <InputField
        type="text"
        name="address1"
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
        name="address2"
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
            className={classes.input}
            type="number"
            name="pincode"
            placeholder="400001"
            settings={{
              variant: "outlined",
              sx: {
                mt: 1.2,
                ".MuiInputBase-input": {
                  paddingLeft: 4,
                  paddingTop: 3,
                  paddingBottom: 3,
                },
              },
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
      <Dialog
        open={isOpen}
        // onClose={onClose}
        fullWidth
        // maxWidth={"xs"}
        sx={{ borderRadius: "10px" }}
        PaperProps={{
          style: { borderRadius: "15px", padding: "16px" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5SemiBold" style={{ fontSize: "18px" }}>
            Select Address
          </Typography>
        </DialogTitle>
        {urlParamsData?.state?.AddressInfo &&
          urlParamsData?.state?.AddressInfo?.length !== 0 &&
          urlParamsData?.state?.AddressInfo.map((item, index) => {
            return (
              <div key={index} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5SemiBold"
                    gutterBottom
                    component="div"
                    sx={{ fontSize: "14px" }}
                  >
                    {`Address ${index + 1}`}
                  </Typography>
                  <Radio
                    name="address"
                    color="success"
                    checked={form.address === index}
                    onChange={() => setValue("address", index)}
                    sx={{ p: 0 }}
                    size="small"
                  />
                </div>

                <Typography variant="subtitle1" gutterBottom component="div">
                  {item?.Address && `${item?.Address},`}
                  {item?.State && `${item?.State},`}
                  {item?.Postal && `${item?.Postal}`}
                </Typography>
              </div>
            );
          })}
        <DialogActions>
          <Button
            onClick={onClose}
            autoFocus
            variant="contained"
            color="secondary"
            sx={{ width: "70px" }}
          >
            {"Cancel"}
          </Button>

          <Button
            onClick={onSelectAddress}
            autoFocus
            variant="contained"
            sx={{ width: "70px" }}
          >
            {"Ok"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
export default ProfileForm;
