import React, { useState, useContext, useCallback } from "react";
import { Container } from "@mui/material";
// import { useNavigate } from "react-router";
import { useRouter } from "next/router";
import { Decryption, Encryption } from "../../utils/EncryptDecrypt";
import { setLocal } from "../../utils/storage";

import { useQuery, useMutation } from "react-query";
import { APIContext } from "../../services/api-provider";
import { useSelector } from "react-redux";

import MainAppBar from "../../components/navigation/MainAppBar";
import OtpDialog from "../../components/dashboard/OtpDialog";
import SuccessDialog from "../../components/dashboard/SuccessDialog";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import ApplyDialog from "../../components/dashboard/ApplyDialog";
import Transactions from "../../components/transactions/Transactions";
import FooterMain from "../../components/navigation/FooterMain";
import InfoAlert from "../../components/ui/InfoAlert";
import FlexBox from "../../components/ui/FlexBox";
import Dashboard from "../../components/dashboard/Dashboard";
import TabBar from "../../components/navigation/TabBar";
const HomeScreen = () => {
  //   const navigate = useNavigate();
  const router = useRouter();
  const { fetchDashboardDetails, enable_2FA } = useContext(APIContext);
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useQuery(["dashboard", user], () =>
    fetchDashboardDetails(user)
  );

  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openApplyDialog, setApplyDialog] = useState(false);

  const [showDashboard, setShowDashboard] = useState(true);
  const [is2FA, set2fA] = useState(false);
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const enable2FaMutation = useMutation((data) => enable_2FA(data), {
    onSuccess: (data) => {
      setOpen(true);
      setTimeout(() => {
        setShowSuccess(true);
        setSuccessMessage(data?.data?.message);
      }, 1000);
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  //otp dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Success Dialog
  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  // Apply Dialog
  const handleApplyClick = () => {
    setApplyDialog(true);
  };

  const handleApplyClose = () => {
    setApplyDialog(false);
  };

  const handleTransactionsClick = () => setShowDashboard(false);

  const handleDashboardClick = () => setShowDashboard(true);

  const onEnable2faHandler = useCallback(
    (data) => {
      set2fA(true);
      enable2FaMutation.mutate({
        entityId: data?.entityId,
        mobileNo: data?.mobileNo,
      });
    },
    [is2FA]
  );

  const handleExploreFinancing = useCallback(() => {
    // router.push("home/finance", { state: { userData: data?.data } });
    router.push({ pathname: "home/finance" });
    setLocal(
      "tempData",
      Encryption(
        JSON.stringify({
          state: {
            userData: data?.data,
          },
        }),
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      )
    );
  });

  return (
    <>
      <FlexBox sx={{ minHeight: "100vh" }}>
        <MainAppBar userData={data?.data} />

        <Container maxWidth="xl">
          <TabBar
            userData={data?.data}
            showDashboard={showDashboard}
            onDashboardClick={handleDashboardClick}
            onTransactionClick={handleTransactionsClick}
            onApplyClick={handleApplyClick}
          />

          {showDashboard ? (
            <Dashboard
              userData={data?.data}
              onExploreFinancingClick={handleExploreFinancing}
            />
          ) : (
            <Transactions userData={data?.data} />
          )}
          <InfoAlert
            show={showError || showSuccess}
            title={!showSuccess ? "Error" : "Success"}
            body={!showSuccess ? errorMessage : successMessage}
            onClose={() => setError(false)}
          />

          <OtpDialog
            state={open}
            onClose={handleClose}
            userData={data?.data}
            handleSuccessDialog={handleClickOpenSuccess}
            requestType={is2FA && "Auth_2FA"}
          />
          <SuccessDialog state={openSuccess} onClose={handleCloseSuccess} />
          <ApplyDialog
            state={openApplyDialog}
            onClose={handleApplyClose}
            userData={data?.data}
            handleOtpDialog={handleClickOpen}
            handleSuccessDialog={handleClickOpenSuccess}
          />

          {(isLoading || enable2FaMutation.isLoading) && <ProgressIndicator />}
        </Container>

        <FooterMain />
      </FlexBox>
    </>
  );
};

export default HomeScreen;
