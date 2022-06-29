import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addAddressSchema } from "../../utils/validation";
import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "@/store/Slice/profileSlice";
import { fetchDashboardDetail } from "@/store/dashboardSlice";

const AddressDialog = (props) => {
  const dispatch = useDispatch();
  const profileState = useSelector(({ profile }) => profile);
  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [primaryCheck, setPrimaryCheck] = useState();

  const methods = useForm({
    resolver: yupResolver(addAddressSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    setPrimaryCheck(props?.address?.primaryAddress);
  }, [props?.address?.primaryAddress]);

  const getAddressValues = (type) => {
    switch (type) {
      case "PERMANENT_ADDRESS":
        return "PERMANENT";
      case "BUSINESS_ADDRESS":
        return "BUSINESS";
      default:
        return "DELIVERY";
    }
  };

  useEffect(() => {
    let updatedFields = {};
    for (let key in props?.address) {
      if (props?.address[key]) {
        updatedFields[key] = props?.address[key];
        if (key === "addressType") {
          updatedFields[key] = getAddressValues(props?.address[key]);
        }
      }
    }
    methods.reset(
      props?.requestType === "UPDATE"
        ? updatedFields
        : {
            state: "AP",
            addressType: "PERMANENT",
          }
    );
  }, [props.address, props?.requestType, methods]);

  const getAddressType = (type) => {
    switch (type) {
      case "PERMANENT":
        return "PERMANENT_ADDRESS";
      case "BUSINESS":
        return "BUSINESS_ADDRESS";
      default:
        return "DELIVERY_ADDRESS";
    }
  };

  const onSubmitHandler = (values) => {
    const formData = {
      entityId: props?.userData?.entityId,
      addressType: getAddressType(values?.addressType),
      address1: values?.address1,
      address2: values?.address2,
      city: values?.city,
      state: values?.state,
      pincode: values?.pincode,
      primaryAddress: primaryCheck ? primaryCheck : false,
    };

    if (props?.requestType === "UPDATE") {
      formData["id"] = props?.address?.id;
    }

    dispatch(addAddress(formData)).then((res) => {
      if (!res.error) {
        dispatch(fetchDashboardDetail(props?.userData?.entityId));
        setError(true);
        setErrorTitle("Success");
        setErrorMessage(
          props?.requestType === "UPDATE"
            ? "Address updated Successfully "
            : "Address Added Successfully "
        );
        setTimeout(() => {
          props?.onClose();
          setError(false);
        }, 1000);
      }
      if (res.error) {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };

  const handleSetAsPrimary = () => {
    setPrimaryCheck((prev) => !prev);
  };

  return (
    <>
      <Dialog
        open={props?.state}
        onClose={props?.onClose}
        fullWidth
        maxWidth={"xs"}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            position: "absolute",
            left: 20,
            top: 11,
          }}
        >
          <IconButton aria-label="close" onClick={props?.onClose}>
            <ArrowBackIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
          <Typography variant="h5SemiBold" sx={{ color: "#5F7388" }}>
            Back
          </Typography>
        </Box>

        <IconButton
          aria-label="close"
          onClick={props?.onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h2Bold"
          color="secondary"
          sx={{ textAlign: "center", pt: 2.5 }}
        >
          {props?.requestType === "UPDATE"
            ? "Update address"
            : "Add a new address"}
        </DialogTitle>
        <DialogContent sx={{ px: 5, py: 3.75 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <AddressForm
                primaryCheck={primaryCheck}
                onCheckPrimary={handleSetAsPrimary}
                requestType={props.requestType}
              />
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      {profileState?.loading && <ProgressIndicator />}
    </>
  );
};

export default AddressDialog;
