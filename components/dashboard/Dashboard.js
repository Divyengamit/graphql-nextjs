import React from "react";
import { Grid, Paper, Typography, IconButton, Box, Link } from "@mui/material";

import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";

const walletIcon = require("../../assets/icons/wallet.png");
const infoIcon = require("../../assets/icons/infoIcon.png");
const closeIcon = require("../../assets/icons/close-icons.png");

const backgroundImage = require("../../assets/backgrounds/EquipmentFinance.jpg");

const Dashboard = (props) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    position: "relative",
    padding: theme.spacing(3.25),
    marginBottom: theme.spacing(2),
    borderRadius: "15px",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={7}>
      <Item>
      <Box className="information-box-div" >
      <div className={"icon-div"}>
              <Image src={infoIcon} alt="logo" />
            </div>
      <Typography className="texts-div">
      Your card is being processed. Please await further updates. You can also call <label className="color-text">+91 01234 56789</label> for more details.
      </Typography>
      <div className="close-icon-div">
      <Image src={closeIcon} alt="logo" />
      </div>
      </Box>
      </Item>
        <Item>
          <Box sx={{ position: "absolute", right: "15px", top: "14px" }}>
            <IconButton sx={{ p: 0.7 }}>
              <MoreVertIcon />
            </IconButton>
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
      </Grid>
      <Grid item xs={12} sm={12} md={5}></Grid>
    </Grid>
  );
};
export default Dashboard;
