import React, { useContext, useState, useCallback } from "react";
// import { useNavigate } from "react-router";
import { useRouter } from "next/router";

// import { useMutation } from "react-query";
// import { APIContext } from "../services/api-provider";
import { useDispatch } from "react-redux";
// import { setUser } from "../store/auth";
// import { getLocal, setLocal } from "../utils/storage";
// import { Decryption, Encryption } from "../utils/EncryptDecrypt";

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
const img = require("../assets/backgrounds/background_onbording.png");

const LoginScreen = () => {
  //   const navigate = useNavigate();
  // const state = useSelector((state) => state);
  // console.log("state", state);
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [showError, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  // const { login, forgetPassword } = useContext(APIContext);
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

  // const loginMutation = useMutation((data) => login(data), {
  //   onSuccess: (data) => {
  //     const userData = data?.data;
  //     if (userData?.access_token === "2FA") {
  //       setMobileNo(userData?.mobileNo);
  //       setOpen(true);
  //     } else {
  //       dispatch(
  //         setUser({
  //           user: userData?.entityId,
  //           token: userData?.access_token,
  //           refreshToken: userData?.expires_in,
  //         })
  //       );
  //       setShowSuccess(true);
  //       setSuccessMessage("Login Success");

  //       router.push({ pathname: "/home" });
  //     }
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

  // const forgetPasswordMutation = useMutation((data) => forgetPassword(data), {
  //   onSuccess: (data) => {
  //     const email = methods.getValues("email");
  //     setShowSuccess(true);
  //     setSuccessMessage(data?.data?.message);
  //     router.push({
  //       pathname: "/otp",
  //     });
  //     setLocal(
  //       "tempData",
  //       Encryption(
  //         JSON.stringify({
  //           state: {
  //             email: email,
  //             requestType: "RESET",
  //           },
  //         }),
  //         process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
  //       )
  //     );
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

  const onSubmitHandler = (values) => {
    // console.log("values data", values);

    dispatch(userLogin({ ...values })).then((res) => {
      if (res?.payload?.access_token) {
        setShowSuccess(true);
        setSuccessMessage("Login Success");
        setTimeout(() => {
          router.push({ pathname: "/home" });
        }, [1000]);
      }
    });

    // loginMutation.mutate(values);
  };

  const forgetPasswordHandler = useCallback(async () => {
    await methods.trigger("email");
    const emailValue = methods.getValues("email");
    const fieldState = methods.getFieldState("email");

    // if (!fieldState.error) {
    //   forgetPasswordMutation.mutate({
    //     emailAddress: emailValue,
    //   });
    // }
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
      {
        //   (loginMutation?.isLoading || forgetPasswordMutation?.isLoading) && (
        //   <ProgressIndicator />
        // )
      }
      <InfoAlert
        show={showError || showSuccess}
        title={!showSuccess ? "Error" : "Success"}
        body={!showSuccess ? errorMessage : successMessage}
        onClose={() => setError(false)}
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
