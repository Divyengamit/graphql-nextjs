import React, { useCallback, useState } from "react";
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
import RemoveAddressDialog from "./RemoveDialog";
import AddressDialog from "./AddressDialog";
import { removeAddress, setPrimaryAddress } from "@/store/Slice/profileSlice";
import { getLocal } from "@/utils/storage";
import { Decryption } from "@/utils/EncryptDecrypt";
import { fetchDashboardDetail } from "@/store/dashboardSlice";

// const cardIcon = require("../../assets/icons/card.png");
// const infoIcon = require("../../assets/icons/info.png");
const AllAddressDialog = (props) => {
  const dispatch = useDispatch();
  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  const userData = useSelector(({ dashboard }) => dashboard.data);
  const profileState = useSelector(({ profile }) => profile);

  const [removeDialog, setRemoveDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [addressDetail, setAddressDetail] = useState();
  const [requestType, setRequestType] = useState();

  const { onClose } = props;

  const handleConfirmRemove = () => {
    dispatch(
      removeAddress({
        entityId: userData?.entityId,
        id: addressDetail?.id,
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
        setErrorMessage(res?.payload?.message || "Something went wrong!");
        setRemoveDialog(false);
      }
    });
  };

  const handleRemoveAddress = useCallback(
    (address) => {
      setAddressDetail(address);
      onClose();
      setTimeout(() => {
        setRemoveDialog(true);
      });
    },
    [onClose]
  );

  const handleSetAsPrimary = ({ id }) => {
    dispatch(
      setPrimaryAddress({
        entityId: userID?.state?.userId,
        id,
      })
    ).then((res) => {
      if (res.error) {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
      if (!res.error) {
        dispatch(fetchDashboardDetail(userID?.state?.userId));
        onClose();
        setError(true);
        setErrorTitle("Success");
        setErrorMessage(" Address set to Primary ");
      }
    });
  };

  const handleEditAddress = useCallback(
    (address) => {
      onClose();
      setAddressDetail(address);
      setRequestType("UPDATE");
      setTimeout(() => {
        setEditDialog(true);
      });
    },
    [onClose]
  );

  const handleAddAddress = useCallback(() => {
    onClose();
    setEditDialog(true);
    setRequestType("ADD");
  }, [onClose]);

  const handleRemoveDialogClose = () => setRemoveDialog(false);
  const handleEditDialogClose = () => setEditDialog(false);

  //List of Addresses
  const primaryAddressList =
    userData?.addresses?.filter((a) => a?.primaryAddress === true) || [];
  const secondaryAddressList =
    userData?.addresses?.filter((a) => a?.primaryAddress !== true) || [];

  const listAddress = [...primaryAddressList, ...secondaryAddressList];

  return (
    <>
      <Dialog
        open={props?.state}
        onClose={props?.onClose}
        fullWidth
        maxWidth={"xs"}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={props?.onClose}
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
          All Address
        </DialogTitle>

        <DialogContent sx={{ px: 5, py: 4.125, my: 1 }}>
          <DialogContentText variant="h5Regular" sx={{ color: "#2C3E50" }}>
            Add a new address, make quick edits, or remove an old address
          </DialogContentText>
          <Button
            variant="text"
            color="secondary"
            sx={{ my: 1.3, fontSize: "0.8rem", ml: -1 }}
            onClick={handleAddAddress}
          >
            Add New <AddIcon sx={{ ml: 1, width: "20px", height: "20px" }} />
          </Button>
          <Divider />
          <Box sx={{ maxHeight: 400 }}>
            {/* <Box sx={{ pt: 2.75, pb: 3.25 }}>             
              <Box
                sx={{
                  py: 1.8,
                  mt: 1.25,
                  mb: 2,
                  background: "#F5F5F5",
                  borderRadius: "3px",
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={cardIcon}
                  style={{
                    marginLeft: "20px",
                    marginRight: "12px",
                    width: "23px",
                    height: "23px",
                  }}
                />
                <Typography variant="h5Regular" sx={{ color: "#2C3E50" }}>
                  You’re using this address for 1 card
                </Typography>
                <img
                  src={infoIcon}
                  style={{
                    marginLeft: "auto",
                    marginRight: "15px",
                    width: "22px",
                    height: "22px",
                  }}
                />
              </Box>

              <Button
                disableElevation
                variant="contained"
                color="secondary"
                sx={{ mr: 0.8, fontSize: "0.8rem" }}
                onClick={() => setEditDialog(true)}
              >
                Edit
                <EditIcon sx={{ ml: 1.2, width: "18px", height: "18px" }} />
              </Button>
              <Button
                disableElevation
                style={{
                  backgroundColor: "#F5F5F5",
                  color: "#FF4141",
                  boxShadow: "none",
                  textTransform: "capitalize",
                  fontSize: "0.8rem",
                }}
                variant="contained"
                onClick={handleRemoveAddress}
              >
                Remove
                <RemoveIcon sx={{ ml: 1.2, width: "18px", height: "18px" }} />
              </Button>
            </Box>
            <Divider /> */}

            {listAddress.map((item, index) => {
              return (
                <div key={`Address${index}`}>
                  <Box>
                    <Chip
                      label={item?.primaryAddress ? "Primary" : "Secondary"}
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
                      {item?.address1} {item?.address1}
                      <br /> {item?.city}, <br /> {item?.state} -{" "}
                      {item?.pincode}
                    </Typography>

                    {!item?.primaryAddress && (
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
                    )}

                    <Button
                      disableElevation
                      variant="contained"
                      color="secondary"
                      sx={{ mr: 0.8, fontSize: "0.8rem", fontWeight: 600 }}
                      onClick={() => handleEditAddress(item)}
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
                      onClick={() => handleRemoveAddress(item)}
                    >
                      Remove
                      <RemoveIcon
                        sx={{ ml: 1.2, width: "18px", height: "18px" }}
                      />
                    </Button>
                  </Box>

                  {index < listAddress.length - 1 && (
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
      {removeDialog && addressDetail && (
        <RemoveAddressDialog
          item="address"
          state={removeDialog}
          onClose={handleRemoveDialogClose}
          onRemoveClick={handleConfirmRemove}
        >
          <div>
            {addressDetail?.address1} {addressDetail?.address1}
            <br /> {addressDetail?.city}, <br /> {addressDetail?.state} -{" "}
            {addressDetail?.pincode}
          </div>
        </RemoveAddressDialog>
      )}
      <AddressDialog
        state={editDialog}
        onClose={handleEditDialogClose}
        requestType={requestType}
        userData={userData}
        address={addressDetail}
      />
      {profileState?.loading && <ProgressIndicator />}
    </>
  );
};

export default AllAddressDialog;
