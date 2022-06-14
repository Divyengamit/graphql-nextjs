import React, { useCallback, useState, useContext } from "react";
import { Container, Grid, Paper } from "@mui/material";

import { Decryption, Encryption } from "../../../utils/EncryptDecrypt";
import { setLocal, getLocal } from "../../../utils/storage";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { APIContext } from "../../../services/api-provider";

import EquipmentForm from "../../../components/finance/EquipmentForm";
import FooterMain from "../../../components/navigation/FooterMain";
import MainAppBar from "../../../components/navigation/MainAppBar";
import InfoAlert from "../../../components/ui/InfoAlert";
import ProgressIndicator from "../../../components/ui/ProgressIndicator";
import EquipmentContent from "../../../components/finance/EquipmentContent";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { EquipmentFinanceSchema } from "../../../utils/validation";
import { styled } from "@mui/material/styles";

const FinanceScreen = () => {
  const router = useRouter();
  const routerParams = getLocal("tempData");
  console.log("router data", router);
  const [urlParamsData, setUrlParamsData] = useState(
    JSON.parse(
      Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
    )
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const { applyEquipmentFinance } = useContext(APIContext);

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const methods = useForm({
    resolver: yupResolver(EquipmentFinanceSchema),
    mode: "onSubmit",
    defaultValues: {
      profileType: "Salaried",
      highestQualification: "MBBS",
      hospitalVintage: "Less than 3 years",
      experience: 0,
    },
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
  }));

  const applyEquipmentFinanceMutation = useMutation(
    (data) => applyEquipmentFinance(data),
    {
      onSuccess: (data) => {
        setShowSuccess(true);
        setSuccessMessage(data?.data?.message);
        setTimeout(() => {
          router.push({ pathname: "/home" });
        }, 2000);
      },
      onError: (error) => {
        setErrorMessage(error?.response?.data?.message || error?.message);
        setError(true);
      },
    }
  );

  const onSubmitHandler = useCallback((data) => {
    applyEquipmentFinanceMutation.mutate({
      entityId: urlParamsData?.state?.userData?.entityId,
      ...data,
    });
  });

  return (
    <>
      <MainAppBar userData={urlParamsData?.state?.userData} />
      <Container>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <EquipmentContent />
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                  <EquipmentForm
                    sx={{ mt: 2, mb: 2, mr: "auto", ml: "auto" }}
                    onBack={() => router.push("/home")}
                  />
                </form>
              </FormProvider>
            </Item>
          </Grid>
        </Grid>
        {applyEquipmentFinanceMutation.isLoading && <ProgressIndicator />}
        <InfoAlert
          show={showError || showSuccess}
          title={!showSuccess ? "Error" : "Success"}
          body={!showSuccess ? errorMessage : successMessage}
          onClose={() => setError(false)}
        />
      </Container>

      <FooterMain />
    </>
  );
};
export default FinanceScreen;
