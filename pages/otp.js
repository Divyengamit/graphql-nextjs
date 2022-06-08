import React, { useState, useContext } from "react";
// import { useNavigate, useLocation } from "react-router";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";

import { getLocal, setLocal, removeLocal } from "../utils/storage";
import { Decryption, Encryption } from "../utils/EncryptDecrypt";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import BreadCrumb from "../components/ui/BreadCrumb";
import OTPForm from "../components/onboarding/OTPForm";
import InfoAlert from "../components/ui/InfoAlert";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";

const img = require("../assets/backgrounds/background_onbording.png");

const OTPScreen = () => {
  const routerParams = getLocal("tempData");
  const [urlParamsData, setUrlParamsData] = useState(
    JSON.parse(
      Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
    )
  );
  const router = useRouter();
  const { verifyOTP, resendOTP, verifyEmailOtp, forgetPassword } =
    useContext(APIContext);

  const [otp, setOtp] = useState();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const nextHandler = () => {
    router.push("/");
  };

  const nextHandlerReset = () => {
    router.push({
      pathname: "/password",
    });
    setLocal(
      "tempData",
      Encryption(
        JSON.stringify({
          state: {
            // requestId: urlParamsData?.state?.requestId,
            // sessionId: sessionId,
            // mobile: mobile,
            email: urlParamsData?.state?.email,
            requestType: "RESET",
          },
        }),
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      )
    );
  };

  const otpMutation = useMutation((data) => verifyOTP(data), {
    onSuccess: (data) => {
      const userData = data?.data;
      setShowSuccess(true);
      setSuccessMessage(userData?.message);
      setTimeout(() => {
        nextHandler();
        removeLocal("tempData");
      }, [3000]);
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const resendMutation = useMutation((mobile) => resendOTP(mobile), {
    onSuccess: (data) => {
      setShowSuccess(true);
      setSuccessMessage(data?.data?.message);
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const verifyEmailOtpMutation = useMutation((data) => verifyEmailOtp(data), {
    onSuccess: (data) => {
      setShowSuccess(true);
      setSuccessMessage("Email verified successfully");
      nextHandlerReset();
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const resendEmailOtpMutation = useMutation((data) => forgetPassword(data), {
    onSuccess: (data) => {
      setShowSuccess(true);
      setSuccessMessage(data?.data?.message);
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const onChangeOtpHandler = (value) => {
    setOtp(value);
  };

  const onSubmitHandler = () => {
    if (urlParamsData?.state?.requestType === "RESET") {
      verifyEmailOtpMutation.mutate({
        emailAddress: urlParamsData?.state.email,
        otp,
      });
    } else {
      otpMutation.mutate({
        requestId: urlParamsData?.state?.requestId,
        sessionId: urlParamsData?.state?.sessionId,
        mobileNo: urlParamsData?.state?.mobile,
        otp,
      });
    }
  };

  const resendHandler = () => {
    if (urlParamsData?.state?.requestType === "RESET") {
      resendEmailOtpMutation.mutate({
        emailAddress: urlParamsData?.state?.email,
      });
    } else {
      resendMutation.mutate(urlParamsData?.state?.mobile);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroGrid img={img}>
        <BreadCrumb items={["Account", "Phone Verification"]} />
        <OTPForm
          userData={urlParamsData?.state}
          sx={{ mt: 2, mb: 2 }}
          onNext={nextHandler}
          onChangeOtp={onChangeOtpHandler}
          onSubmit={onSubmitHandler}
          onResend={resendHandler}
        />
        {(otpMutation.isLoading ||
          resendMutation.isLoading ||
          verifyEmailOtpMutation.isLoading ||
          resendEmailOtpMutation.isLoading) && <ProgressIndicator />}
        <InfoAlert
          show={showError || showSuccess}
          title={!showSuccess ? "Error" : "Success"}
          body={!showSuccess ? errorMessage : successMessage}
          onClose={() => setError(false)}
        />
      </HeroGrid>
    </ThemeProvider>
  );
};

export default OTPScreen;
