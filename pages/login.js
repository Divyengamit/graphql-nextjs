import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import BreadCrumb from "../components/ui/BreadCrumb";
import LoginForm from "../components/onboarding/LoginForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import OtpDialog from "../components/dashboard/OtpDialog";

import { loginSchema } from "../utils/validation";
import { userLogin } from "../store/auth/loginSlice";
import { useSelector } from "react-redux";
import { forgetPassword } from "../store/Slice/registerSlice";
import { getLocal, setLocal } from "../utils/storage";
import { Encryption } from "../utils/EncryptDecrypt";
const img = require("../assets/backgrounds/background_onbording.png");

const LoginScreen = () => {
  const registerState = useSelector(({ register }) => register);
  const loginState = useSelector(({ auth }) => auth);

  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [showError, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [mobileNo, setMobileNo] = useState();

  const signupHandler = () => {
    router.push({ pathname: "/signup" });
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleClose = () => {
    setOpen(false);
  };
  const onCloseInfo = () => {
    setError(false);
    setShowSuccess(false);
  };

  useEffect(() => {
    // redirect to home if already logged in
    if (getLocal("access_token")) {
      router.push("/home");
    }
  }, []);

  const onForgotPassword = (data) => {
    dispatch(forgetPassword(data)).then((res) => {
      if (!res.error) {
        setShowSuccess(true);
        setSuccessMessage(res.payload?.message);

        setLocal(
          "tempData",
          Encryption(
            JSON.stringify({
              state: {
                email: data.emailAddress,
                requestType: "RESET",
              },
            }),
            process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
          )
        );
        router.push({
          pathname: "/otp",
        });
      }
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };

  const onSubmitHandler = (values) => {
    dispatch(userLogin({ ...values })).then((res) => {
      if (!res.error) {
        const userData = res?.payload;
        if (userData?.access_token === "2FA") {
          setMobileNo(userData?.mobileNo);
          setOpen(true);
        } else {
          setLocal("access_token", userData?.access_token);
          setShowSuccess(true);
          setSuccessMessage("Login Success");
          router.push({ pathname: "/home" });
        }
      }
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };

  const forgetPasswordHandler = useCallback(async () => {
    await methods.trigger("email");
    const emailValue = methods.getValues("email");
    const fieldState = methods.getFieldState("email");

    if (!fieldState.error) {
      await onForgotPassword({
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
      {(registerState?.loading || loginState?.loading) && <ProgressIndicator />}
      <InfoAlert
        show={showError || showSuccess}
        title={!showSuccess ? "Error" : "Success"}
        body={!showSuccess ? errorMessage : successMessage}
        onClose={onCloseInfo}
      />
      <OtpDialog
        state={open}
        onClose={handleClose}
        requestType="2FA"
        userMobileNo={mobileNo}
      />
      ;
    </HeroGrid>
  );
};

export default LoginScreen;
