import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addTenantSchema } from "@/utils/validation";
import TenantForm from "./TenantForm";
import { useDispatch, useSelector } from "react-redux";
import { addTenant } from "@/store/Slice/adminSlice";
import { fetchAdminDashboardDetails } from "@/store/dashboardSlice";
import { getUserID } from "@/utils/EncryptDecrypt";

const TenantDialog = (props) => {
  const dispatch = useDispatch();
  const adminState = useSelector(({ admin }) => admin);
  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const methods = useForm({
    resolver: yupResolver(addTenantSchema),
    mode: "onSubmit",
    defaultValues: {
      state: "AP",
    },
  });

  useEffect(() => {
    let updatedFields = {};
    let formatMobileNo = props?.formData?.mobileNo?.substring(2);

    for (let key in props?.formData) {
      if (props?.formData[key]) {
        updatedFields[key] = props?.formData[key];
        if (key === "mobileNo") {
          updatedFields[key] = formatMobileNo;
        }
      }
    }
    methods.reset(
      props?.requestType === "UPDATE"
        ? updatedFields
        : {
            state: "AP",
          }
    );
  }, [methods, props]);

  const onAddTenant = (data) => {
    dispatch(addTenant(data)).then((res) => {
      if (!res.error) {
        dispatch(fetchAdminDashboardDetails(getUserID()));
        setError(true);
        setErrorTitle("Success");
        setErrorMessage(
          props?.requestType === "UPDATE"
            ? "Tenant updated Successfully "
            : "Tenant Added Successfully "
        );
        setTimeout(() => {
          props?.onClose();
        }, 1000);
        methods.reset({
          state: "AP",
        });
      }
      if (res?.error) {
        setError(true);
        setErrorTitle("Error");
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
    });
  };

  const onSubmitHandler = (values) => {
    const data = {
      ...values,
      mobileNo: "91" + values?.mobileNo,
    };
    if (props?.requestType === "UPDATE") {
      data["id"] = props?.formData?.id;
    }
    onAddTenant(data);
  };

  return (
    <>
      <Dialog
        open={props?.state}
        onClose={props?.onClose}
        fullWidth
        maxWidth={"sm"}
        PaperProps={{
          style: { borderRadius: "15px" },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            position: "absolute",
            left: 20,
            top: 12,
          }}
        >
          <IconButton aria-label="close" onClick={props?.onClose}>
            <ArrowBackIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
          <Typography variant="h5SemiBold" sx={{ color: "#5F7388" }}>
            Back
          </Typography>
        </Box>

        <IconButton
          aria-label="close"
          onClick={props?.onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h2Bold"
          color="secondary"
          sx={{ pb: 1.1, px: 5, pt: 3.25, textAlign: "center" }}
        >
          {props?.requestType === "UPDATE" ? "Update" : "Add"} Tenant
        </DialogTitle>
        <DialogContent sx={{ px: 5, py: 3.75 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <TenantForm requestType={props?.requestType} />
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      <InfoAlert
        show={showError}
        title={errorTitle}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      {adminState?.loading && <ProgressIndicator />}
    </>
  );
};

export default TenantDialog;
