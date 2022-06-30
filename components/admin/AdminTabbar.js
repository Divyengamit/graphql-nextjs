import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TenantDialog from "./TenantDialog";
import { useRouter } from "next/router";
import { HOME, MYPROFILE, SECURITY, USERS } from "@/utils/paths";

const AdminTabBar = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const isDashboard = [HOME, MYPROFILE, SECURITY].includes(pathname);

  const [addTenantDialog, setAddTenantDialog] = useState(false);

  const menuButtonStyle = {
    mr: 2.5,
    fontSize: "1rem",
    color: "#2C3E50",
    pr: 2.75,
    pl: 2.75,
    py: 1,
    borderRadius: "5px",
  };

  const handleTenantClose = () => setAddTenantDialog(false);

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item xs={12} sm={12} md={7}>
        <Box display="flex" flexWrap="wrap" sx={{ mt: 2.75, mb: 3 }}>
          <Button
            variant={isDashboard ? "contained" : "text"}
            sx={{
              ...menuButtonStyle,
              color: isDashboard ? "#FFFFFF" : "#2C3E50",
            }}
            onClick={() => {
              if (pathname !== HOME) {
                router.push(HOME);
              }
            }}
          >
            Dashboard
          </Button>
          <Button
            variant={pathname === USERS ? "contained" : "text"}
            sx={{
              ...menuButtonStyle,
              color: pathname === USERS ? "#FFFFFF" : "#2C3E50",
            }}
            // onClick={() => {
            //   router.push(USERS);
            // }}
          >
            Users
          </Button>
          <Button variant="text" color="secondary" sx={menuButtonStyle}>
            Manage
          </Button>
          <Button variant="text" color="secondary" sx={menuButtonStyle}>
            Requests
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={5} className="add-tenant-btn">
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2.75, mb: 3 }}
          
        >
          <Button
            variant="contained"
            sx={{ fontSize: "1rem" }}
            onClick={() => setAddTenantDialog(true)}
          >
            <AddIcon /> Add Tenant
          </Button>
        </Box>
      </Grid>
      <TenantDialog state={addTenantDialog} onClose={handleTenantClose} />
    </Grid>
  );
};

export default AdminTabBar;
