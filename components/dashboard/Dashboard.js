import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
  Link,
  MenuItem,
  Menu,
  Divider,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { useRouter } from "next/router";
import { setLocal } from "@/utils/storage";
import { Encryption } from "@/utils/EncryptDecrypt";
import { ELIGIBILITY } from "@/utils/paths";
import { useDispatch, useSelector } from "react-redux";
import { changeCardPin, fetchCardDetails } from "@/store/dashboardSlice";
import CardDialog from "./CardDialog";
import InfoAlert from "../ui/InfoAlert";
import ProgressIndicator from "../ui/ProgressIndicator";

const walletIcon = require("../../assets/icons/wallet.png");
const infoIcon = require("../../assets/icons/infoIcon.png");
const closeIcon = require("../../assets/icons/close-icons.png");

const Dashboard = (props) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const cardDetailsState = useSelector(({ dashboard }) => dashboard);
  const [walletAnchor, setWalletAnchor] = useState(null);
  const [dimensions, setDimensions] = useState({ top: "0px", left: "0px" });
  const [activeCard, setActiveCard] = useState();
  const [iframe, setIframe] = useState();
  const [pinDialog, setPinDialog] = useState(false);
  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    position: "relative",
    padding: theme.spacing(3.25),
    marginBottom: theme.spacing(2),
    borderRadius: "15px",
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    const activeCardList = props.userData?.cards.find(
      (item) => item?.status === "ACTIVE"
    );
    setActiveCard(activeCardList);
  }, [props.userData?.cards]);

  const refContainer = useRef();
  const handleWalletMenu = (event) => {
    if (refContainer.current) {
      setDimensions({
        top: event.clientX,
        left: event.clientY,
      });
    }
    setWalletAnchor(event.currentTarget);
  };
  const handleClosePinClick = () => setPinDialog(false);
  const handleChangePinClick = () => setPinDialog(true);

  const handleCloseWalletMenu = () => {
    setWalletAnchor(null);
  };

  const handleViewCardDetails = () => {
    dispatch(
      fetchCardDetails({
        entityId: props?.userData?.entityId,
        cardId: activeCard?.id,
      })
    ).then((res) => {
      if (res?.payload?.data) {
        setIframe(res?.payload?.data);
        handleChangePinClick();
      }
      // if (!res.error) {
      //   dispatch(fetchDashboardDetail(userID?.state?.userId));
      //   setError(true);
      //   setErrorTitle("Success");
      //   setErrorMessage("Uploaded Successfully ");
      // }
      if (res.error) {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };
  const handleChangePin = () => {
    dispatch(
      changeCardPin({
        entityId: props?.userData?.entityId,
        cardId: activeCard?.id,
      })
    ).then((res) => {
      if (res?.payload?.data) {
        setIframe(res?.payload?.data);
        handleChangePinClick();
      }
      // if (!res.error) {
      //   dispatch(fetchDashboardDetail(userID?.state?.userId));
      //   setError(true);
      //   setErrorTitle("Success");
      //   setErrorMessage("Uploaded Successfully ");
      // }
      if (res.error) {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };

  const onExploreFinancingClick = () => {
    setLocal(
      "tempData",
      Encryption(
        JSON.stringify({
          state: {
            userData: props?.userData,
          },
        }),
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      )
    );
    router.push({ pathname: ELIGIBILITY });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={7}>
        {props?.userData?.cards[0]?.status === "INACTIVE" && (
          <Item>
            <Box className="information-box-div">
              <div className={"icon-div"}>
                <Image src={infoIcon} alt="logo" />
              </div>
              <Typography className="texts-div">
                Your card is being processed. Please await further updates. You
                can also call{" "}
                <label className="color-text">+91 01234 56789</label> for more
                details.
              </Typography>
              <div className="close-icon-div">
                <Image src={closeIcon} alt="logo" />
              </div>
            </Box>
          </Item>
        )}
        <Item>
          <Box sx={{ position: "absolute", right: "15px", top: "14px" }}>
            {props?.userData?.cards?.length > 0 && activeCard && (
              <IconButton
                sx={{ p: 0.7 }}
                ref={refContainer}
                onClick={handleWalletMenu}
              >
                <div className="action-icon-div">
                  <MoreVertIcon />
                </div>
              </IconButton>
            )}

            <Menu
              style={{
                left: dimensions.top + "px",
                top: dimensions.left + "px",
              }}
              className={"ifram-menu-style"}
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={walletAnchor}
              open={Boolean(walletAnchor)}
              onClose={handleCloseWalletMenu}
            >
              <MenuItem sx={{ pt: 1, pb: 1 }} onClick={handleViewCardDetails}>
                <Typography
                  variant="subtitle1Regular"
                  sx={{ color: "#2C3E50" }}
                >
                  View Card Details
                </Typography>
              </MenuItem>

              <MenuItem sx={{ pt: 1, pb: 1 }} onClick={handleChangePin}>
                <Typography
                  variant="subtitle1Regular"
                  sx={{ color: "#2C3E50" }}
                >
                  Change Pin
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography color="secondary" variant="h6Bold">
                Wallet balance
              </Typography>

              <Typography
                color="primary"
                variant="h1Light"
                sx={{
                  lineHeight: "3.688rem",
                }}
              >
                {"\u20B9"}{" "}
                {props?.userData?.balance === 0
                  ? "0.00"
                  : props?.userData?.balance}
              </Typography>
            </Box>
            {/* <img
              src={walletIcon}
              width="92"
              height="92"
              style={{ marginRight: "145px" }}
            /> */}
            {/* <Image src={}/> */}
            <div className={"dashboard-wallet-img"}>
              <Image src={walletIcon} height={92} width={92} alt="logo" />
            </div>
          </Box>
          <Typography
            color="primary"
            variant="subtitle1"
            sx={{
              lineHeight: "22px", //was 27.56
            }}
          >
            Manual transfer of funds is not permitted online. If a card has been
            issued, withdrawals are allowed from an ATM.
          </Typography>
        </Item>
        {props?.userData?.loanRequestId ? (
          <Item>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography color="secondary" variant="h6Bold">
                  Loan Request Status
                </Typography>
              </Box>
            </Box>
            <Box display="flex" sx={{ my: 2.875 }}>
              <Typography variant="h4Bold" sx={{ color: "#2C3E50", flex: 1 }}>
                Loan Request Id
              </Typography>
              <Typography
                variant="h2Regular"
                sx={{ color: "#2C3E50", flex: 1 }}
              >
                {props?.userData?.loanRequestId}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" sx={{ my: 2.875 }}>
              <Typography variant="h4Bold" sx={{ color: "#2C3E50", flex: 1 }}>
                Loan Status
              </Typography>
              <Typography
                variant="h2Regular"
                sx={{ color: "#2C3E50", flex: 1 }}
              >
                {props?.userData?.loanStatus
                  ? props?.userData?.loanStatus
                  : "-"}
              </Typography>
            </Box>
          </Item>
        ) : (
          <Link
            onClick={props?.onExploreFinancingClick}
            underline="none"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Item
              sx={{ p: 0 }}
              className={"dashboard-equipment-finance-img"}
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "306px",
                width: "100%",
              }}
            >
              <Typography
                variant="h6Bold"
                sx={{
                  color: "#2C3E50",
                  pl: 3.3,
                  pt: 3.3,
                }}
              >
                Equipment Finance at 8.75% p.a
              </Typography>

              <Paper
                sx={{
                  pl: 3.3,
                  pt: 2,
                  pb: 2,
                  position: "absolute",
                  bottom: 0,
                }}
                style={{
                  width: "100%",
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}
              >
                <Typography color="primary" variant="subtitle1SemiBold">
                  Explore financing options
                </Typography>
              </Paper>
            </Item>
          </Link>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={5}></Grid>
      <CardDialog
        iframeinfo={iframe}
        state={pinDialog}
        onClose={handleClosePinClick}
      />
      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      {cardDetailsState.loading && <ProgressIndicator />}
    </Grid>
  );
};
export default Dashboard;
