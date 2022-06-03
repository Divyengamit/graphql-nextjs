import React, { useState, useContext } from "react";
// import { useNavigate, useLocation } from "react-router";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import BreadCrumb from "../components/ui/BreadCrumb";
import OTPForm from "../components/onboarding/OTPForm";
import InfoAlert from "../components/ui/InfoAlert";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";

const img = require("../assets/backgrounds/background_onbording.png");

const OTPScreen = () => {
  //   const navigate = useNavigate();
  //   const { state } = useLocation();
  const router = useRouter();
  const { query } = router;
  const { verifyOTP, resendOTP, verifyEmailOtp, forgetPassword } =
    useContext(APIContext);

  const [otp, setOtp] = useState();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const nextHandler = () => {
    router.push("/");
  };

  const nextHandlerReset = () => {
    // navigate("/password", {
    //   state: {
    //     email: state?.email,
    //     requestType: "RESET",
    //   },
    // });
    router.push({
      pathname: "/password",
      query: { email: query?.email, requestType: "RESET" },
    });
  };

  const otpMutation = useMutation((data) => verifyOTP(data), {
    onSuccess: (data) => {
      const userData = data?.data;
      setError(true);
      setErrorMessage(userData?.message);

      setTimeout(() => {
        nextHandler();
      }, [3000]);
    },
    onError: (error) => {
      console.log("Error Here ", error);
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const resendMutation = useMutation((mobile) => resendOTP(mobile), {
    onSuccess: (data) => {
      setError(true);
      setErrorMessage(data?.data?.message);
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
      console.log("Error Here ", error);
    },
  });

  const verifyEmailOtpMutation = useMutation((data) => verifyEmailOtp(data), {
    onSuccess: (data) => {
      setError(true);
      setErrorMessage("Email verified successfully");
      nextHandlerReset();
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
      console.log("Error Here ", error);
    },
  });

  const resendEmailOtpMutation = useMutation((data) => forgetPassword(data), {
    onSuccess: (data) => {
      setError(true);
      setErrorMessage(data?.data?.message);
    },
    onError: (error) => {
      console.log("Error Here ", error);
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const onChangeOtpHandler = (value) => {
    setOtp(value);
  };

  const onSubmitHandler = () => {
    if (query?.requestType === "RESET") {
      verifyEmailOtpMutation.mutate({
        emailAddress: query?.email,
        otp,
      });
    } else {
      otpMutation.mutate({
        requestId: query?.requestId,
        sessionId: query?.sessionId,
        mobileNo: query?.mobile,
        otp,
      });
    }
  };

  const resendHandler = () => {
    if (query?.requestType === "RESET") {
      resendEmailOtpMutation.mutate({
        emailAddress: query?.email,
      });
    } else {
      resendMutation.mutate(query?.mobile);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroGrid img={img}>
        <BreadCrumb items={["Account", "Phone Verification"]} />
        <OTPForm
          userData={query}
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
          show={showError}
          title="Error"
          body={errorMessage}
          onClose={() => setError(false)}
        />
      </HeroGrid>
    </ThemeProvider>
  );
};

export default OTPScreen;
