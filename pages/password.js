/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Decryption, Encryption } from "../utils/EncryptDecrypt";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BreadCrumb from "../components/ui/BreadCrumb";
import PasswordForm from "../components/onboarding/PasswordForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import { createPasswordSchema, resetPasswordSchema } from "../utils/validation";
const img = require("../assets/backgrounds/background_onbording.png");

const PasswordScreen = () => {
  const router = useRouter();
  console.log(
    "process.env.NEXT_PUBLIC_PUBLIC_KEY ",
    process.env.NEXT_PUBLIC_PUBLIC_KEY
  );
  const { query } = router;
  // const data = localStorage.getItem(process.env.REACT_APP_ENC_KEY);
  // const [urlParamsData, setUrlParamsData] = useState(
  //   Decryption(localStorage.getItem(process.env.REACT_APP_ENC_KEY))
  // );
  // console.log("urlParamsData ", urlParamsData);
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { createUserPassword, resetPassword } = useContext(APIContext);
  const cancelHandler = useCallback(() => {
    router.push(-2);
  });

  const nextHandler = () => {
    // router.push("/create-profile", { state: { requestId: state?.requestId } });
    router.push({
      pathname: "/create-profile",
      // query: { requestId: query?.requestId },
      // as: "/create-profile",
    });
  };

  const methods = useForm({
    resolver: query?.requestType
      ? yupResolver(resetPasswordSchema)
      : yupResolver(createPasswordSchema),
    mode: "onSubmit",
  });

  const createPasswordMutation = useMutation(
    (data) => createUserPassword(data),
    {
      onSuccess: (data) => {
        nextHandler();
      },
      onError: (error) => {
        setError(true);
        setErrorMessage(error?.response?.data?.message || error?.message);
      },
    }
  );

  const resetPasswordMutation = useMutation((data) => resetPassword(data), {
    onSuccess: (data) => {
      setError(true);
      setErrorMessage("Password Reset Success , Please Login ");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      if (query?.requestType === "RESET") {
        await methods.trigger("confirmPassword");

        const password = methods.getValues("password");
        const passwordConfirm = methods.getValues("confirmPassword");
        const fieldState = methods.getFieldState("confirmPassword");
        if (!fieldState.error) {
          resetPasswordMutation.mutate({
            emailAddress: query?.email,
            password: password,
            passwordConfirm: passwordConfirm,
          });
        }
      } else {
        createPasswordMutation.mutate({
          requestId: query?.requestId,
          emailAddress: data?.email,
          password: data?.password,
          passwordConfirm: data?.confirmPassword,
        });
      }
    },
    [methods, methods?.formState]
  );

  return (
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Create Password"]} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PasswordForm
            sx={{ mt: 2, mb: 2 }}
            onCancel={cancelHandler}
            requestType={query?.requestType}
          />
        </form>
      </FormProvider>
      {(createPasswordMutation.isLoading ||
        resetPasswordMutation.isLoading) && <ProgressIndicator />}
      <InfoAlert
        show={showError}
        title="Error"
        body={errorMessage}
        onClose={() => setError(false)}
      />
    </HeroGrid>
  );
};

export default PasswordScreen;
