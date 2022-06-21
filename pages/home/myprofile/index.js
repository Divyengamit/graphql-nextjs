import FooterMain from "@/components/navigation/FooterMain";
import MainAppBar from "@/components/navigation/MainAppBar";
import FlexBox from "@/components/ui/FlexBox";
import { fetchDashboardDetail } from "@/store/dashboardSlice";
import { Decryption } from "@/utils/EncryptDecrypt";
import { getLocal } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import AdminTabBar from "@/components/admin/AdminTabbar";
import Myprofile from "@/components/profile/Myprofile";
import TabBar from "@/components/navigation/TabBar";
import ApplyDialog from "@/components/dashboard/ApplyDialog";
import SuccessDialog from "@/components/dashboard/SuccessDialog";
import OtpDialog from "@/components/dashboard/OtpDialog";
import Transactions from "@/components/transactions/Transactions";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { role } = useSelector(({ auth }) => auth);
  console.log("role", role);

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openApplyDialog, setApplyDialog] = useState(false);

  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  useEffect(() => {
    if (userID?.state?.userId) {
      dispatch(fetchDashboardDetail(userID?.state?.userId)).then((res) => {
        if (!res.error) {
          setData(res.payload);
        }
      });
    }
  }, [userID?.state?.userId]);

  //Success Dialog
  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  //otp dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Apply Dialog
  const handleApplyClick = () => {
    setApplyDialog(true);
  };
  const handleApplyClose = () => {
    setApplyDialog(false);
  };

  const [showDashboard, setShowDashboard] = useState(true);
  const handleTransactionsClick = () => setShowDashboard(false);
  const handleDashboardClick = () => setShowDashboard(true);

  return (
    <FlexBox sx={{ minHeight: "100vh" }}>
      <MainAppBar userData={data} />
      <Container maxWidth="xl" className="custom-container">
        {role === "CUSTOMER" ? (
          <TabBar
            userData={data}
            onApplyClick={handleApplyClick}
            showDashboard={showDashboard}
            onDashboardClick={handleDashboardClick}
            onTransactionClick={handleTransactionsClick}
          />
        ) : (
          <AdminTabBar />
        )}
        {showDashboard ? (
          <Myprofile userData={data} />
        ) : (
          <Transactions userData={data} />
        )}

        <OtpDialog
          state={open}
          onClose={handleClose}
          userData={data?.data}
          handleSuccessDialog={handleClickOpenSuccess}
        />

        <SuccessDialog state={openSuccess} onClose={handleCloseSuccess} />

        <ApplyDialog
          state={openApplyDialog}
          onClose={handleApplyClose}
          userData={data?.data}
          handleOtpDialog={handleClickOpen}
          handleSuccessDialog={handleClickOpenSuccess}
        />
      </Container>
      <FooterMain />
    </FlexBox>
  );
};
export default MyProfile;
