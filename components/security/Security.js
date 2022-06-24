import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import theme from "../../styles/theme";
import PasswordDialog from "./PasswordDialog";
import OtpDialog from "../dashboard/OtpDialog";
import InfoAlert from "../ui/InfoAlert";
import ProgressIndicator from "../ui/ProgressIndicator";
import SecurityQuestionsDialog from "./SecurityQuestionsDialog";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { enable_2FA } from "@/store/Slice/profileSlice";
import { useRouter } from "next/router";
import { MYPROFILE } from "@/utils/paths";

const Security = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(({ dashboard }) => dashboard.data);
  const profileState = useSelector(({ profile }) => profile);

  const [open, setOpen] = useState(false); // update pwd
  const [checked, setChecked] = useState();
  const [otpDialog, setOtpDialog] = useState(false); // otp verification
  const [questionsDialog, setQuestionsDialog] = useState(false);
  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setChecked(userData?.twoFAenabled);
  }, [userData]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    position: "relative",
    padding: theme.spacing(3.25),
    marginBottom: theme.spacing(2),
    borderRadius: "15px",
    color: theme.palette.text.secondary,
    boxShadow: "none",
  }));

  const StyledText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: "500",
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOtpClose = () => {
    setOtpDialog(false);
  };

  const handleQuestionsClose = () => {
    setQuestionsDialog(false);
  };

  // const verifiy2FaMutation = useMutation((data) => enable_2FA(data), {
  //   onSuccess: (data) => {
  //     setTimeout(() => {
  //       setError(false);
  //       if (!checked) {
  //         setOtpDialog(true);
  //       } else {
  //         setChecked(false);
  //       }
  //     }, 1000);
  //   },
  //   onError: (error) => {
  //     setChecked(userData?.twoFAenabled);
  //     setError(true);
  //     setErrorTitle("Error");
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

  const handle2Step = (state) => {
    dispatch(
      enable_2FA({
        entityId: userData?.entityId,
        mobileNo: userData?.mobileNo,
        enabled_2fa: state,
      })
    ).then((res) => {
      if (!res.error) {
        setTimeout(() => {
          setError(false);
          if (!checked) {
            setOtpDialog(true);
          } else {
            setChecked(false);
          }
        }, 1000);
      }
      if (res.error) {
        setChecked(userData?.twoFAenabled);
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
    });
  };

  const handleRoute = () => {
    router.push({
      pathname: MYPROFILE,
    });
  };

  return (
    <>
      <Paper
        variant="card"
        sx={{
          m: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        style={{ width: "100%" }}
      >
        <IconButton
          aria-label="close"
          onClick={handleRoute}
          sx={{ mr: 2, p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <StyledText variant="subtitle1">Account</StyledText>
        <ChevronRightOutlinedIcon sx={{ mr: 0.2 }} />
        <StyledText
          variant="subtitle1"
          sx={{ color: theme.palette.secondary.main }}
        >
          Security
        </StyledText>
      </Paper>
      <Grid container spacing={2} sx={{ mt: 0.75, mb: 4 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Item>
            <Typography variant="h2SemiBold" sx={{ color: "#2C3E50" }}>
              Password
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ my: 1.75 }}
            >
              <Typography variant="h6" sx={{ color: "#2C3E50" }}>
                Create or update password.
              </Typography>
              <Button
                variant="text"
                sx={{ color: "#5F7388", fontSize: "16px" }}
                onClick={handleClickOpen}
              >
                Update
                <BorderColorIcon
                  sx={{ ml: 0.9, height: "20px", width: "20px" }}
                />
              </Button>
            </Box>
            <Divider sx={{ mb: 2.4 }} />
            <Typography variant="h2SemiBold" sx={{ color: "#2C3E50" }}>
              2-step verification
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ my: 1.75 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#2C3E50", lineHeight: "25.62px" }}
              >
                Add an extra layer of security to your account by using a
                one-time security code in addition to <br />
                your password each time you login.
              </Typography>

              <Switch
                size="medium"
                checked={checked}
                style={{ color: "#2C3E50" }}
                onChange={() => handle2Step(!checked)}
              />
            </Box>
            <Divider sx={{ mb: 2.4 }} />
            <Typography variant="h2SemiBold" sx={{ color: "#2C3E50" }}>
              Security questions
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ my: 1.75 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#2C3E50", lineHeight: "25.62px" }}
              >
                For your protection, please choose 2 security questions. This
                way, we can verify it’s really you it <br /> there’s ever a
                doubt.
              </Typography>
              <Button
                variant="text"
                sx={{ color: "#5F7388", fontSize: "16px" }}
                onClick={() => setQuestionsDialog(true)}
              >
                Create
                <BorderColorIcon
                  sx={{ ml: 0.9, height: "20px", width: "20px" }}
                />
              </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
      {profileState?.loading && <ProgressIndicator />}
      <PasswordDialog userData={userData} state={open} onClose={handleClose} />
      {otpDialog && (
        <OtpDialog
          state={otpDialog}
          onClose={handleOtpClose}
          userData={userData}
          requestType={"Auth_2FA"}
          onCheckedSuccess={() => setChecked(true)}
        />
      )}
      {questionsDialog && (
        <SecurityQuestionsDialog
          userData={userData}
          state={questionsDialog}
          onClose={handleQuestionsClose}
        />
      )}
      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
    </>
  );
};

export default Security;
