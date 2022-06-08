import React, { useCallback, useContext, useState } from "react";
// import Router, { withRouter, useRouter } from "next/router";
// import { Router } from "react-router";

import { useRouter } from "next/router";
import { Decryption, Encryption } from "../utils/EncryptDecrypt";
import { setLocal } from "../utils/storage";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";
import { NextPageContext, GetServerSideProps } from "next";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BreadCrumb from "../components/ui/BreadCrumb";
import SignupForm from "../components/onboarding/SignupForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import { SignUpSchema } from "../utils/validation";
const img = require("../assets/backgrounds/background_onbording.png");

const SignupScreen = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { registerUser } = useContext(APIContext);

  const cancelHandler = () => {
    router.push("/");
  };

  const nextHandler = ({ requestId }) => {
    router.push({ pathname: "/password" });
    setLocal(
      "tempData",
      Encryption(
        JSON.stringify({
          state: {
            requestId,
          },
        }),
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      )
    );
  };

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: "onSubmit",
  });

  const registerUserMutation = useMutation((data) => registerUser(data), {
    onSuccess: (data) => {
      // methods.reset(methods.getValues());
      nextHandler(data?.data);
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message || error?.message);
      setError(true);
    },
  });

  const onSubmitHandler = useCallback((data) => {
    registerUserMutation.mutate(data);
  });

  return (
    // <ThemeProvider theme={theme}>
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Customer Registration"]} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <SignupForm
            sx={{ mt: 2, mb: 2 }}
            onCancel={cancelHandler}
            onNext={nextHandler}
          />
        </form>
      </FormProvider>
      {registerUserMutation.isLoading && <ProgressIndicator />}
      <InfoAlert
        show={showError || showSuccess}
        title={!showSuccess ? "Error" : "Success"}
        body={!showSuccess ? errorMessage : successMessage}
        onClose={() => setError(false)}
      />
    </HeroGrid>
    // </ThemeProvider>
  );
};
export default SignupScreen;
// export default withRouter(SignupScreen);
