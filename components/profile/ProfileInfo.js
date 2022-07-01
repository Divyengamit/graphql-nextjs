import React from "react";
import { Typography, IconButton, Box, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Image from "next/image";

const galleryIcon = require("@/assets/icons/gallery.png");
const uploadImage = require("@/assets/upload_profile.png");
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const ProfileInfo = (props) => {
  const Input = styled("input")({
    display: "none",
  });

  return (
    <Box>
      <Typography variant="h2Bold" color="secondary">
        Profile
      </Typography>

      <Stack
        spacing={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Box display="flex" flexDirection="column" sx={{ flex: 0.2 }}>
          <div>
            <Image
              alt="Profile"
              width="117px"
              height="117px"
              style={{
                borderRadius: "50%",
              }}
              src={
                props?.userData?.profilePicturePath
                  ? baseUrl + props?.userData?.profilePicturePath
                  : uploadImage
              }
            />
          </div>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h2SemiBold"
            sx={{ color: "#2C3E50", ml: 5.5, flexWrap: "wrap" }}
          >
            {props?.userData?.fullName}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#2C3E50", lineHeight: "27.2px", ml: 5.5 }}
          >
            Joined in {props?.userData?.registeredOn?.split("-")?.pop()}
          </Typography>
        </Box>

        <Box sx={{ flex: 0.1 }}>
          <IconButton>
            <BorderColorIcon
              sx={{ color: "#5F7388", width: "30", height: "30" }}
            />
          </IconButton>
        </Box>
      </Stack>

      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          onChange={props?.onProfileUpload}
          type="file"
        />

        <Button
          component="span"
          variant="text"
          sx={{ fontSize: "10px", color: "#2C3E50", mt: 1.2, ml: 1.5 }}
        >
          <div style={{ height: "16px", width: "16px", marginRight: "2px" }}>
            <Image alt="" src={galleryIcon} />
          </div>
          Update photo
        </Button>
      </label>
    </Box>
  );
};

export default ProfileInfo;
