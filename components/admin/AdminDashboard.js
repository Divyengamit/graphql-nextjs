import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  Drawer,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import TenantDialog from "./TenantDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatDate } from "../../utils/date";
import { fetchAdminTenant } from "@/store/Slice/adminSlice";
import AdminForm from "./AdminForm";

const AdminDashboard = ({ userData }) => {
  const dispatch = useDispatch();
  const tenantAdminList = useSelector(({ admin }) => admin?.tenantAdminList);
  const adminState = useSelector(({ admin }) => admin);
  const [anchorElDrawer, setAnchorElUserDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState();
  const [editTenantDialog, setEditTenantDialog] = useState(false);

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const getAdminTenant = (entityId) => {
    if (!entityId) return;
    dispatch(
      fetchAdminTenant({
        entityId: entityId,
      })
    );
  };

  const handleTenantClose = () => setEditTenantDialog(false);

  const columns = [
    {
      field: "SI_NO",
      headerName: "SI.NO",
      sortable: false,
    },
    { field: "Business", headerName: "Business", flex: 1, sortable: false },
    {
      field: "ContactInfo",
      headerName: "Contact Info",
      flex: 1,
      sortable: false,
    },
    { field: "DateAdded", headerName: "Date Added", flex: 1, sortable: false },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Typography
          variant="h5SemiBold"
          sx={{ color: params.value ? "#19BC9C" : "#5F7388" }}
        >
          {params.value ? "Active" : "In-Active"}
        </Typography>
      ),
    },
  ];

  const tableData = () => {
    let list = [];
    if (!userData?.tenantList) return list;
    let id = 1;
    userData?.tenantList.map((item) => {
      list.push({
        id: item?.id,
        SI_NO: id++,
        Business: item?.companyName,
        ContactInfo: item?.mobileNo,
        DateAdded: formatDate(item?.createdOn),
        Status: item?.active,
      });
    });
    return list;
  };

  const tableStyles = {
    ".MuiDataGrid-columnHeaderTitle": {
      fontSize: "1rem",
      fontWeight: "500",
      color: "#ffffff",
    },
    ".MuiDataGrid-cell": {
      color: "primary.main",
      fontSize: "0.9rem",
    },
    ".MuiDataGrid-columnHeadersInner": {
      background: "#2C3E50",
    },
    ".MuiDataGrid-row": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    ".MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },
  };

  useEffect(() => {
    if (!drawerData?.entityId) return;
    getAdminTenant(drawerData?.entityId);
  }, [drawerData]);

  const handleRowClick = (params) => {
    const selectedData = userData?.tenantList?.find(
      (item) => item?.id === params?.id
    );

    setDrawerData(selectedData);
    setAnchorElUserDrawer(true);
  };

  const handleEditTenant = () => {
    setAnchorElUserDrawer(false);
    setEditTenantDialog(true);
  };

  const list = () => (
    <Box
      sx={{ width: "80vh", p: 3 }}
      className="admin-panel-record-details-div"
      role="presentation"
    >
      <IconButton
        aria-label="close"
        onClick={() => setAnchorElUserDrawer(false)}
        sx={{ mr: 2, p: 0, mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2Bold" color="secondary">
          Company Details
        </Typography>

        <Button variant="contained" size="small" onClick={handleEditTenant}>
          <EditIcon fontSize="tiny" sx={{ mr: 1 }} /> Edit
        </Button>
      </Box>

      <Box display="flex" sx={{ flexWrap: "wrap" }}>
        <Box sx={{ flexBasis: "33%", mt: 3 }}>
          <Typography variant="h3">Company Name</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {drawerData?.companyName}
          </Typography>
        </Box>

        <Box sx={{ flexBasis: "33%", mt: 3 }}>
          <Typography variant="h3">Tenant ID</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {drawerData?.tenantId}
          </Typography>
        </Box>
        <Box sx={{ flexBasis: "33%", mt: 3 }}>
          <Typography variant="h3">GST Number</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {drawerData?.gstNumber}
          </Typography>
        </Box>
        <Box sx={{ flexBasis: "33%", my: 3 }}>
          <Typography variant="h3">Contact Info</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {drawerData?.mobileNo}
          </Typography>
        </Box>

        <Box sx={{ flexBasis: "33%", my: 3 }}>
          <Typography variant="h3">Status</Typography>
          <Typography
            variant="h4SemiBold"
            sx={{ mt: 1, color: drawerData?.active ? "#19BC9C" : "#5F7388" }}
          >
            {drawerData?.active ? "Active" : "In-Active"}
          </Typography>
        </Box>
      </Box>

      <Divider />
      <Typography variant="h2Bold" color="secondary" sx={{ mt: 3 }}>
        Address
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography
          variant="h6"
          sx={{ lineHeight: 1.5, mb: 1.125 }}
          color="#000000"
        >
          {drawerData?.address1}
          {drawerData?.address1}
          <br /> {drawerData?.city}, <br /> {drawerData?.state} -{" "}
          {drawerData?.pincode}
        </Typography>
      </Box>

      <Divider />

      <AdminForm
        tenantAdminList={tenantAdminList}
        getAdminTenant={getAdminTenant}
        drawerData={drawerData}
        setError={setError}
        setErrorTitle={setErrorTitle}
        setErrorMessage={setErrorMessage}
      />
    </Box>
  );

  return (
    <Container maxWidth="xl" style={{ padding: 0, height: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", height: "100%" }}
      >
        <Grid item xs={12} md={12}>
          <Paper variant="tableCard">
            <Box>
              <DataGrid
                rows={tableData()}
                columns={columns}
                sx={tableStyles}
                pageSize={8}
                onRowClick={handleRowClick}
                autoHeight
                components={{
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No Tenants
                    </Stack>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Drawer
        className="admin-panel-record-details-main-div"
        anchor="right"
        open={anchorElDrawer}
      >
        {list()}
      </Drawer>

      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      <TenantDialog
        formData={drawerData}
        requestType="UPDATE"
        state={editTenantDialog}
        onClose={handleTenantClose}
      />

      {adminState?.loading && <ProgressIndicator />}
    </Container>
  );
};

export default AdminDashboard;
