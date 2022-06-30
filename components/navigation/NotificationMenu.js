import React from "react";
import { Typography, Menu, List, ListItem, Divider } from "@mui/material";

const NotificationMenu = (props) => {
  const notificationList = () => {
    if (props?.userData?.notifications?.length > 0) {
      const list = props?.userData?.notifications.map((item, index) => {
        return (
          <div key={`notifications${index}`}>
            <ListItem alignItems="flex-start">
              <Typography
                sx={{ display: "inline", mt: 1, mb: 1 }}
                component="span"
                variant="h5SemiBold"
              >
                {item?.description}
              </Typography>
            </ListItem>
            <Divider />
          </div>
        );
      });
      return list;
    } else {
      return (
        <ListItem alignItems="flex-start">
          <Typography
            sx={{ display: "inline", mt: 1, mb: 1 }}
            component="span"
            variant="h5SemiBold"
            color="text.primary"
          >
            No Notifications
          </Typography>
        </ListItem>
      );
    }
  };

  return (
    <Menu
      sx={{
        mt: "60px",
        "& .MuiList-root": {
          pt: 0,
          pb: 0,
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
      keepMounted
      open={props?.open}
      onClose={props?.onClose}
    >
      <List
        sx={{
          width: "100%",
          minWidth: 360,
          maxWidth: 360,
          maxHeight: 400,
          bgcolor: "background.paper",
        }}
      >
        {notificationList()}
      </List>
    </Menu>
  );
};

export default NotificationMenu;
