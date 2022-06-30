import React, { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
// import { useMutation, useQueryClient } from "react-query";
import { APIContext } from "../../services/api-provider";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProgressIndicator from "../ui/ProgressIndicator";
import InfoAlert from "../ui/InfoAlert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addTenantSchema } from "@/utils/validation";
import TenantForm from "./TenantForm";

const TenantDialog = (props) => {
  const [showError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorMessage, setErrorMessage] = useState();

  // const { addTenant } = useContext(APIContext);
  // const queryClient = useQueryClient();

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

  // const addTenantMutation = useMutation((data) => addTenant(data), {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries("dashboard");
  //     setError(true);
  //     setErrorTitle("Success");
  //     setErrorMessage(
  //       props?.requestType === "UPDATE"
  //         ? "Tenant updated Successfully "
  //         : "Tenant Added Successfully "
  //     );
  //     setTimeout(() => {
  //       props?.onClose();
  //     }, 1000);
  //     methods.reset({
  //       state: "AP",
  //     });
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorTitle("Error");
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //     methods.reset({
  //       state: "AP",
  //     });
  //   },
  // });

  const onSubmitHandler = (values) => {
    const data = {
      ...values,
      mobileNo: "91" + values?.mobileNo,
    };
    if (props?.requestType === "UPDATE") {
      data["id"] = props?.formData?.id;
    }

    // addTenantMutation.mutate(data);
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
          Add Tenant
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
      {/* {addTenantMutation.isLoading && <ProgressIndicator />} */}
    </>
  );
};

export default TenantDialog;
