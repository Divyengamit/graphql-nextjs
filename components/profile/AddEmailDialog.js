import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";

import { useMutation } from "react-query";
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

import { addEmailSchema } from "../../utils/validation";

const AddEmailDialog = (props) => {
  const { userData } = useSelector((state) => state.auth);

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { addEmail } = useContext(APIContext);

  const methods = useForm({
    resolver: yupResolver(addEmailSchema),
    mode: "onSubmit",
  });

  const addEmailMutation = useMutation((data) => addEmail(data), {
    onSuccess: (data) => {
      methods.reset({});
      setError(true);
      setErrorTitle("Success");
      setErrorMessage("Email Added Successfully ");
      setTimeout(() => {
        props?.onClose();
      }, 1000);
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
      emailAddress: values?.emailAddress,
    };
    addEmailMutation.mutate(data);
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
      {addEmailMutation.isLoading && <ProgressIndicator />}
    </>
  );
};

export default AddEmailDialog;
