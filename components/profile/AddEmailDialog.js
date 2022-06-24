import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../ui/InputField";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { addEmailSchema } from "@/utils/validation";
import { addEmail } from "@/store/Slice/profileSlice";
import { fetchDashboardDetail } from "@/store/dashboardSlice";

const AddEmailDialog = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(({ dashboard }) => dashboard.data);
  const profileState = useSelector(({ profile }) => profile);

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const methods = useForm({
    resolver: yupResolver(addEmailSchema),
    mode: "onSubmit",
  });

  const onCloseDialog = () => {
    methods.reset({});
    props?.onClose();
  };

  const onSubmitHandler = (values) => {
    const data = {
      entityId: userData?.entityId,
      emailAddress: values?.emailAddress,
    };
    // props?.onClose();
    dispatch(addEmail({ ...data })).then((res) => {
      console.log("res", res);
      if (!res.error) {
        onCloseDialog();
        dispatch(fetchDashboardDetail(userData?.entityId));
        setError(true);
        setErrorTitle("Success");
        setErrorMessage("Email Added Successfully ");
      }
      if (res.error) {
        onCloseDialog();
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.data?.message || "Something went wrong!");
      }
    });
  };

  return (
    <>
      <Dialog
        open={props?.state}
        onClose={onCloseDialog}
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
            top: 17,
          }}
        >
          <IconButton aria-label="close" onClick={onCloseDialog}>
            <ArrowBackIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
          <Typography variant="h5SemiBold" sx={{ color: "#5F7388" }}>
            Back
          </Typography>
        </Box>

        <IconButton
          aria-label="close"
          onClick={onCloseDialog}
          sx={{
            position: "absolute",
            right: 20,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h2Bold"
          color="secondary"
          sx={{ pb: 1.1, px: 5, pt: 3.25, textAlign: "center" }}
        >
          Add Email
        </DialogTitle>
        <DialogContent sx={{ px: 5, py: 3.75, mt: 1 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                New Email
              </Typography>

              <InputField
                type="email"
                name="emailAddress"
                placeholder="Enter New Email"
                settings={{
                  variant: "outlined",
                  sx: { mt: 1.2 },
                  fullWidth: true,
                }}
              />

              <Button
                type="submit"
                variant="block"
                color="secondary"
                sx={{ mt: 3 }}
              >
                <AddIcon /> Add Email
              </Button>
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

export default AddEmailDialog;
