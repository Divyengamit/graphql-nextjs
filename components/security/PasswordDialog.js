import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import InfoAlert from "../ui/InfoAlert";
import ProgressIndicator from "../ui/ProgressIndicator";
import PasswordForm from "./PasswordForm";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { changePasswordSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@/store/Slice/profileSlice";

const PasswordDialog = (props) => {
  const dispatch = useDispatch();
  const profileState = useSelector(({ profile }) => profile);
  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    methods.reset({ passwordOld: "", passwordNew: "", passwordConfirm: "" });
  }, [props, methods]);

  const onSubmitHandler = (values) => {
    dispatch(
      changePassword({
        emailAddress: props?.userData?.emailAddress,
        entityId: props?.userData?.entityId,
        ...values,
      })
    ).then((res) => {
      if (!res.error) {
        setError(true);
        setErrorTitle("Success");
        setErrorMessage("Password Changed Successfully ");
        methods.reset({});
        props?.onClose();
      }
      if (res.error) {
        props?.onClose();
        methods.reset({
          passwordOld: "",
          passwordNew: "",
          passwordConfirm: "",
        });
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };

  return (
    <>
      <Dialog
        open={props?.state}
        onClose={props?.onClose}
        maxWidth={"xs"}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={props?.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 15,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h2Bold"
          color="secondary"
          sx={{ pb: 1.1, px: 5, pt: 3.25 }}
        >
          Change Your Password
        </DialogTitle>
        <DialogContent sx={{ px: 5, py: 3.75 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <PasswordForm />
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

export default PasswordDialog;
