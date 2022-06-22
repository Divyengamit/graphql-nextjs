import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";

import { useMutation, useQueryClient } from "react-query";
import { APIContext } from "../../services/api-provider";
import { useSelector } from "react-redux";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../ui/InputField";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { addPhoneNumberSchema } from "../../utils/validation";

const AddPhoneDialog = (props) => {
  const { userData } = useSelector((state) => state.auth);

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { addPhoneNumber } = useContext(APIContext);
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(addPhoneNumberSchema),
    mode: "onSubmit",
  });

  const addPhoneNumberMutation = useMutation((data) => addPhoneNumber(data), {
    onSuccess: (data) => {
      methods.reset({});
      setError(true);
      setErrorTitle("Success");
      setErrorMessage("Phone Number Added Successfully ");
      setTimeout(() => {
        props?.onClose();
      }, 1000);
      queryClient.invalidateQueries("dashboard");
    },
    onError: (error) => {
      setError(true);
      setErrorTitle("Error");
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmitHandler = (values) => {
    const data = {
      entityId: userData?.entityId,
      mobileNo: "91" + values?.mobileNo,
    };

    addPhoneNumberMutation.mutate(data);
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
            top: 17,
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
          Add Phone Number
        </DialogTitle>
        <DialogContent sx={{ px: 5, py: 3.75, mt: 1 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                New Phone Number
              </Typography>

              <InputField
                type="number"
                name="mobileNo"
                placeholder="Enter New Phone Number"
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
                <AddIcon /> Add Phone Number
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
      {addPhoneNumberMutation.isLoading && <ProgressIndicator />}
    </>
  );
};

export default AddPhoneDialog;
