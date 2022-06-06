import React, { useState, useContext } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";

import { useMutation, useQuery } from "react-query";
import { APIContext } from "../../services/api-provider";
import { useSelector } from "react-redux";

import ProgressIndicator from "../ui/ProgressIndicator";

import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import InfoAlert from "../ui/InfoAlert";
import Image from "next/image";

const arrowIcon = require("../../assets/icons/mini_left_arrow.png");

const ApplyDialog = (props) => {
  const [showCards, setShowCards] = useState(false);
  const { applyCard, applyCardConfirm } = useContext(APIContext);
  const { user } = useSelector((state) => state.auth);
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // const { data, isLoading, refetch } = useQuery(
  //   ["applyCard", user],
  //   () => applyCard(user),

  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: false,
  //   }
  // );

  const applyCardMutation = useMutation((data) => applyCardConfirm(data), {
    onSuccess: (data) => {
      console.log("Success ", data);
      props?.onClose();
      props?.handleSuccessDialog();
    },
    onError: (error) => {
      console.log("Error Here ", error);
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const buttonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#5F7388",
  };

  const handleApplyClick = () => {
    // refetch();
    // props?.onClose();
    // props?.handleOtpDialog();
    applyCardMutation.mutate({
      entityId: user,
      applicationType:
        props?.userData?.applicationType === "NA" && "APP_TYPE_C91",
    });
  };

  return (
    <>
      <Dialog
        open={props?.state}
        onClose={props?.onClose}
        fullWidth
        maxWidth={"xs"}
        sx={{ borderRadius: "10px" }}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={props?.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 15,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h3Bold"
          color="secondary"
          sx={{ lineHeight: "40.95px", px: 4.75 }}
        >
          Apply
          <Divider sx={{ mt: 2.625 }} />
        </DialogTitle>

        <DialogContent sx={{ pt: 0, pr: 4, pl: 4 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={6} sx={{ pr: 2, pl: 1 }}>
              <Button
                disableRipple
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#EAF0F6",
                  color: "#5F7388",
                  fontWeight: "18px",
                }}
                onClick={() => setShowCards(true)}
              >
                Cards <ArrowRightIcon />
              </Button>
            </Grid>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mr: -1,
              }}
            />

            <Grid item xs={6}>
              {showCards && (
                <Typography sx={buttonStyle}>
                  Card 91
                  {props?.userData?.applicationType === "NA" ? (
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "12px",
                        pr: 1.8,
                        pl: 1.8,
                      }}
                      onClick={handleApplyClick}
                    >
                      Apply
                      {/* <img
                        src={arrowIcon}
                        style={{ width: "16px", height: "16px" }}
                      /> */}
                      <Image
                        src={arrowIcon}
                        height={16}
                        width={16}
                        alt="image"
                      />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "12px",
                        pr: 1.8,
                        pl: 1.8,
                        background: "#FFDCB9",
                        color: "#2C3E50",
                      }}
                      disabled
                    >
                      In Progress
                    </Button>
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {applyCardMutation.isLoading && <ProgressIndicator />}
      <InfoAlert
        show={showError}
        title="Error"
        body={errorMessage}
        onClose={() => setError(false)}
      />
    </>
  );
};

export default ApplyDialog;
