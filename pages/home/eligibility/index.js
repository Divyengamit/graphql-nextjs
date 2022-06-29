import React, { useState } from "react";
import { Container, Grid, Paper } from "@mui/material";

import { Decryption } from "../../../utils/EncryptDecrypt";
import { getLocal } from "../../../utils/storage";
import { useRouter } from "next/router";

// import { useMutation } from "react-query";
// import { APIContext } from "../../../services/api-provider";

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
import style from "../../../styles/EquipmentForm.module.css";
import Alert from "../../../components/ui/Alert";
import { useDispatch, useSelector } from "react-redux";
import { checkEquipmentFinanceEligibility } from "@/store/Slice/equipmentSlice";

const FinanceScreen = () => {
  const dispatch = useDispatch();
  const equipmentState = useSelector(({ equipment }) => equipment);
  const router = useRouter();
  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  // const { applyEquipmentFinance } = useContext(APIContext);

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const methods = useForm({
    resolver: yupResolver(EquipmentFinanceSchema),
    mode: "onChange",
    defaultValues: {
      profileType: "Salaried",
      highestQualification: "MBBS",
      experience: 0,
    },
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
  }));

  const nextHandler = () => {
    router.push({ pathname: "/home/finance" });
  };

  // const applyEquipmentFinanceMutation = useMutation(
  //   (data) => applyEquipmentFinance(data),
  //   {
  //     onSuccess: (data) => {
  //       setShowSuccess(true);
  //       setSuccessMessage(data?.data?.message);
  //       setTimeout(() => {
  //         router.push({ pathname: "/home" });
  //       }, 2000);
  //     },
  //     onError: (error) => {
  //       setErrorMessage(error?.response?.data?.message || error?.message);
  //       setError(true);
  //     },
  //   }
  // );

  // const onSubmitHandler = useCallback(
  //   (data) => {

  //     applyEquipmentFinanceMutation.mutate({
  //       entityId: urlParamsData?.state?.userData?.entityId,
  //       ...data,
  //     });
  //   },
  //   [urlParamsData, applyEquipmentFinanceMutation]
  // );

  const onSubmitHandler = (data) => {
    let tempForm = {
      entityId: userID?.state?.userId,
      profileType: "SAL",
      highestQualification: data?.highestQualification,
      experience: data?.experience,
      annualIncome: data?.annualIncome,
    };
    dispatch(checkEquipmentFinanceEligibility(tempForm)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.message || "Something went wrong!");
        // router.push({ pathname: "/home" });
        // setTimeout(() => {
        //   router.push({ pathname: "/home" });
        // }, 4000);
      }
      if (!res.error) {
        nextHandler();
      }
    });
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MainAppBar userData={urlParamsData?.state?.userData} />

      {/* Not Eligible Dialog */}
      {isOpen && <Alert isError={true} onClose={onClose} />}

      <Container>
        <Grid
          container
          spacing={2}
          className={style.Equipment_finance_form_main_div}
        >
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className={style.Equipment_finance_left_div}
          >
            <EquipmentContent />
          </Grid>
          <Grid item xs={12} md={6} className="align-item-div">
            <Item>
              <FormProvider {...methods}>
                <form
                  // onSubmit={onSubmitHandler}
                  onSubmit={methods.handleSubmit(onSubmitHandler)}
                >
                  <EquipmentForm
                    sx={{ mt: 2, mb: 2, mr: "auto", ml: "auto" }}
                    onBack={() => router.push("/home")}
                    // onNext={() => router.push("/finance")}
                  />
                </form>
              </FormProvider>
            </Item>
          </Grid>
        </Grid>
        {equipmentState?.loading && <ProgressIndicator />}
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
