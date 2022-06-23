import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Divider,
} from "@mui/material";

import { useMutation } from "react-query";
import { APIContext } from "../../services/api-provider";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../ui/InputField";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import OptionsTypes from "../onboarding/OptionsTypes";

import { securityQuestionsSchema } from "../../utils/validation";

const SecurityQuestionsDialog = (props) => {
  const { securityQuestions } = useContext(APIContext);

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const methods = useForm({
    resolver: yupResolver(securityQuestionsSchema),
    mode: "onSubmit",
    defaultValues: {
      question1: props?.userData?.securityQuestions[0]?.id,
      question2: props?.userData?.securityQuestions[5]?.id,
    },
  });

  const setQuestionsMutation = useMutation((data) => securityQuestions(data), {
    onSuccess: (data) => {
      setError(true);
      setErrorTitle("Success");
      setErrorMessage("Security Questions are Set Successfully ");
      methods.reset({});
      setTimeout(() => {
        props?.onClose();
      }, 2000);
    },
    onError: (error) => {
      setError(true);
      setErrorTitle("Error");
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmitHandler = (values) => {
    setQuestionsMutation.mutate({
      entityId: props?.userData?.entityId,
      question1Id: values?.question1,
      answer1: values?.question1_answer,
      question2Id: values?.question2,
      answer2: values?.question2_answer,
    });
  };

  const getQuestions = () => {
    const formattedQuestions = [];
    for (let item of props?.userData?.securityQuestions) {
      formattedQuestions.push({
        text: item?.question,
        value: item?.id,
      });
    }
    return formattedQuestions;
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
            right: 20,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle
          variant="h2Bold"
          color="secondary"
          sx={{ pb: 1.1, px: 5, pt: 3.25, mb: 1 }}
        >
          Security Questions
        </DialogTitle>

        <DialogContent sx={{ px: 5, py: 3.75 }}>
          <DialogContentText variant="h5Regular" sx={{ mb: 2.25 }}>
            We’ll use these questions as a way to make sure it’s your account,
            like if you need to reset your password.
          </DialogContentText>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <Typography variant="h5SemiBold" sx={{ mt: 1.2 }}>
                Security question 1
              </Typography>
              <InputField
                name="question1"
                placeholder="Select a Question"
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
                {OptionsTypes(getQuestions().slice(0, 5))}
              </InputField>

              <InputField
                type="text"
                name="question1_answer"
                placeholder="Type your answer here"
                settings={{
                  variant: "outlined",
                  sx: { mt: 1.2 },
                  fullWidth: true,
                }}
              />

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="h5SemiBold" sx={{ mt: 1.2 }}>
                Security question 2
              </Typography>
              <InputField
                name="question2"
                placeholder="Select a Question"
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
                {OptionsTypes(getQuestions().slice(5, 10))}
              </InputField>

              <InputField
                type="text"
                name="question2_answer"
                placeholder="Type your answer here"
                settings={{
                  variant: "outlined",
                  sx: { mt: 1.2 },
                  fullWidth: true,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3.75, px: 4, py: 1.25 }}
              >
                Save
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
      {setQuestionsMutation.isLoading && <ProgressIndicator />}
    </>
  );
};

export default SecurityQuestionsDialog;
