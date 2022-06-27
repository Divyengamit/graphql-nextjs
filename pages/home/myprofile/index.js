// import { useState } from "react";
// import { useSelector } from "react-redux";
import Myprofile from "@/components/profile/Myprofile";
// import ApplyDialog from "@/components/dashboard/ApplyDialog";
// import SuccessDialog from "@/components/dashboard/SuccessDialog";
// import OtpDialog from "@/components/dashboard/OtpDialog";
import { getLayout } from "@/components/layout/DashboardLayout";

const MyProfile = () => {
  // const userData = useSelector(({ dashboard }) => dashboard.data);
  // const [open, setOpen] = useState(false);
  // const [openSuccess, setOpenSuccess] = useState(false);
  // const [openApplyDialog, setApplyDialog] = useState(false);

  // //Success Dialog
  // const handleClickOpenSuccess = () => {
  //   setOpenSuccess(true);
  // };

  // const handleCloseSuccess = () => {
  //   setOpenSuccess(false);
  // };

  // //otp dialog
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // // Apply Dialog
  // const handleApplyClick = () => {
  //   setApplyDialog(true);
  // };
  // const handleApplyClose = () => {
  //   setApplyDialog(false);
  // };

  {
    /* <OtpDialog
        state={open}
        onClose={handleClose}
        userData={userData}
        handleSuccessDialog={handleClickOpenSuccess}
      />

      <SuccessDialog state={openSuccess} onClose={handleCloseSuccess} />

      <ApplyDialog
        state={openApplyDialog}
        onClose={handleApplyClose}
        userData={userData}
        handleOtpDialog={handleClickOpen}
        handleSuccessDialog={handleClickOpenSuccess}
      /> */
  }

  return <Myprofile />;
};

MyProfile.getLayout = getLayout;

export default MyProfile;
