import React, { useState } from "react";
import { useRouter } from "next/router";
import { getLocal, removeLocal, setLocal } from "../utils/storage";
import { Decryption, Encryption } from "../utils/EncryptDecrypt";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import BreadCrumb from "../components/ui/BreadCrumb";
import OTPForm from "../components/onboarding/OTPForm";
import InfoAlert from "../components/ui/InfoAlert";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  resendOTP,
  verifyEmailOtp,
  verifyOTP,
} from "../store/Slice/registerSlice";
import { CREATE_PASSWORD } from "@/utils/paths";

const img = require("../assets/backgrounds/background_onbording.png");

const OTPScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const registerState = useSelector(({ register }) => register);
  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  const [otp, setOtp] = useState();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [showProgress, setShowProgress] = useState(false);
  const [progressMessage, setProgressMessage] = useState();

  const nextHandler = () => {
    router.push("/");
  };

  const nextHandlerReset = () => {
    router.push({
      pathname: CREATE_PASSWORD,
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

  const onVerifyOTP = () => {
    let temp = {
      requestId: urlParamsData?.state?.requestId,
      sessionId: urlParamsData?.state?.sessionId,
      mobileNo: urlParamsData?.state?.mobile,
      otp,
    };
    dispatch(verifyOTP(temp)).then((res) => {
      if (res?.payload?.data?.message === "Min KYC could not be completed.") {
        setShowProgress(true);
        setProgressMessage("Please wait the minimum KYC is under progress.");
      } else {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      // if (res.error) {

      // }
      if (!res.error) {
        const userData = res.payload;

        setShowSuccess(true);
        setSuccessMessage(userData?.message);
        setTimeout(() => {
          removeLocal("tempData");
          nextHandler();
        }, [3000]);
      }
    });
  };

  const onCloseInfo = () => {
    setError(false);
    setShowSuccess(false);
    setShowProgress(false);
  };

  const onResend = () => {
    dispatch(resendOTP(urlParamsData?.state?.mobile)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        setShowSuccess(true);
        setSuccessMessage(res?.payload?.message);
      }
    });
  };

  // email
  const onVerifyEmailOtp = () => {
    let temp = {
      emailAddress: urlParamsData?.state.email,
      otp,
    };
    dispatch(verifyEmailOtp(temp)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        setShowSuccess(true);
        setSuccessMessage("Email verified successfully");
        nextHandlerReset();
      }
    });
  };

  const onResendEmailOtp = (data) => {
    dispatch(forgetPassword(data)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        setShowSuccess(true);
        setSuccessMessage(res?.payload?.message);
      }
    });
  };

  const onChangeOtpHandler = (value) => {
    setOtp(value);
  };

  const onSubmitHandler = async () => {
    if (urlParamsData?.state?.requestType === "RESET") {
      await onVerifyEmailOtp();
    } else {
      await onVerifyOTP();
    }
  };

  const resendHandler = async () => {
    if (urlParamsData?.state?.requestType === "RESET") {
      await onResendEmailOtp({
        emailAddress: urlParamsData?.state?.email,
      });
    } else {
      await onResend();
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
        {registerState?.loading && <ProgressIndicator />}
        <InfoAlert
          show={showError || showSuccess || showProgress}
          title={
            (showSuccess && "Success") ||
            (showError && "Error") ||
            (showProgress && "Progress")
          }
          body={
            (showSuccess && successMessage) ||
            (showError && errorMessage) ||
            (showProgress && progressMessage)
          }
          onClose={() => onCloseInfo()}
        />
      </HeroGrid>
    </ThemeProvider>
  );
};

export default OTPScreen;
