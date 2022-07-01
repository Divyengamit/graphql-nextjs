import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTenantAdminSchema } from "@/utils/validation";
import ConfirmAlert from "../ui/ConfirmAlert";
import AddIcon from "@mui/icons-material/Add";
import FlexBox from "../ui/FlexBox";
import InputField from "../ui/InputField";
import { useDispatch } from "react-redux";
import { addTenantAdmin, deleteTenant } from "@/store/Slice/adminSlice";

const TextCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1rem",
  textAlign: "start",
}));

const AdminForm = ({
  tenantAdminList,
  getAdminTenant,
  drawerData,
  setError,
  setErrorTitle,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();
  const [adminForm, setAdminForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [removeItem, setRemoveItem] = useState();

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState();
  const [confirmMessage, setConfirmMessage] = useState();

  const methods = useForm({
    resolver: yupResolver(addTenantAdminSchema),
    mode: "onSubmit",
  });

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
    dispatch(
      deleteTenant({
        entityId,
      })
    ).then((res) => {
      if (!res?.error) {
        setShowConfirm(false);
        setError(true);
        setErrorTitle("Success");
        setErrorMessage("Tenant Admin Deleted Successfully ");
        getAdminTenant(drawerData?.entityId);
      }
      if (res.error) {
        setShowConfirm(false);
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
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

  const handleRemove = (item) => {
    setRemoveItem(item);
    setShowConfirm(true);
    setConfirmTitle("Confirm");
    setConfirmMessage(
      `Remove Admin ${item?.adminName ? item?.adminName : ""} ?`
    );
  };

  const onSubmitHandler = (values) => {
    let updatedFields = {};

    for (let key in values) {
      if (values[key]) {
        updatedFields[key] = values[key];
        if (key === "mobileNo") {
          updatedFields[key] = "91" + values[key];
        }
      }
    }
    updatedFields["parentId"] = drawerData?.id;

    dispatch(addTenantAdmin(updatedFields)).then((res) => {
      if (!res?.error) {
        getAdminTenant(drawerData?.entityId);
        setError(true);
        setErrorTitle("Success");
        setErrorMessage(
          editForm
            ? "Tenant Admin Updated Successfully "
            : "Tenant Admin Added Successfully "
        );
        setEditForm(false);
        setAdminForm(false);
      }
      if (res.error) {
        setShowConfirm(false);
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
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
          <TextCell>+{item?.mobileNo}</TextCell>
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

  return (
    <>
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

      <TableContainer
        sx={{ mt: 1, mb: 3 }}
        className="admin-panel-table-data-div"
      >
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

      <ConfirmAlert
        show={showConfirm}
        // title={confirmTitle}
        body={confirmMessage}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleAdminDelete(removeItem)}
      />
    </>
  );
};
export default AdminForm;
