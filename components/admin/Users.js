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
import Image from "next/image";
const printIcon = require("../../assets/icons/cil_print.png");

const temptabledata = [
  {
    "emailAddress": "kushalsinghdodiya11@gmail.com",
    "fullName": "Kushal Singh",
    "entityId": "CNP1652078865",
    "id": 2,
    "mobileNo": "916261890073",
    "createdOn": "2022-05-12T10:24:12",
    "status": "PENDING"
  },
  {
    "emailAddress": "bhura@gmail.com",
    "fullName": "Mohd Bhura Malik",
    "entityId": "CNP000359003588",
    "id": 9,
    "mobileNo": "919548836590",
    "createdOn": "2022-05-14T12:59:43",
    "status": "PENDING"
  },
  {
    "emailAddress": "shahzad@gmail.com",
    "fullName": "Shahzad JJ",
    "entityId": "CNP009322475572",
    "id": 10,
    "mobileNo": "919690963188",
    "createdOn": "2022-05-18T11:00:03",
    "status": "ACTIVE"
  },
  {
    "emailAddress": "abcde@gmail.com",
    "fullName": "Newtest Singh",
    "entityId": "CNP667271177404",
    "id": 12,
    "mobileNo": "918871873896",
    "createdOn": "2022-05-19T06:25:48",
    "status": "PENDING"
  },
  {
    "emailAddress": "abd123@gmail.com",
    "fullName": "kushal kushalsiu Singgh",
    "entityId": "CNP854507738527",
    "id": 13,
    "mobileNo": "918871873808",
    "createdOn": "2022-05-19T06:47:14",
    "status": "PENDING"
  },
  {
    "emailAddress": "abcd3@gmail.com",
    "fullName": "Thisisfirst thisisLast",
    "entityId": "CNP508021425305",
    "id": 14,
    "mobileNo": "918871878989",
    "createdOn": "2022-05-19T07:03:29",
    "status": "ACTIVE"
  },
  {
    "emailAddress": "qwerty1234@gmail.com",
    "fullName": "kushal singh",
    "entityId": "CNP838983255102",
    "id": 15,
    "mobileNo": "917829963420",
    "createdOn": "2022-05-19T07:18:30",
    "status": "PENDING"
  },
  {
    "emailAddress": "asd@gmail.com",
    "fullName": "kushal singh",
    "entityId": "CNP956524680821",
    "id": 16,
    "mobileNo": "917829963427",
    "createdOn": "2022-05-19T07:29:06",
    "status": "PENDING"
  },
  {
    "emailAddress": "asd123@gmail.com",
    "fullName": "Kushal Singh",
    "entityId": "CNP677239062764",
    "id": 17,
    "mobileNo": "917829933420",
    "createdOn": "2022-05-19T08:10:25",
    "status": "PENDING"
  },
  {
    "emailAddress": "qw12@gmail.com",
    "fullName": "qwerty sigh",
    "entityId": "CNP436218196940",
    "id": 18,
    "mobileNo": "917829964528",
    "createdOn": "2022-05-19T09:58:24",
    "status": "PENDING"
  },
  {
    "emailAddress": "qerew12@gmail.com",
    "fullName": "Kushal Singh",
    "entityId": "CNP511003284995",
    "id": 19,
    "mobileNo": "918871877858",
    "createdOn": "2022-05-19T10:41:52",
    "status": "PENDING"
  },
  {
    "emailAddress": "zxzxz@gmail.com",
    "fullName": "zxcv zxzx",
    "entityId": "CNP863375836996",
    "id": 20,
    "mobileNo": "917824496352",
    "createdOn": "2022-05-19T10:50:50",
    "status": "PENDING"
  },
  {
    "emailAddress": "zxzxz12@gmail.com",
    "fullName": "Kuqwwqe asda",
    "entityId": "CNP518332406193",
    "id": 21,
    "mobileNo": "916261890033",
    "createdOn": "2022-05-19T11:00:30",
    "status": "PENDING"
  },
  {
    "emailAddress": "zxzxz1212@gmail.com",
    "fullName": "QWEWE QWEQ",
    "entityId": "CNP054884531030",
    "id": 22,
    "mobileNo": "916261897789",
    "createdOn": "2022-05-19T11:03:56",
    "status": "PENDING"
  },
  {
    "emailAddress": "poiuyt123@gmail.com",
    "fullName": "Java Tech",
    "entityId": "CNP006994165197",
    "id": 24,
    "mobileNo": "916261568807",
    "createdOn": "2022-05-20T04:52:45",
    "status": "PENDING"
  },
  {
    "emailAddress": "qqwqwq@gmail.com",
    "fullName": "qwertty lsuadj skjsdkj",
    "entityId": "CNP682721728725",
    "id": 25,
    "mobileNo": "916261890056",
    "createdOn": "2022-05-20T05:09:22",
    "status": "ACTIVE"
  },
  {
    "emailAddress": "asasasasas@gmail.com",
    "fullName": "QWQWQ QWQWQ QWQWQ",
    "entityId": "CNP473664240953",
    "id": 26,
    "mobileNo": "919875758585",
    "createdOn": "2022-05-20T05:13:12",
    "status": "PENDING"
  },
  {
    "emailAddress": "msmalik1245@gmail.com",
    "fullName": "Rabban Ali",
    "entityId": "CNP693916619172",
    "id": 27,
    "mobileNo": "917351071012",
    "createdOn": "2022-05-20T06:58:02",
    "status": "PENDING"
  },
  {
    "emailAddress": "wewewe@gmail.com",
    "fullName": "qwqwqw wewew",
    "entityId": "CNP944713797468",
    "id": 28,
    "mobileNo": "916261568897",
    "createdOn": "2022-05-20T08:17:59",
    "status": "PENDING"
  },
  {
    "emailAddress": "qwwewe@gmail.com",
    "fullName": "Kushal Singh",
    "entityId": "CNP489509601989",
    "id": 29,
    "mobileNo": "916261890545",
    "createdOn": "2022-05-20T10:13:12",
    "status": "PENDING"
  }
]


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
    if (!temptabledata) return list;
    let id = 1;
    temptabledata?.map((item) => {
      list.push({
        id: item?.id,
        SI_NO: id++,
        name: item?.fullName,
        email: item?.emailAddress,
        contactInfo: item?.mobileNo,
        dateAdded: "02/06/2022",
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
      toggleDrawer()
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
                {/* <img alt="" src={printIcon} style={{ width: 23, height: 23 }} /> */}
                <Image alt="" src={printIcon}  width={ 23} height={23} />
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
      <Drawer anchor="right" open={anchorElDrawer} onClose={toggleDrawer} className="user-admin-panel-record-details-main-div">
        {list()}
      </Drawer>

      {getTenantListMutation?.isLoading && <ProgressIndicator />}
    </Container>
  );
};

export default Users;
