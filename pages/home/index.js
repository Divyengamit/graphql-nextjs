import React, { useState, useContext, useCallback, useEffect } from "react";
import { Container } from "@mui/material";
// import { useNavigate } from "react-router";
import { useRouter } from "next/router";
import { Decryption, Encryption } from "../../utils/EncryptDecrypt";
import { getLocal, setLocal } from "../../utils/storage";

import { useQuery, useMutation } from "react-query";
import { APIContext } from "../../services/api-provider";
import { connect, useDispatch, useSelector, useStore } from "react-redux";
// import { GetServerSideProps } from "next";

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
// import { wrapper } from "../../store/store";
// import { fetchDashboardDetails } from "../../services/service";
import { fetchDashboardDetail } from "../../store/dashboardSlice";

// import { getLocal } from "../../utils/storage";

// const user = getLocal("root");
// let store = useStore();
// export async function getServerSideProps({ store }) {
//   const userId = store.getState().state.auth;
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`);
//   // const data = await res.json();

//   // Pass data to the page via props
//   return { props: {} };
// }

const HomeScreen = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const router = useRouter();
  const { enable_2FA } = useContext(APIContext);
  // const { user } = useSelector((state) => state.auth);
  const dashboardState = useSelector((state) => state.dashboard);
  // const { data, isLoading } = useQuery(["dashboard", user], () =>
  //   fetchDashboardDetails(user)
  // );
  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    if (userID?.state?.userId) {
      dispatch(fetchDashboardDetail(userID?.state?.userId)).then((res) => {
        if (!res.error) {
          setData(res.payload);
        }
      });
    }
  }, [userID?.state?.userId]);

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
            userData: data,
          },
        }),
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      )
    );
  });

  return (
    <>
      <FlexBox sx={{ minHeight: "100vh" }}>
        <MainAppBar userData={data} />

        <Container maxWidth="xl" className="custom-container">
          <TabBar
            userData={data}
            showDashboard={showDashboard}
            onDashboardClick={handleDashboardClick}
            onTransactionClick={handleTransactionsClick}
            onApplyClick={handleApplyClick}
          />

          {showDashboard ? (
            <Dashboard
              userData={data}
              onExploreFinancingClick={handleExploreFinancing}
            />
          ) : (
            <Transactions userData={data} />
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
            userData={data}
            handleSuccessDialog={handleClickOpenSuccess}
            requestType={is2FA && "Auth_2FA"}
          />
          <SuccessDialog state={openSuccess} onClose={handleCloseSuccess} />
          <ApplyDialog
            state={openApplyDialog}
            onClose={handleApplyClose}
            userData={data}
            handleOtpDialog={handleClickOpen}
            handleSuccessDialog={handleClickOpenSuccess}
          />

          {dashboardState?.loading && <ProgressIndicator />}
        </Container>

        <FooterMain />
      </FlexBox>
    </>
  );
};

/* export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const authData = await store.getState();
    
    return { props: { authData } };
  }
); */

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const authData = await store.getState()?.auth;
//     const response = await fetchDashboardDetail(authData.user);
//     // const result = await response.json();
//     return { props: response };
//   }
// );

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ req, res, store }) => {

//     const state = store.getState();
//     // const response = await fetchDashboardDetail(authData.user);

//     return {
//       props: {},
//     };
//   }
// );

export default HomeScreen;
