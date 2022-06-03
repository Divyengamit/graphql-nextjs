import React, { useContext, useState, useCallback } from "react";
// import { useNavigate } from "react-router";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";
import { useDispatch } from "react-redux";
// import { setUser } from "../store/auth";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import BreadCrumb from "../components/ui/BreadCrumb";
import LoginForm from "../components/onboarding/LoginForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
// import OtpDialog from "../components/dashboard/OtpDialog";

import { loginSchema } from "../utils/validation";
const img = require("../assets/backgrounds/background_onbording.png");

const LoginScreen = () => {
  //   const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { login, forgetPassword } = useContext(APIContext);
  const [mobileNo, setMobileNo] = useState();

  const signupHandler = () => {
    router.push("/signup");
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const loginMutation = useMutation((data) => login(data), {
    onSuccess: (data) => {
      const userData = data?.data;
      if (userData?.access_token === "2FA") {
        setMobileNo(userData?.mobileNo);
        setOpen(true);
      } else {
        dispatch();
        //   setUser({
        //     user: userData?.entityId,
        //     token: userData?.access_token,
        //     refreshToken: userData?.expires_in,
        //   })
        setError(true);
        setErrorMessage("Login Success");
        router.push("/home");
      }
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const forgetPasswordMutation = useMutation((data) => forgetPassword(data), {
    onSuccess: (data) => {
      const email = methods.getValues("email");
      setError(true);
      setErrorMessage(data?.data?.message);
      router.push(
        "/otp",
        {
          query: {
            email,
            requestType: "RESET",
          },
        },
        "/otp"
      );
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmitHandler = (values) => {
    loginMutation.mutate(values);
  };

  const forgetPasswordHandler = useCallback(async () => {
    await methods.trigger("email");
    const emailValue = methods.getValues("email");
    const fieldState = methods.getFieldState("email");

    if (!fieldState.error) {
      forgetPasswordMutation.mutate({
        emailAddress: emailValue,
      });
    }
  }, [methods, methods?.formState]);

  return (
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Login"]} goBack={true} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <LoginForm
            sx={{ mt: 2, mb: 2 }}
            onSignup={signupHandler}
            onforgetPassword={forgetPasswordHandler}
          />
        </form>
      </FormProvider>
      {(loginMutation?.isLoading || forgetPasswordMutation?.isLoading) && (
        <ProgressIndicator />
      )}
      <InfoAlert
        show={showError}
        title="Error"
        body={errorMessage}
        onClose={() => setError(false)}
      />
      {/* <OtpDialog
        state={open}
        onClose={handleClose}
        requestType="2FA"
        userMobileNo={mobileNo}
      /> */}
      ;
    </HeroGrid>
  );
};

export default LoginScreen;
