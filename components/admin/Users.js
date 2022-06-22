import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useSelector } from "react-redux";

import { useMutation } from "react-query";
import { APIContext } from "../../services/api-provider";

import { DataGrid } from "@mui/x-data-grid";

import { styled } from "@mui/material/styles";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProgressIndicator from "../ui/ProgressIndicator";
import { formatDate } from "../../utils/date";
import CircleIcon from "@mui/icons-material/Circle";
const printIcon = require("../../assets/icons/cil_print.png");

const Users = () => {
  const { userData } = useSelector((state) => state.auth);

  const [filterDoc, setFilterDoc] = useState("");
  const [userTableData, setUserTableData] = useState();
  const [drawerData, setDrawerData] = useState();
  const [anchorElDrawer, setAnchorElUserDrawer] = useState(false);

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { fetchUserList, fetchCustomerServices } = useContext(APIContext);

  const getTenantListMutation = useMutation((data) => fetchUserList(data), {
    onSuccess: (data) => {
      setUserTableData(data?.data);
    },
    onError: (error) => {
      setError(true);
      setErrorTitle("Error");
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const fetchCustomerServicesMutation = useMutation(
    (data) => fetchCustomerServices(data),
    {
      onSuccess: (data) => {
        setDrawerData(data?.data);
        setAnchorElUserDrawer(true);
      },
      onError: (error) => {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(error?.response?.data?.message || error?.message);
      },
    }
  );

  useEffect(() => {
    const defaultSelect = userData?.tenantList?.find(
      (item) => item?.companyName === "Canopi India"
    );
    setFilterDoc(defaultSelect?.entityId);
  }, []);

  const columns = [
    { field: "SI_NO", headerName: "SI.NO", sortable: false },
    { field: "name", headerName: "Name", flex: 1, sortable: false },
    {
      field: "contactInfo",
      headerName: "Contact Info",
      flex: 1,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: false,
    },
    { field: "dateAdded", headerName: "Date Added", flex: 1, sortable: false },
  ];

  const rows = [
    {
      id: 1,
      SI_NO: 1,
      name: "Canpoi",
      contactInfo: "+918871873812",
      bussinessAssociate: "qwerty",
      dateAdded: "12/02/2021",
    },
    {
      id: 2,
      SI_NO: 2,
      name: "Canpoi",
      contactInfo: "+918871873812",
      bussinessAssociate: "qwerty",
      dateAdded: "12/02/2021",
    },
    {
      id: 3,
      SI_NO: 3,
      name: "Canpoi",
      contactInfo: "+918871873812",
      bussinessAssociate: "qwerty",
      dateAdded: "12/02/2021",
    },
  ];

  const tableData = () => {
    let list = [];
    if (!userTableData) return list;
    let id = 1;
    userTableData?.map((item) => {
      list.push({
        id: item?.id,
        SI_NO: id++,
        name: item?.fullName,
        email: item?.emailAddress,
        contactInfo: item?.mobileNo,
        dateAdded: formatDate(item?.createdOn),
      });
    });
    return list;
  };

  const TextCell = styled(TableCell)(({ theme }) => ({
    fontSize: "1rem",
    textAlign: "start",
  }));

  const tableStyles = {
    ".MuiDataGrid-columnHeaderTitle": {
      fontSize: "1rem",
      fontWeight: "600",
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
    border: 0,
  };

  const dotIcon = {
    height: 7,
    width: 7,
  };

  const handleRowClick = useCallback(
    (params) => {
      const selectedData = userTableData?.find(
        (item) => item?.id === params?.id
      );
      fetchCustomerServicesMutation.mutate({
        entityId: selectedData?.entityId,
      });
    },
    [userTableData, fetchCustomerServicesMutation]
  );

  const handlePrintClick = () => {
    window.print();
  };

  const handleChangeFilter = useCallback(
    (event) => {
      let entityId = event.target.value;
      setFilterDoc(entityId);
    },
    [filterDoc]
  );

  useEffect(() => {
    if (!filterDoc) return;
    getTenantListMutation.mutate({
      entityId: filterDoc,
    });
  }, [filterDoc]);

  const toggleDrawer = () => {
    setAnchorElUserDrawer(true);
  };

  const menuList = () => {
    const list = userData?.tenantList?.map((item, index) => {
      return (
        <MenuItem selected={index == 1 && true} value={item?.entityId}>
          {item?.companyName}
        </MenuItem>
      );
    });
    return list;
  };

  const cardListRows = () => {
    let i = 1;
    return drawerData?.cards?.map((item) => {
      return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TextCell component="th" scope="row">
            {i++}
          </TextCell>
          <TextCell>
            <CircleIcon sx={dotIcon} />
            <CircleIcon sx={dotIcon} />
            <CircleIcon sx={dotIcon} />
            <CircleIcon sx={dotIcon} />
            {item?.last4Digits}
          </TextCell>
          <TextCell
            sx={{
              color: item?.status === "ACTIVE" ? "#19BC9C" : "#d32f2f",
              fontWeight: "600",
            }}
          >
            {item?.status}
          </TextCell>
        </TableRow>
      );
    });
  };

  const equipmentFinancesRows = () => {
    let i = 1;
    return drawerData?.equipmentFinances?.map((item) => {
      return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TextCell component="th" scope="row">
            {i++}
          </TextCell>
          <TextCell>{item?.requestID}</TextCell>
          <TextCell>{item?.crmLeadNum}</TextCell>
        </TableRow>
      );
    });
  };

  const list = () => (
    <Box sx={{ width: "50vh", p: 3 }} role="presentation">
      <IconButton
        aria-label="close"
        onClick={() => setAnchorElUserDrawer(false)}
        sx={{ mr: 2, p: 0, mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h2Bold" color="secondary" sx={{ my: 1 }}>
        User Details
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h3">User Name</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {drawerData?.fullName}
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h3">Phone Number</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {drawerData?.mobileNo}
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h3">Email</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {drawerData?.emailAddress}
        </Typography>
      </Box>

      <Typography variant="h2Bold" color="secondary" sx={{ mt: 4 }}>
        Cards
      </Typography>

      <TableContainer sx={{ mb: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TextCell>SL.No</TextCell>
              <TextCell>Card</TextCell>
              <TextCell>Status</TextCell>
            </TableRow>
          </TableHead>
          <TableBody>{cardListRows()}</TableBody>
        </Table>
        {drawerData?.cards?.length === 0 && (
          <Box display="flex" justifyContent="center" sx={{ my: 5 }}>
            <Typography variant="h5Regular">No Cards</Typography>
          </Box>
        )}
      </TableContainer>

      <Typography variant="h2Bold" color="secondary" sx={{ my: 1 }}>
        Equipment Finance
      </Typography>

      <TableContainer sx={{ mb: 3 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TextCell>SL.No</TextCell>
              <TextCell>RequestID</TextCell>
              <TextCell>CrmLeadNum</TextCell>
            </TableRow>
          </TableHead>
          <TableBody>{equipmentFinancesRows()}</TableBody>
        </Table>

        {drawerData?.equipmentFinances?.length === 0 && (
          <Box display="flex" justifyContent="center" sx={{ my: 5 }}>
            <Typography variant="h5Regular">No Data</Typography>
          </Box>
        )}
      </TableContainer>
    </Box>
  );

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={12}>
          <Paper variant="tableCard">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 2, px: 2 }}
            >
              <IconButton
                aria-label="print"
                color="primary"
                onClick={handlePrintClick}
              >
                <img alt="" src={printIcon} style={{ width: 23, height: 23 }} />
              </IconButton>

              <Box display="flex" alignItems="center">
                <Typography>Select Business</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    labelId="demo-select-small"
                    displayEmpty
                    value={filterDoc}
                    onChange={handleChangeFilter}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {menuList()}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
              <DataGrid
                rows={tableData()}
                columns={columns}
                autoHeight
                pageSize={8}
                sx={tableStyles}
                onRowClick={handleRowClick}
                components={{
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No Users
                    </Stack>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Drawer anchor="right" open={anchorElDrawer} onClose={toggleDrawer}>
        {list()}
      </Drawer>

      {getTenantListMutation?.isLoading && <ProgressIndicator />}
    </Container>
  );
};

export default Users;
