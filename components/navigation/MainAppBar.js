import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Container,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { logout } from "../../store/auth";

import FlexBox from "../ui/FlexBox";
import ProfileMenu from "./ProfileMenu";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { stringAvatar } from "../../utils/Avatar";
import NotificationMenu from "./NotificationMenu";
const logo = require("../../assets/logo.png");
const docModeLogo = require("../../assets/Docmode-logo.png");

const MainAppBar = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [notification, setNotification] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotification = (event) => {
    setNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const onLogoutClickHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ pt: 1.45, pb: 1.45 }}>
        <Toolbar style={{ padding: 0 }}>
          <img src={logo} style={{ height: 36 }} />
          <FlexBox row sx={{ ml: "auto" }}>
            <img src={docModeLogo} style={{ height: 36, marginRight: 18 }} />
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="icon"
                sx={{ p: 0 }}
                onClick={handleOpenNotification}
              >
                <NotificationsIcon
                  sx={{ color: "#FFFFFF", width: 27, height: 30 }}
                />
              </IconButton>
              <NotificationMenu
                userData={userData}
                state={notification}
                open={Boolean(notification)}
                onClose={handleCloseNotification}
              />
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderRightWidth: 2,
                  borderColor: "#5F7388",
                  height: 32,
                  mr: 4,
                  ml: 3.6,
                  alignSelf: "center",
                }}
              />
              <Tooltip title="Open settings">
                <IconButton
                  disableRipple
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    {...stringAvatar(userData?.fullName)}
                    sx={{ height: 51, width: 51, background: "#FF9921" }}
                  />
                  <Typography
                    sx={{
                      ml: 1.38,
                      textAlign: "start",
                      color: "#FFFFFF",
                      lineHeight: "21px",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="subtitle2"
                      sx={{ color: "#FFFFFF" }}
                    >
                      Welcome
                    </Typography>
                    <Typography
                      variant="subtitle1SemiBold"
                      sx={{
                        color: "#FFFFFF",
                        display: "flex",
                      }}
                    >
                      {userData?.fullName}
                    </Typography>
                  </Typography>
                  <ArrowDropDownIcon
                    sx={{ ml: 2.63 }}
                    style={{ color: "#FFFFFF" }}
                  />
                </IconButton>
              </Tooltip>

              <ProfileMenu
                userData={userData}
                state={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                onLogout={onLogoutClickHandler}
              />
            </Box>
          </FlexBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainAppBar;