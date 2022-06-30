import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import FlexBox from "../ui/FlexBox";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";
import {
  applyCard,
  applyCardConfirm,
  auth_2FA,
  verify_2FA,
} from "@/store/Slice/profileSlice";
import { setUser } from "@/store/auth/loginSlice";
import { HOME } from "@/utils/paths";
import { setLocal } from "@/utils/storage";
import { Encryption } from "@/utils/EncryptDecrypt";
import { fetchDashboardDetail } from "@/store/dashboardSlice";

const OtpDialog = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const entityId = props?.userData?.entityId;
  const profileState = useSelector(({ profile }) => profile);

  const OTPLength =
    props?.requestType == "2FA" || props?.requestType == "Auth_2FA" ? 4 : 6;

  const [otp, setOtp] = useState("");
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const onResendOtp = () => {
    dispatch(applyCard(entityId));
  };

  const onApplyCardConfirm = (data) => {
    dispatch(applyCardConfirm(data)).then((res) => {
      if (!res.error) {
        dispatch(fetchDashboardDetail(props?.userData?.entityId));
        props?.onClose();
        props?.handleSuccessDialog();
      }
      if (res.error) {
        dispatch(fetchDashboardDetail(props?.userData?.entityId));
        props?.onClose();
        props?.handleSuccessDialog();
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
    });
  };

  const onAuth_2FA = (data) => {
    dispatch(auth_2FA(data)).then((res) => {
      if (!res.error) {
        const userData = res?.payload?.data;
        dispatch(
          setUser({
            token: userData?.access_token,
            refreshToken: userData?.expires_in,
            role: userData?.role,
          })
        );
        setLocal("access_token", userData?.access_token);
        setLocal(
          "userId",
          Encryption(
            JSON.stringify({
              state: {
                userId: userData?.entityId,
              },
            }),
            process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
          )
        );
        setError(true);
        setErrorMessage("Login Successfully");
        router.push({ pathname: HOME });
      }
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
    });
  };

  const onVerify2Fa = (data) => {
    dispatch(verify_2FA(data)).then((res) => {
      if (!res.error) {
        dispatch(fetchDashboardDetail(props?.userData?.entityId));
        props?.onClose();
        setError(true);
        setErrorMessage("2FA AUTHENTICATION ENABLED");
      }
      if (res.error) {
        dispatch(fetchDashboardDetail(props?.userData?.entityId));
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
    });
  };

  useEffect(() => {
    setOtp("");
  }, []);

  useEffect(() => {
    if (!otp || otp?.length < OTPLength) return;

    switch (props?.requestType) {
      case "2FA":
        onAuth_2FA({
          mobileNo: props?.userMobileNo,
          otp: otp,
        });
        break;
      case "Auth_2FA":
        onVerify2Fa({
          entityId: entityId,
          enabled_2fa: true,
          otp: otp,
        });
        break;

      default:
        onApplyCardConfirm({
          entityId: entityId,
          applicationType: props?.userData?.applicationType,
          otp: otp,
        });
        break;
    }
  }, [otp]);

  const resendOtp = () => {
    setOtp("");
    onResendOtp();
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
      {profileState?.loading && <ProgressIndicator />}
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
