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
import {
  FinancialDocumentSchema,
  LoanDetailsSchema,
  ProfessionalSchema,
} from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
const steps = ["Professional Details", "Loan Details", "Upload Documents"];
const sx = { mt: 2, mb: 2, mr: "auto", ml: "auto" };

const EquipmentFinance = () => {
  const router = useRouter();
  const [activeStep, setActivestep] = useState(0);
  const equipmentData = useSelector(({ equipment }) => equipment.equipmentData);
  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const methodsProfessional = useForm({
    resolver: yupResolver(ProfessionalSchema),
    mode: "onSubmit",
    defaultValues: {
      ...equipmentData,
    },
  });
  const { reset, control, watch, formState, handleSubmit, setValue } =
    methodsProfessional;
  // const checkData = methodsProfessional.watch();
  // console.log("checkData", checkData);
  const methodsLoanDetails = useForm({
    resolver: yupResolver(LoanDetailsSchema),
    mode: "onSubmit",
    defaultValues: {
      ...equipmentData,
    },
  });
  const methodsFinancialDocuments = useForm({
    resolver: yupResolver(FinancialDocumentSchema),
    mode: "onSubmit",
    defaultValues: {
      ...equipmentData,
    },
  });

  const onSubmitProfessionalHandler = (data) => {
    console.log("onSubmitProfessionalHandler data", data);
    onClickNext();
  };
  const onSubmitLoanDetailsHandler = (data) => {
    console.log("onSubmitLoanDetailsHandler data", data);
    onClickNext();
  };
  const onSubmitFinancialDocumentsHandler = (data) => {
    console.log("onSubmitFinancialDocumentsHandler data", data);
    onClickNext();
  };

  const onClickNext = () => {
    setActivestep(activeStep + 1);
    if (activeStep === 2) {
      router.push({ pathname: "/home" });
    }
  };
  const onBack = () => {
    setActivestep(activeStep - 1);
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
              <FormProvider {...methodsProfessional}>
                <form
                  onSubmit={methodsProfessional.handleSubmit(
                    onSubmitProfessionalHandler
                  )}
                >
                  <ProfessionalDetailsForm
                    watch={watch}
                    setValue={setValue}
                    formState={formState}
                  />
                </form>
              </FormProvider>
            </div>
          )}
          {activeStep === 1 && (
            <div className={style.form_main_div}>
              <FormProvider {...methodsLoanDetails}>
                <form
                  onSubmit={methodsLoanDetails.handleSubmit(
                    onSubmitLoanDetailsHandler
                  )}
                >
                  <LoanDetailsForm onBack={onBack} />
                </form>
              </FormProvider>
            </div>
          )}
          {activeStep === 2 && (
            <div className={style.form_main_div}>
              <FormProvider {...methodsFinancialDocuments}>
                <form
                  onSubmit={methodsFinancialDocuments.handleSubmit(
                    onSubmitFinancialDocumentsHandler
                  )}
                >
                  <FinancialDocumentsForm
                    // onClickNext={onClickNext}
                    onBack={onBack}
                  />
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
