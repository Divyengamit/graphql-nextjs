import { useState } from "react";
import {
  // Button,
  // IconButton,
  // Paper,
  Step,
  StepLabel,
  Stepper,
  // Typography,
} from "@mui/material";
import style from "../../../styles/EquipmentForm.module.css";
import { Container } from "@mui/material";
import MainAppBar from "../../../components/navigation/MainAppBar";
import { getLocal } from "../../../utils/storage";
import { Decryption } from "../../../utils/EncryptDecrypt";
import FooterMain from "../../../components/navigation/FooterMain";
// import FlexBox from "../../../components/ui/FlexBox";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import InputField from "../../../components/ui/InputField";
// import OptionsTypes from "../../../components/onboarding/OptionsTypes";
import { FormProvider, useForm } from "react-hook-form";
import ProfessionalDetailsForm from "../../../components/finance/ProfessionalDetails";
import LoanDetailsForm from "../../../components/finance/LoanDetails";
import FinancialDocumentsForm from "../../../components/finance/FinancialDocuments";
import { useRouter } from "next/router";
const steps = [
  "Professional Details",
  "Loan Details",
  "Personal and Financial Documents",
];
const sx = { mt: 2, mb: 2, mr: "auto", ml: "auto" };

const EquipmentFinance = () => {
  const router = useRouter();
  const [activeStep, setActivestep] = useState(0);
  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const methods = useForm({
    // resolver: yupResolver(EquipmentFinanceSchema),
    mode: "onSubmit",
    defaultValues: {
      profileType: "Salaried",
      highestQualification: "MBBS",
      hospitalVintage: "Less than 3 years",
      experience: 0,
    },
  });

  const onSubmitHandler = () => {};

  const onClickNext = () => {
    setActivestep(activeStep + 1);
    if (activeStep === 2) {
      router.push({ pathname: "/home" });
    }
  };

  return (
    <div>
      <MainAppBar userData={urlParamsData?.state?.userData} />
      <Container>
        <div className={style.Finance_Form_main_box}>
          <div className={style.Form_Stepper_div}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className={style.abcd}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          {activeStep === 0 && (
            <div className={style.form_main_div}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                  <ProfessionalDetailsForm onClickNext={onClickNext} />
                </form>
              </FormProvider>
            </div>
          )}

          {activeStep === 1 && (
            <div className={style.form_main_div}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                  <LoanDetailsForm onClickNext={onClickNext} />
                </form>
              </FormProvider>
            </div>
          )}
          {activeStep === 2 && (
            <div className={style.form_main_div}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                  <FinancialDocumentsForm onClickNext={onClickNext} />
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      </Container>
      <FooterMain />
    </div>
  );
};
export default EquipmentFinance;
