import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { useMutation } from "react-query";
import { APIContext } from "@/services/api-provider";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import AddressDialog from "./AddressDialog";
import theme from "styles/theme";
import AllAddressDialog from "./AllAddressDialog";
import InfoAlert from "../ui/InfoAlert";
import ProgressIndicator from "../ui/ProgressIndicator";
import AddEmailDialog from "./AddEmailDialog";
import AddPhoneDialog from "./AddPhoneDialog";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import ProfileInfo from "./ProfileInfo";
import AccountOptions from "./AccountOptions";
import Address from "./Address";
import EmailInfo from "./EmailInfo";
import PhoneNumberInfo from "./PhoneNumberInfo";
import ConfirmAlert from "../ui/ConfirmAlert";
import { useRouter } from "next/router";

const Myprofile = (props) => {
  const userData = useSelector(({ dashboard }) => dashboard.data);
  const router = useRouter();

  const [addressDialog, setAddressDialog] = useState(false);
  const [allAddressDialog, setAllAddressDialog] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);

  const [primaryAddress, setPrimaryAddress] = useState();
  const [requestType, setRequestType] = useState();

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState();
  const [confirmMessage, setConfirmMessage] = useState();

  const [removeItem, setRemoveItem] = useState();

  const { updateProfile, removeInfo } = useContext(APIContext);

  const uploadProfileMutation = useMutation((data) => updateProfile(data), {
    onSuccess: (data) => {
      setError(true);
      setErrorTitle("Success");
      setErrorMessage("Uploaded Successfully ");
    },
    onError: (error) => {
      setError(true);
      setErrorTitle("Error");
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const removeInfoMutation = useMutation((data) => removeInfo(data), {
    onSuccess: (data) => {
      setShowConfirm(false);
      setError(true);
      setErrorTitle("Success");
      setErrorMessage("Removed Successfully ");
    },
    onError: (error) => {
      setShowConfirm(false);
      setError(true);
      setErrorTitle("Error");
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const handleRemoveInfo = ({ id }) => {
    removeInfoMutation.mutate({
      entityId: userData?.entityId,
      id,
    });
  };

  const StyledText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: "500",
  }));

  const handleAddressClose = () => setAddressDialog(false);

  const handleAllAddressClose = () => setAllAddressDialog(false);

  const handleEmailClose = () => setEmailDialog(false);

  const handlePhoneClose = () => setPhoneDialog(false);

  useEffect(() => {
    const primary = userData?.addresses.find(
      (item) => item.primaryAddress === true
    );
    setPrimaryAddress(primary);
  }, [userData?.addresses]);

  const handleSecureAccount = () => {
    // navigate("/home/security", {
    //   state: { userData },
    // });
  };

  const handleUploadProfile = ({ target }) => {
    uploadProfileMutation.mutate({
      entityId: userData?.entityId,
      profilePicture: target.files[0],
    });
  };

  const handleAddEmail = () => {
    setRequestType("ADD");
    setEmailDialog(true);
  };

  const emailList = userData?.aditionalContacts?.filter(
    (item) => item.emailAddress
  );

  const phoneNumberList = userData?.aditionalContacts?.filter(
    (item) => item.mobileNo
  );

  const handleRemove = (item) => {
    setRemoveItem(item);
    setShowConfirm(true);
    setConfirmTitle("Confirm");
    setConfirmMessage(
      `Remove ${item?.emailAddress ? item?.emailAddress : item?.mobileNo} ?`
    );
  };

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
              emailList={emailList}
              onAddEmail={handleAddEmail}
              // onremoveEmail={(item) => handleRemoveInfo(item)}
              onremoveEmail={handleRemove}
            />
          </Paper>

          <Paper variant="item">
            <PhoneNumberInfo
              phoneList={phoneNumberList}
              userData={userData}
              onAddNew={() => setPhoneDialog(true)}
              onremove={handleRemove}
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
      <AddEmailDialog
        requestType={requestType}
        state={emailDialog}
        onClose={handleEmailClose}
      />
      <AddPhoneDialog state={phoneDialog} onClose={handlePhoneClose} />
      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      <ConfirmAlert
        show={showConfirm}
        title={confirmTitle}
        body={confirmMessage}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleRemoveInfo(removeItem)}
      />
      {(uploadProfileMutation.isLoading || removeInfoMutation.isLoading) && (
        <ProgressIndicator />
      )}
    </Box>
  );
};

export default Myprofile;
