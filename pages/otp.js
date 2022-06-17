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

  const onVerifyOTP = () => {
    let temp = {
      requestId: urlParamsData?.state?.requestId,
      sessionId: urlParamsData?.state?.sessionId,
      mobileNo: urlParamsData?.state?.mobile,
      otp,
    };
    dispatch(verifyOTP(temp)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        const userData = res.payload;
        // // console.log("userData", userData);
        setShowSuccess(true);
        setSuccessMessage(userData?.message);
        setTimeout(() => {
          removeLocal("tempData");
          nextHandler();
        }, [3000]);
      }
    });
  };
  // const otpMutation = useMutation((data) => verifyOTP(data), {
  //   onSuccess: (data) => {
  //     const userData = data?.data;
  //     setShowSuccess(true);
  //     setSuccessMessage(userData?.message);
  //     setTimeout(() => {
  //       nextHandler();
  //       removeLocal("tempData");
  //     }, [3000]);
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });
  const onCloseInfo = () => {
    setError(false);
    setShowSuccess(false);
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
  // const resendMutation = useMutation((mobile) => resendOTP(mobile), {
  //   onSuccess: (data) => {
  //     setShowSuccess(true);
  //     setSuccessMessage(data?.data?.message);
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

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
  // const verifyEmailOtpMutation = useMutation((data) => verifyEmailOtp(data), {
  //   onSuccess: (data) => {
  //     setShowSuccess(true);
  //     setSuccessMessage("Email verified successfully");
  //     nextHandlerReset();
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

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
  // const resendEmailOtpMutation = useMutation((data) => forgetPassword(data), {
  //   onSuccess: (data) => {
  //     setShowSuccess(true);
  //     setSuccessMessage(data?.data?.message);
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

  const onChangeOtpHandler = (value) => {
    setOtp(value);
  };

  const onSubmitHandler = async () => {
    if (urlParamsData?.state?.requestType === "RESET") {
      // verifyEmailOtpMutation.mutate({
      //   emailAddress: urlParamsData?.state.email,
      //   otp,
      // });
      await onVerifyEmailOtp();
    } else {
      await onVerifyOTP();
      // otpMutation.mutate({
      //   requestId: urlParamsData?.state?.requestId,
      //   sessionId: urlParamsData?.state?.sessionId,
      //   mobileNo: urlParamsData?.state?.mobile,
      //   otp,
      // });
    }
  };

  const resendHandler = async () => {
    if (urlParamsData?.state?.requestType === "RESET") {
      // resendEmailOtpMutation.mutate({
      //   emailAddress: urlParamsData?.state?.email,
      // });
      await onResendEmailOtp({
        emailAddress: urlParamsData?.state?.email,
      });
    } else {
      // resendMutation.mutate(urlParamsData?.state?.mobile);
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
          show={showError || showSuccess}
          title={!showSuccess ? "Error" : "Success"}
          body={!showSuccess ? errorMessage : successMessage}
          onClose={() => onCloseInfo()}
        />
      </HeroGrid>
    </ThemeProvider>
  );
};

export default OTPScreen;
