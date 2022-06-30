import React, { useCallback, useState, useContext, useEffect } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";

import { useMutation, useQueryClient } from "react-query";
import { APIContext } from "../../services/api-provider";
import { useSelector } from "react-redux";

import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";

import { DataGrid } from "@mui/x-data-grid";

import { styled } from "@mui/material/styles";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TenantDialog from "./TenantDialog";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlexBox from "../ui/FlexBox";

import { formatDate } from "../../utils/date";
import InputField from "../ui/InputField";

import { addTenantAdminSchema } from "../../utils/validation";
import ConfirmAlert from "../ui/ConfirmAlert";

const temptabledata = [
  {
      "id": 1,
      "parentId": null,
      "entityId": "CNP435907644144",
      "tenantId": "V72MAUKG75NR7L7A",
      "tenantSecretKey": "VjcyTUFVS0c3NU5SN0w3QWNhbm9waXBheTEyMzAhIw",
      "adminName": "Canopi India",
      "companyName": "Canopi India",
      "gstNumber": "1234ASDFG234",
      "emailAddress": "prabal@canopi.in",
      "mobileNo": "919902584804",
      "address1": "aa",
      "address2": "aa",
      "city": "aa",
      "state": "TN",
      "pincode": "123456",
      "password": null,
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 0,
      "deleted": false,
      "createdOn": "2022-06-02T13:54:30",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 3,
      "parentId": null,
      "entityId": "CNP418259127891",
      "tenantId": "5ELJEGVYFGW3GAD7",
      "tenantSecretKey": "NUVMSkVHVllGR1czR0FEN2Nhbm9waXBheTEyMzAhIw",
      "adminName": "Sarfraz Malik",
      "companyName": "Canopiere",
      "gstNumber": "ABCD12330A2",
      "emailAddress": "sarfraz3@canopi.in",
      "mobileNo": "917000406953",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": null,
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1654083408,
      "deleted": false,
      "createdOn": "2022-06-01T11:36:49",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 4,
      "parentId": null,
      "entityId": "CNP433141013232",
      "tenantId": "ESMIOQWBFQ5L2FV4",
      "tenantSecretKey": "RVNNSU9RV0JGUTVMMkZWNGNhbm9waXBheTEyMzAhIw",
      "adminName": "Hemant",
      "companyName": "teses",
      "gstNumber": "asdasdadsad",
      "emailAddress": "hemant@canopi.in",
      "mobileNo": "919756264790",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": null,
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1654083453,
      "deleted": false,
      "createdOn": "2022-06-01T11:37:34",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 5,
      "parentId": null,
      "entityId": "CNP470857493646",
      "tenantId": "GF33EFAPADTYSQX8",
      "tenantSecretKey": null,
      "adminName": "Salman Malik",
      "companyName": "Canopiagag",
      "gstNumber": "ABCD12330A3",
      "emailAddress": "salman1@canopi.in",
      "mobileNo": "919756264792",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": null,
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1654083985,
      "deleted": false,
      "createdOn": "2022-06-01T11:46:25",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 6,
      "parentId": null,
      "entityId": "CNP278189247388",
      "tenantId": "O5ESSIP5R6F936RZ",
      "tenantSecretKey": null,
      "adminName": "kuhaksas",
      "companyName": "CanopiNewUpdateg",
      "gstNumber": "ASDSDSDAASD",
      "emailAddress": "sarfraz1@canopi.in",
      "mobileNo": "918871873813",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": null,
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1654084137,
      "deleted": false,
      "createdOn": "2022-06-01T11:48:58",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 30,
      "parentId": null,
      "entityId": "CNP506335516589",
      "tenantId": "AAXR4TZR90U9N3E5",
      "tenantSecretKey": null,
      "adminName": "Testt",
      "companyName": "tyytyt",
      "gstNumber": "tyyty",
      "emailAddress": "mmnmnm@gmail.com",
      "mobileNo": "918871871346",
      "address1": "tyt",
      "address2": "asdasdad",
      "city": "masndmndm",
      "state": "CG",
      "pincode": "458700",
      "password": null,
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1654244837,
      "deleted": false,
      "createdOn": "2022-06-03T08:27:17",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 71,
      "parentId": null,
      "entityId": "CNP757210777646",
      "tenantId": "M8U64QABOUN7OXBY",
      "tenantSecretKey": null,
      "adminName": "Pooja Sankhala",
      "companyName": "Canopi",
      "gstNumber": "ABCD12330A4",
      "emailAddress": "pooja3@canopi.in",
      "mobileNo": "919383224446",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": "$2a$10$3O2vJ/hiYEQU8kJMvC6t2esc45aU3MCuzOBKHYUz3cCEw.H40pnxm",
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1655885289,
      "deleted": false,
      "createdOn": "2022-06-15T05:18:37",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 72,
      "parentId": null,
      "entityId": "CNP247450482021",
      "tenantId": "4G63W5WGOES630N0",
      "tenantSecretKey": null,
      "adminName": "Pooja Sankhala",
      "companyName": "Canopi",
      "gstNumber": "ABCD12330A7",
      "emailAddress": "pooja39@canopi.in",
      "mobileNo": "919383224448",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": "$2a$10$YIk1X/vlPjxvXaIomyShmeGU4P3W2KxCdPHh9TSsRmxL0mfbW10KW",
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1655296575,
      "deleted": false,
      "createdOn": "2022-06-15T06:21:51",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 73,
      "parentId": null,
      "entityId": "CNP750677207971",
      "tenantId": "QMOAOO320NZDDU0R",
      "tenantSecretKey": null,
      "adminName": "Pooja Pooja",
      "companyName": "Canopi",
      "gstNumber": "ABCD12330A10",
      "emailAddress": "pooja97@canopi.in",
      "mobileNo": "919383224440",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": "$2a$10$pzpqnlECoqxWcYFSYbHZeOSm3ROuY4yEOEF1F0BKOhuD3pw8ihi0a",
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1655296825,
      "deleted": false,
      "createdOn": "2022-06-15T12:40:25",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 74,
      "parentId": null,
      "entityId": "CNP457161747263",
      "tenantId": "39S7S3T953YAUR2J",
      "tenantSecretKey": null,
      "adminName": "Pooja Sankhala",
      "companyName": "Canopi",
      "gstNumber": "ABCD12330A97",
      "emailAddress": "pooja15@canopi.in",
      "mobileNo": "919756264793",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": null,
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1655725670,
      "deleted": false,
      "createdOn": "2022-06-20T11:47:51",
      "logoFile": null,
      "brandingFile": null
  },
  {
      "id": 75,
      "parentId": null,
      "entityId": "CNP044574967723",
      "tenantId": "726LPG1VKA5SDTRE",
      "tenantSecretKey": null,
      "adminName": "Sreenath Nair",
      "companyName": "Canopi",
      "gstNumber": "ABCD12330A5",
      "emailAddress": "sreenath@mailinator.com",
      "mobileNo": "919756264794",
      "address1": "Naagal",
      "address2": "Kaliyer",
      "city": "Roorkee",
      "state": "UK",
      "pincode": "247667",
      "password": "$2a$10$0zRQZpdgmK9AmQhjhvC8Bu8X2Krqwt/JxgGYUVwW3qbDJ6bK/YRc.",
      "passwordConfirm": null,
      "logoFilePath": null,
      "brandingFilePath": null,
      "active": true,
      "expireOn": 1655884799,
      "deleted": false,
      "createdOn": "2022-06-22T07:59:59",
      "logoFile": null,
      "brandingFile": null
  }
]

const AdminDashboard = () => {
  const { userData } = useSelector((state) => state.auth);

  const [anchorElDrawer, setAnchorElUserDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState();
  const [editTenantDialog, setEditTenantDialog] = useState(false);
  const [adminForm, setAdminForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [tenantAdminList, setTenantAdminList] = useState([]);
  const [removeItem, setRemoveItem] = useState();

  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState();
  const [confirmMessage, setConfirmMessage] = useState();

  const { deleteTenant, fetchAdminTenants, addTenantAdmin } =
    useContext(APIContext);

  const getTenantAdminMutation = useMutation(
    (data) => fetchAdminTenants(data),
    {
      onSuccess: (data) => {
        setTenantAdminList(data?.data);
      },
      onError: (error) => {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(error?.response?.data?.message || error?.message);
      },
    }
  );

  const addTenantAdminMutation = useMutation((data) => addTenantAdmin(data), {
    onSuccess: (data) => {
      setError(true);
      setErrorTitle("Success");
      setErrorMessage(
        editForm
          ? "Tenant Admin Updated Successfully "
          : "Tenant Admin Added Successfully "
      );
      getTenantAdminMutation.mutate({
        entityId: drawerData?.entityId,
      });
      setEditForm(false);
      setAdminForm(false);
    },
    onError: (error) => {
      setError(true);
      setErrorTitle("Error");
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const deleteTenantAdminMutation = useMutation((data) => deleteTenant(data), {
    onSuccess: (data) => {
      setShowConfirm(false);
      setError(true);
      setErrorTitle("Success");
      setErrorMessage("Tenant Admin Deleted Successfully ");
      getTenantAdminMutation.mutate({
        entityId: drawerData?.entityId,
      });
    },
    onError: (error) => {
      setShowConfirm(false);
      setError(true);
      setErrorTitle("Error");
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(addTenantAdminSchema),
    mode: "onSubmit",
  });

  const TextCell = styled(TableCell)(({ theme }) => ({
    fontSize: "1rem",
    textAlign: "start",
  }));

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
    // if (!userData?.tenantList) return list;
    // let id = 1;
    // userData?.tenantList.map((item) => {
    //   list.push({
    //     id: item?.id,
    //     SI_NO: id++,
    //     Business: item?.companyName,
    //     ContactInfo: item?.mobileNo,
    //     DateAdded: formatDate(item?.createdOn),
    //     Status: item?.active,
    //   });
    // });
    let id = 1;
    temptabledata.forEach((item) => {
      list.push({
        id: item?.id,
        SI_NO: id++,
        Business: item?.companyName,
        ContactInfo: item?.mobileNo,
        DateAdded: "02/06/2022",
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
    getTenantAdminMutation.mutate({
      entityId: drawerData?.entityId,
    });
  }, [drawerData]);

  const handleRowClick = useCallback(
    (params) => {
      const selectedData = userData?.tenantList?.find(
        (item) => item?.id === params?.id
      );

      setDrawerData(selectedData);
      setAnchorElUserDrawer(true);
    },
    [drawerData, userData]
  );

  const handleEditTenant = () => {
    setAnchorElUserDrawer(false);
    setEditTenantDialog(true);
  };

  const handleAddAdmin = () => {
    methods.reset({
      adminName: "",
      emailAddress: "",
      mobileNo: "",
    });
    setEditForm(false);
    setAdminForm(true);
  };

  const onSubmitHandler = useCallback(
    (values) => {
      let updatedFields = {};

      for (let key in values) {
        if (values[key]) {
          updatedFields[key] = values[key];
          if (key === "mobileNo") {
            updatedFields[key] = "91" + values[key];
          }
        }
      }

      addTenantAdminMutation.mutate({
        ...updatedFields,
        parentId: drawerData?.id,
      });
    },
    [drawerData, addTenantAdminMutation]
  );

  const handleAdminEdit = (values) => {
    let formatMobileNo = values?.mobileNo?.substring(2);
    setEditForm(true);
    setAdminForm(true);
    methods.reset({
      ...values,
      mobileNo: formatMobileNo,
    });
  };

  const handleAdminDelete = ({ entityId }) => {
    deleteTenantAdminMutation.mutate({
      entityId,
    });
  };

  const handleRemove = (item) => {
    setRemoveItem(item);
    setShowConfirm(true);
    setConfirmTitle("Confirm");
    setConfirmMessage(
      `Remove Admin ${item?.adminName ? item?.adminName : ""} ?`
    );
  };

  const adminTableRows = () => {
    let i = 1;
    return tenantAdminList?.map((item) => {
      return (
        <TableRow
          key={item?.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TextCell component="th" scope="row">
            {i++}
          </TextCell>
          <TextCell component="th" scope="row">
            {item?.adminName}
          </TextCell>
          <TextCell>{item?.emailAddress}</TextCell>
          <TextCell>{item?.mobileNo}</TextCell>
          <TextCell>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ mr: 1 }}
              title="edit"
              onClick={() => handleAdminEdit(item)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="edit"
              size="small"
              title="delete"
              onClick={() => handleRemove(item)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </TextCell>
        </TableRow>
      );
    });
  };

  const list = () => (
    <Box sx={{ width: "80vh", p: 3 }} className="admin-panel-record-details-div" role="presentation">
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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <Typography variant="h2Bold" color="secondary">
          Admins
        </Typography>

        <Button
          variant="contained"
          aria-label="delete"
          size="small"
          onClick={handleAddAdmin}
        >
          <AddIcon fontSize="small" sx={{ mr: 0.5 }} /> Add
        </Button>
      </Box>

      <TableContainer sx={{ mt: 1, mb: 3 }} className="admin-panel-table-data-div">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TextCell>Sl.No</TextCell>
              <TextCell>Admin Name</TextCell>
              <TextCell>Email</TextCell>
              <TextCell>Contact No</TextCell>
              <TextCell>Action</TextCell>
            </TableRow>
          </TableHead>
          <TableBody>{adminTableRows()}</TableBody>
        </Table>
        {tenantAdminList?.length === 0 && (
          <Box display="flex" justifyContent="center" sx={{ my: 5 }}>
            <Typography variant="h5Regular">No Tenant Admins</Typography>
          </Box>
        )}
      </TableContainer>

      {adminForm && (
        <FormProvider {...methods}>
          <Typography variant="h2Bold" color="secondary" sx={{ my: 3 }}>
            {editForm ? "Update Admin" : " Add Admin"}
          </Typography>
          <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <FlexBox row sx={{ mt: 1, alignItems: "center" }}>
              <FlexBox sx={{ flex: 1, alignItems: "flex-start", mr: 1 }}>
                <Typography variant="h5SemiBold">Admin Name</Typography>
                <InputField
                  type="text"
                  name="adminName"
                  placeholder="Enter Admin Name "
                  settings={{
                    variant: "outlined",
                    sx: { mt: 1.2 },
                    fullWidth: true,
                  }}
                />
              </FlexBox>
              <FlexBox sx={{ flex: 1, alignItems: "flex-start", ml: 1 }}>
                <Typography variant="h5SemiBold">Email</Typography>
                <InputField
                  type="email"
                  name="emailAddress"
                  placeholder="Enter Email Address"
                  settings={{
                    variant: "outlined",
                    sx: { mt: 1.2 },
                    fullWidth: true,
                  }}
                />
              </FlexBox>
            </FlexBox>

            <FlexBox row sx={{ alignItems: "center" }}>
              <FlexBox sx={{ flex: 0.5, alignItems: "flex-start", mr: 1 }}>
                <Typography variant="h5SemiBold" sx={{ mt: 2 }}>
                  Phone Number
                </Typography>
                <InputField
                  type="number"
                  name="mobileNo"
                  placeholder="Your Phone Number"
                  settings={{
                    variant: "outlined",
                    sx: { mt: 1.2 },
                    fullWidth: true,
                  }}
                />
              </FlexBox>
            </FlexBox>

            <Button variant="contained" type="submit" sx={{ mt: 2, mr: 1 }}>
              {editForm ? "Update" : "Submit"}
            </Button>
            <Button
              variant="outlined"
              type="submit"
              sx={{ mt: 2 }}
              onClick={() => setAdminForm(false)}
            >
              Cancel
            </Button>
          </form>
        </FormProvider>
      )}
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

      <Drawer className="admin-panel-record-details-main-div" anchor="right" open={anchorElDrawer}>
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
      <ConfirmAlert
        show={showConfirm}
        title={confirmTitle}
        body={confirmMessage}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleAdminDelete(removeItem)}
      />

      {(deleteTenantAdminMutation.isLoading ||
        addTenantAdminMutation.isLoading) && <ProgressIndicator />}
    </Container>
  );
};

export default AdminDashboard;
