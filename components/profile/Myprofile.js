import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import AddressDialog from "./AddressDialog";
import theme from "styles/theme";
import AllAddressDialog from "./AllAddressDialog";
import InfoAlert from "../ui/InfoAlert";
import ProgressIndicator from "../ui/ProgressIndicator";
import EmailDialog from "./EmailDialog";
import PhoneDialog from "./PhoneDialog";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import ProfileInfo from "./ProfileInfo";
import AccountOptions from "./AccountOptions";
import Address from "./Address";
import EmailInfo from "./EmailInfo";
import PhoneNumberInfo from "./PhoneNumberInfo";
import { useRouter } from "next/router";
import { updateProfile } from "@/store/Slice/profileSlice";
import { SECURITY } from "@/utils/paths";
import { fetchDashboardDetail } from "@/store/dashboardSlice";
import { getLocal } from "@/utils/storage";
import { Decryption } from "@/utils/EncryptDecrypt";
import AllEmailDialog from "./AllEmailDialog";
import AllPhoneDialog from "./AllPhoneDialog";

const Myprofile = () => {
  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(({ dashboard }) => dashboard.data);
  const profileState = useSelector(({ profile }) => profile);

  const [addressDialog, setAddressDialog] = useState(false);
  const [allAddressDialog, setAllAddressDialog] = useState(false);

  const [allEmailDialog, setAllEmailDialog] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);

  const [phoneDialog, setPhoneDialog] = useState(false);
  const [allPhoneDialog, setAllPhoneDialog] = useState(false);

  const [primaryAddress, setPrimaryAddress] = useState();
  const [requestType, setRequestType] = useState();

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const StyledText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: "500",
  }));

  const handleAddressClose = () => setAddressDialog(false);
  const handleAllAddressClose = () => setAllAddressDialog(false);

  const handleEmailClose = () => setEmailDialog(false);
  const handleEmailAllEmail = () => setAllEmailDialog(false);

  const handlePhoneClose = () => setPhoneDialog(false);
  const handleAllPhoneClose = () => setAllPhoneDialog(false);

  useEffect(() => {
    const primary = userData?.addresses.find(
      (item) => item.primaryAddress === true
    );
    setPrimaryAddress(primary);
  }, [userData?.addresses]);

  const handleSecureAccount = () => {
    router.push(SECURITY);
  };

  const handleUploadProfile = ({ target }) => {
    dispatch(
      updateProfile({
        entityId: userData?.entityId,
        profilePicture: target.files[0],
      })
    ).then((res) => {
      if (!res.error) {
        dispatch(fetchDashboardDetail(userID?.state?.userId));
        setError(true);
        setErrorTitle("Success");
        setErrorMessage("Uploaded Successfully ");
      }
      if (res.error) {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };

  const handleAddEmail = () => {
    setRequestType("ADD");
    setEmailDialog(true);
  };

  if (!userData) return null;

  return (
    <Box>
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
        <StyledText variant="subtitle1">Account</StyledText>
        <ChevronRightOutlinedIcon sx={{ mr: 0.2 }} />
        <StyledText
          variant="subtitle1"
          sx={{ color: theme.palette.secondary.main }}
        >
          Profile
        </StyledText>
      </Paper>
      <Grid container spacing={2} sx={{ mt: 0.75, mb: 4 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Paper variant="item">
            <ProfileInfo
              userData={userData}
              onProfileUpload={handleUploadProfile}
            />
          </Paper>

          <Paper variant="item">
            <AccountOptions
              userData={userData}
              onSecureAccount={handleSecureAccount}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper variant="item">
            <Address
              primaryAddress={primaryAddress}
              onAddNew={() => setAddressDialog(true)}
              onListAddress={() => setAllAddressDialog(true)}
            />
          </Paper>

          <Paper variant="item">
            <EmailInfo
              userData={userData}
              onAddEmail={handleAddEmail}
              onListEmail={() => setAllEmailDialog(true)}
            />
          </Paper>

          <Paper variant="item">
            <PhoneNumberInfo
              userData={userData}
              onAddNew={() => setPhoneDialog(true)}
              onListPhoneNo={() => setAllPhoneDialog(true)}
            />
          </Paper>
        </Grid>
      </Grid>
      <AddressDialog
        userData={userData}
        state={addressDialog}
        onClose={handleAddressClose}
      />
      <AllAddressDialog
        userData={userData}
        state={allAddressDialog}
        onClose={handleAllAddressClose}
      />

      <AllEmailDialog
        isOpen={allEmailDialog}
        onClose={handleEmailAllEmail}
        userData={userData}
      />
      <EmailDialog
        requestType={requestType}
        state={emailDialog}
        onClose={handleEmailClose}
      />
      <PhoneDialog state={phoneDialog} onClose={handlePhoneClose} />
      <AllPhoneDialog
        isOpen={allPhoneDialog}
        onClose={handleAllPhoneClose}
        userData={userData}
      />
      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      {profileState?.loading && <ProgressIndicator />}
    </Box>
  );
};

export default Myprofile;
