import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";
import Image from "next/image";

const arrowIcon = require("../../assets/icons/mini_left_arrow.png");
const cardImage = require("../../assets/CardLogo.png");

const TabBar = (props) => {
  const menuButtonStyle = {
    mr: 2.5,
    fontSize: "1rem",
    color: "#2C3E50",
    pr: 2.75,
    pl: 2.75,
    py: 1,
    borderRadius: "5px",
  };

  const dotIcon = {
    height: 7,
    width: 7,
  };

  const getCardNumber = (cards) => {
    if (cards?.length > 0) {
      const activeCard = cards?.filter((item) => item?.status === "ACTIVE");
      return activeCard[0]?.last4Digit;
    } else {
      return "0000";
    }
  };

  return (
    <Grid
      // spacing={2}
      sx={{ justifyContent: "center" }}
      className={"dashboard-tabbar"}
    >
      <Grid item xs={12} sm={12} md={7}>
        <Box display="flex" flexWrap="wrap" sx={{ mt: 2.75, mb: 3 }}>
          <Button
            variant={props?.showDashboard ? "contained" : "text"}
            sx={{
              ...menuButtonStyle,
              color: props?.showDashboard ? "#FFFFFF" : "#2C3E50",
            }}
            onClick={props?.onDashboardClick}
          >
            Dashboard
          </Button>
          {/* <Button
            variant={props?.showDashboard ? "text" : "contained"}
            sx={{
              ...menuButtonStyle,
              color: props?.showDashboard ? "#2C3E50" : "#FFFFFF",
            }}
            onClick={props?.onTransactionClick}
          >
            Transactions
          </Button> */}
          <Button
            variant={props?.showDashboard ? "text" : "contained"}
            sx={{
              ...menuButtonStyle,
              color: props?.showDashboard ? "#2C3E50" : "#FFFFFF",
            }}
            onClick={props?.onActivityClick}
          >
            Activity
          </Button>
          <Button variant="text" color="secondary" sx={menuButtonStyle}>
            Help
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2.75, mb: 3 }}
        >
          {/* <Button
            variant="contained"
            sx={{ fontSize: "1rem" }}
            onClick={props?.onApplyClick}
          >
            Apply{" "}
            <div style={{ width: "24px", height: "24px", marginLeft: "6px" }}>
              <Image src={arrowIcon} alt="image" />
            </div>
          </Button> */}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              px: 1.25,
              py: 1,
              background: "#D8D8D8",
              borderRadius: "5px",
              ml: 2,
            }}
          >
            <div
              style={{
                width: "90px",
                height: "37px",
                marginRight: "8px",
                objectFit: "contain",
              }}
            >
              <Image src={cardImage} alt="image" />
            </div>
            <div>
              <Typography
                variant="h5"
                sx={{
                  lineHeight: "19.64px",
                  color: "#5F7388",
                }}
              >
                Yes Bank
              </Typography>
              <Typography
                variant="body2SemiBold"
                display="flex"
                alignItems="center"
                sx={{
                  lineHeight: "23.43px",
                  color: "#5F7388",
                }}
              >
                <CircleIcon sx={dotIcon} />
                <CircleIcon sx={dotIcon} />
                <CircleIcon sx={dotIcon} />
                <CircleIcon sx={dotIcon} />
                {getCardNumber(props?.userData?.cards)}
              </Typography>
            </div>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TabBar;
