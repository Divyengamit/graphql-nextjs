import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";

import { useMutation, useQuery } from "react-query";
import { APIContext } from "../../services/api-provider";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/auth";

// import { useNavigate } from "react-router";
import { useRouter } from "next/router";

import OtpInput from "react-otp-input";

import FlexBox from "../ui/FlexBox";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";

const OtpDialog = (props) => {
  const OTPLength =
    props?.requestType == "2FA" || props?.requestType == "Auth_2FA" ? 4 : 6;

  const { applyCardConfirm, applyCard, auth_2FA, verify_2FA } =
    useContext(APIContext);
  const { user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { isLoading, refetch } = useQuery(
    ["applyCard", user],
    () => applyCard(user),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const applyCardMutation = useMutation((data) => applyCardConfirm(data), {
    onSuccess: (data) => {
      props?.onClose();
      props?.handleSuccessDialog();
    },
    onError: (error) => {
      props?.onClose();
      props?.handleSuccessDialog();
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const auth2aMutation = useMutation((data) => auth_2FA(data), {
    onSuccess: (data) => {
      const userData = data?.data;
      dispatch(
        setUser({
          user: userData?.entityId,
          token: userData?.access_token,
          refreshToken: userData?.expires_in,
        })
      );
      setError(true);
      setErrorMessage("Login Successfull");

      router.push({ pathname: "/home" });
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const verify2FaMutation = useMutation((data) => verify_2FA(data), {
    onSuccess: (data) => {
      props?.onClose();
      setError(true);
      setErrorMessage("2FA AUTHENTATION ENABLED");
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  useEffect(() => {
    if (!otp || otp?.length < OTPLength) return;

    switch (props?.requestType) {
      case "2FA":
        auth2aMutation.mutate({
          mobileNo: props?.userMobileNo,
          otp,
        });
        break;
      case "Auth_2FA":
        verify2FaMutation.mutate({
          entityId: user,
          enabled_2fa: true,
          otp,
        });
        break;

      default:
        applyCardMutation.mutate({
          entityId: user,
          applicationType: props?.userData?.applicationType,
          otp,
        });
        break;
    }
  }, [otp]);

  const resendOtp = () => {
    setOtp("");
    refetch();
  };

  return (
    <Dialog
      open={props?.state}
      onClose={props?.onClose}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle
        variant="h3Bold"
        color="secondary"
        sx={{ textAlign: "center", pb: 0, pt: 2.5, lineHeight: "40.95px" }}
      >
        {props?.requestType === "2FA"
          ? "2FA AUTHENTICATION"
          : "OTP Verification"}
      </DialogTitle>
      <Typography
        color="primary"
        variant="h5SemiBold"
        sx={{
          textAlign: "center",
          mt: 1.5,
          mb: 1,
        }}
      >
        Code sent to +
        {props?.userData?.mobileNo
          ? props?.userData?.mobileNo
          : props?.userMobileNo}
      </Typography>
      <DialogContent sx={{ pt: 0 }}>
        <FlexBox row sx={{ display: "flex", justifyContent: "center" }}>
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={OTPLength}
            shouldAutoFocus={true}
            inputStyle={{
              margin: 12,
              width: 72,
              height: 72,
              fontSize: 25,
              borderColor: "#EAF0F6",
              borderWidth: 2,
              borderRadius: 5,
              borderStyle: "solid",
              color: "#2C3E50",
            }}
            focusStyle={{
              outline: "none",
              borderColor: "#5F7388",
            }}
            placeholder={
              props?.requestType == "2FA" || props?.requestType == "Auth_2FA"
                ? "----"
                : "------"
            }
          />
        </FlexBox>

        {props?.requestType !== "2FA" && (
          <FlexBox sx={{ justifyContent: "center" }}>
            <Button
              variant="text"
              onClick={resendOtp}
              x={{ mt: 1.3, mb: 2, alignSelf: "center" }}
            >
              Didn’t received? Send code again.
            </Button>
          </FlexBox>
        )}
      </DialogContent>
      {(isLoading ||
        applyCardMutation.isLoading ||
        auth2aMutation.isLoading ||
        verify2FaMutation.isLoading) && <ProgressIndicator />}
      <InfoAlert
        show={showError}
        title="Error"
        body={errorMessage}
        onClose={() => setError(false)}
      />
    </Dialog>
  );
};

export default OtpDialog;
