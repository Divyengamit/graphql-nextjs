import React from "react";
import {
  Box,
  Link,
  Toolbar,
  Stack,
  Divider,
  Typography,
  Container,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const FooterText = styled(Typography)(({ theme }) => ({
  color: "#8F8F8F",
}));

const FooterMain = (props) => {
  return (
    <Box sx={{ mt: "auto", width: "100%", backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar
          style={{ paddingRight: 0, paddingLeft: 0 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 3,
            pb: 2,
            w: 100,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="footer-top-menu-div"
          >
            <Stack
              direction="row"
              className="item-center-div"
              divider={
                <Divider
                  orientation="vertical"
                  sx={{
                    borderRightWidth: 2,
                    borderColor: "#5F7388A0",
                    height: 18,
                  }}
                />
              }
              spacing={4}
              alignItems="center"
              sx={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Link href="#">Help</Link>
              <Link>Contact</Link>

              <Link>Security</Link>
            </Stack>

            <Stack
              direction="row"
              className="item-center-div mt-div"
              divider={
                <Divider
                  orientation="vertical"
                  sx={{
                    borderRightWidth: 2,
                    borderColor: "#5F7388A0",
                    height: 18,
                  }}
                />
              }
              spacing={4}
              justifyContent="flex-end"
              alignItems="center"
              sx={{ width: "100%", display: "flex" }}
            >
              <Link>Contact</Link>
              <Link>Feedback</Link>
            </Stack>
          </Box>
          <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          <Stack
            direction="row"
            divider={
              <Divider
                orientation="vertical"
                sx={{
                  borderRightWidth: 1,
                  borderColor: "#5F7388A0",
                  height: 16,
                }}
              />
            }
            justifyContent="flex-end"
            spacing={2}
            alignItems="center"
            sx={{ width: "100%" }}
            className="item-center-div"
          >
            <FooterText variant="body2Regular">
              Canopi © Copyright. All Rights Reserved
            </FooterText>
            <FooterText variant="body2Regular">Privacy</FooterText>
            <FooterText variant="body2Regular">Legal</FooterText>
          </Stack>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default FooterMain;
