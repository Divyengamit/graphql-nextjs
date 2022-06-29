import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveDialog from "./RemoveDialog";
import { removeAddress, removeInfo } from "@/store/Slice/profileSlice";
import { getLocal } from "@/utils/storage";
import { Decryption } from "@/utils/EncryptDecrypt";
import { fetchDashboardDetail } from "@/store/dashboardSlice";
import EmailDialog from "./EmailDialog";

const AllEmailDialog = ({ isOpen, onClose, userData }) => {
  const dispatch = useDispatch();
  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const emailList = userData?.aditionalContacts?.filter(
    (item) => item.emailAddress
  );

  const profileState = useSelector(({ profile }) => profile);

  const [removeDialog, setRemoveDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const [showError, setError] = useState(false);

  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [detail, setDetail] = useState();
  const [requestType, setRequestType] = useState();

  const handleConfirmRemove = () => {
    dispatch(
      removeInfo({
        entityId: userData?.entityId,
        id: detail?.id,
      })
    ).then((res) => {
      if (!res.error) {
        dispatch(fetchDashboardDetail(userID?.state?.userId));
        setRemoveDialog(false);
        setError(true);
        setErrorTitle("Success");
        setErrorMessage("Removed Successfully ");
      }
      if (res.error) {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.data?.message || "Something went wrong!");
        setRemoveDialog(false);
      }
    });
  };

  const handleRemoveEmail = (email) => {
    setDetail(email);
    onClose();
    setRemoveDialog(true);
  };

  const handleSetAsPrimary = ({ id }) => {
    // dispatch(
    //   setPrimaryAddress({
    //     entityId: userID?.state?.userId,
    //     id,
    //   })
    // ).then((res) => {
    //   if (res.error) {
    //     setError(true);
    //     setErrorTitle("Error");
    //     setErrorMessage(res?.payload?.data?.message || "Something went wrong!");
    //   }
    //   if (!res.error) {
    //     dispatch(fetchDashboardDetail(userID?.state?.userId));
    //     onClose();
    //     setError(true);
    //     setErrorTitle("Success");
    //     setErrorMessage(" Address set to Primary ");
    //   }
    // });
  };

  const handleEditEmail = (email) => {
    onClose();
    setDetail(email);
    setRequestType("UPDATE");
    setTimeout(() => {
      setEditDialog(true);
    });
  };

  const handleAddEmail = () => {
    onClose();
    setDetail({ emailAddress: "" });
    setEditDialog(true);
    setRequestType("ADD");
  };

  const handleRemoveDialogClose = () => setRemoveDialog(false);
  const handleEditDialogClose = () => setEditDialog(false);

  //List of Addresses
  const primaryEmailList = [
    {
      emailAddress: userData?.emailAddress,
      primary: true,
    },
  ];
  const secondaryEmailList =
    userData?.aditionalContacts?.filter((a) => a?.emailAddress) || [];

  const listEmail = [...primaryEmailList, ...secondaryEmailList];

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        maxWidth={"xs"}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h2Bold"
          color="secondary"
          sx={{ pb: 1.1, px: 5, pt: 3.25 }}
        >
          All Email
        </DialogTitle>

        <DialogContent sx={{ px: 5, py: 4.125, my: 1 }}>
          <DialogContentText variant="h5Regular" sx={{ color: "#2C3E50" }}>
            Add a new email, make quick edits, or remove an old email
          </DialogContentText>
          <Button
            variant="text"
            color="secondary"
            sx={{ my: 1.3, fontSize: "0.8rem", ml: -1 }}
            onClick={handleAddEmail}
          >
            Add New <AddIcon sx={{ ml: 1, width: "20px", height: "20px" }} />
          </Button>
          <Divider />
          <Box sx={{ maxHeight: 400 }}>
            {listEmail.map((item, index) => {
              return (
                <div key={`Email${index}`}>
                  <Box>
                    <Chip
                      label={item?.primary === true ? "Primary" : "Secondary"}
                      sx={{
                        borderRadius: 0,
                        color: "#2C3E50",
                        fontWeight: 400,
                        background: "#EAF0F6",
                      }}
                      style={{
                        ...((index === 0 || index > 0) && {
                          marginTop: "16px",
                          marginBottom: "8px",
                        }),
                      }}
                    />

                    <Typography
                      variant="h5Regular"
                      sx={{ lineHeight: 1.5, mb: 1.125 }}
                      color="#000000"
                    >
                      {item?.emailAddress}
                    </Typography>

                    {!item?.primary && (
                      <>
                        <Button
                          disableElevation
                          sx={{ mr: 0.6, fontSize: "0.8rem", fontWeight: 600 }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleSetAsPrimary(item);
                          }}
                        >
                          Set as Primary
                        </Button>

                        <Button
                          disableElevation
                          variant="contained"
                          color="secondary"
                          sx={{ mr: 0.8, fontSize: "0.8rem", fontWeight: 600 }}
                          onClick={() => handleEditEmail(item)}
                        >
                          Edit
                          <EditIcon
                            sx={{ ml: 1.2, width: "18px", height: "18px" }}
                          />
                        </Button>
                        <Button
                          disableElevation
                          style={{
                            backgroundColor: "#F5F5F5",
                            color: "#FF4141",
                            fontSize: "0.8rem",
                          }}
                          variant="contained"
                          onClick={() => handleRemoveEmail(item)}
                        >
                          Remove
                          <RemoveIcon
                            sx={{ ml: 1.2, width: "18px", height: "18px" }}
                          />
                        </Button>
                      </>
                    )}
                  </Box>

                  {index < listEmail.length - 1 && (
                    <Divider sx={{ mt: 3.25 }} />
                  )}
                </div>
              );
            })}
          </Box>
        </DialogContent>
      </Dialog>
      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      {removeDialog && detail && (
        <RemoveDialog
          item="email"
          state={removeDialog}
          onClose={handleRemoveDialogClose}
          onRemoveClick={handleConfirmRemove}
        >
          <span>{detail?.emailAddress}</span>
        </RemoveDialog>
      )}

      {editDialog && detail && (
        <EmailDialog
          onClose={handleEditDialogClose}
          state={editDialog}
          requestType={requestType}
          detail={detail}
        />
      )}
      {profileState?.loading && <ProgressIndicator />}
    </>
  );
};

export default AllEmailDialog;
