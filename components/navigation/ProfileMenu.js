import React from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Menu,
  Divider,
  Paper,
  Avatar,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { stringAvatar } from "@/utils/Avatar";
import { useRouter } from "next/router";
import { setLocal } from "@/utils/storage";
import { Encryption } from "@/utils/EncryptDecrypt";
import { MYPROFILE } from "@/utils/paths";
const logoutIcon = require("../../assets/icons/logout.png");

const ProfileMenu = (props) => {
  const router = useRouter();

  const handleProfileClick = () => {
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
    router.push(MYPROFILE);
    props?.onClose();
  };

  return (
    <Menu
      sx={{
        mt: "45px",
        "& .MuiList-root": {
          pt: 0,
        },
      }}
      id="menu-appbar"
      anchorEl={props?.state}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 6,
          borderRadius: 3,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      keepMounted
      open={props?.open}
      onClose={props?.onClose}
    >
      <Paper
        sx={{ padding: 0, pl: 1.125, pr: 1.875, borderRadius: 3 }}
        elevation={0}
        className="mob-user-details-div"
      >
        <Box display="flex" sx={{ pt: 2, pb: 2.125 }}>
          <MenuItem
            sx={{
              color: "#2C3E50",
              p: 0,
              pl: 1.5,
              pr: 1.75,
            }}
            disableRipple
          >
            <Avatar
              {...stringAvatar(props?.userData?.fullName)}
              sx={{ m: 0 }}
              style={{
                height: "51px",
                width: "51px",
                margin: 0,
                background: "#FF9921",
              }}
            />

            <Typography
              variant="subtitle2"
              sx={{
                ml: 1.375,
                mr: 1.75,
                textAlign: "start",
                color: "#2C3E50",
                lineHeight: "21.15px",
              }}
            >
              Welcome{" "}
              <Typography
                variant="subtitle1SemiBold"
                sx={{
                  color: "#2C3E50",
                }}
              >
                {props?.userData?.fullName}
              </Typography>
            </Typography>
          </MenuItem>
          <Divider orientation="vertical" flexItem />

          <MenuItem
            disableRipple
            sx={{
              color: "#2C3E50",
            }}
          >
            <Typography
              variant="small"
              sx={{
                textAlign: "start",
                color: "#000000",
                //lineHeight: "15.11px",
              }}
            >
              Last logged in:
              <br />
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#000000",
                  lineHeight: "18.53px",
                }}
              >
                {props?.userData?.lastLogin}
              </Typography>
            </Typography>
          </MenuItem>
        </Box>

        <MenuItem
          sx={{
            border: "0.5px solid #EAF0F6",
            borderLeft: 0,
            borderRight: 0,

            pt: 1.75,
            pb: 1.75,
          }}
          onClick={handleProfileClick}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              fontSize="large"
              sx={{ color: "#2C3E50", mr: 1.2 }}
            />
          </ListItemIcon>
          <Typography variant="subtitle1Regular" sx={{ color: "#2C3E50" }}>
            Manage Account
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{
            borderLeft: 0,
            borderRight: 0,
            pt: 1.75,
            pb: 1.75,
          }}
          onClick={props?.onLogout}
        >
          <ListItemIcon>
            {/* <img
              src={logoutIcon}
              style={{
                height: "21.88px",
                width: "25px",
                marginRight: "16px",
                marginLeft: "5px",
              }}
            /> */}
            <Image src={logoutIcon} height={21.88} width={25} alt="image" />
          </ListItemIcon>

          <Typography variant="subtitle1Regular" sx={{ color: "#2C3E50" }}>
            Logout
          </Typography>
        </MenuItem>
      </Paper>
    </Menu>
  );
};

export default ProfileMenu;
