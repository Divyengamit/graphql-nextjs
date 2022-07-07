import React from "react";
import { Box, Link, Toolbar, Stack, Divider, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

const FooterText = styled(Typography)(({ theme }) => ({
  color: "#8F8F8F",
}));

const Footer = (props) => {
  return (
    <Box sx={{ mt: "auto", width: "100%", backgroundColor: "white" }}>
      <Toolbar sx={{ display: "flex", flexDirection: "column", pt: 3, pb: 2 }}>
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              sx={{ borderRightWidth: 2, borderColor: "#5F7388A0", height: 18 }}
            />
          }
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <Link href="#">Help</Link>
          <Link>Contact</Link>
          <Link>Security</Link>
          <Link>Feedback</Link>
        </Stack>
        <Divider flexItem sx={{ mt: 2, mb: 2 }} />
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              sx={{ borderRightWidth: 1, borderColor: "#5F7388A0", height: 16 }}
            />
          }
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <FooterText variant="body2Regular">
            Canopi © Copyright. All Rights Reserved
          </FooterText>
          <FooterText variant="body2Regular">Privacy</FooterText>
          <FooterText variant="body2Regular">Legal</FooterText>
        </Stack>
      </Toolbar>
    </Box>
  );
};

export default Footer;
