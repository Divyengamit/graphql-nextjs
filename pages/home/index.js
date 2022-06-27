import React, { useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { Encryption } from "../../utils/EncryptDecrypt";
import { setLocal } from "../../utils/storage";

// import { useMutation } from "react-query";
// import { APIContext } from "../../services/api-provider";
import { useDispatch, useSelector } from "react-redux";

import OtpDialog from "../../components/dashboard/OtpDialog";
import SuccessDialog from "../../components/dashboard/SuccessDialog";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import ApplyDialog from "../../components/dashboard/ApplyDialog";

import InfoAlert from "../../components/ui/InfoAlert";

import { getLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/components/dashboard/Dashboard";

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
  // const { enable_2FA } = useContext(APIContext);
  const userData = useSelector(({ dashboard }) => dashboard.data);
  const dashboardState = useSelector((state) => state.dashboard);

  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openApplyDialog, setApplyDialog] = useState(false);

  const [is2FA, set2fA] = useState(false);
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // const enable2FaMutation = useMutation((data) => enable_2FA(data), {
  //   onSuccess: (data) => {
  //     setOpen(true);
  //     setTimeout(() => {
  //       setShowSuccess(true);
  //       setSuccessMessage(data?.data?.message);
  //     }, 1000);
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

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

  // const onEnable2faHandler = useCallback(
  //   (data) => {
  //     set2fA(true);
  //     enable2FaMutation.mutate({
  //       entityId: data?.entityId,
  //       mobileNo: data?.mobileNo,
  //     });
  //   },
  //   [is2FA]
  // );

  return (
    <>
      <Dashboard userData={userData} />
      <InfoAlert
        show={showError || showSuccess}
        title={!showSuccess ? "Error" : "Success"}
        body={!showSuccess ? errorMessage : successMessage}
        onClose={() => setError(false)}
      />

      <OtpDialog
        state={open}
        onClose={handleClose}
        userData={userData}
        handleSuccessDialog={handleClickOpenSuccess}
        requestType={is2FA && "Auth_2FA"}
      />
      <SuccessDialog state={openSuccess} onClose={handleCloseSuccess} />
      <ApplyDialog
        state={openApplyDialog}
        onClose={handleApplyClose}
        userData={userData}
        handleOtpDialog={handleClickOpen}
        handleSuccessDialog={handleClickOpenSuccess}
      />

      {dashboardState?.loading && <ProgressIndicator />}
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

HomeScreen.getLayout = getLayout;

export default HomeScreen;
