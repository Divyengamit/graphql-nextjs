import { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import style from "../../../styles/EquipmentForm.module.css";
import { getLocal } from "../../../utils/storage";
import { Decryption } from "../../../utils/EncryptDecrypt";
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
import { useDispatch, useSelector } from "react-redux";
import {
  applyEquipmentFinance,
  setEquipmentDetails,
} from "@/store/Slice/equipmentSlice";
import ConfirmAlert from "@/components/ui/ConfirmAlert";
import { getLayout } from "@/components/layout/SiteLayout";
const steps = ["Professional Details", "Loan Details", "Upload Documents"];

const EquipmentFinance = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStep, setActivestep] = useState(0);
  const equipmentData = useSelector(({ equipment }) => equipment.equipmentData);
  const eligibilityData = useSelector(
    ({ equipment }) => equipment.eligibilityData
  );

  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const methodsProfessional = useForm({
    resolver: yupResolver(ProfessionalSchema),
    mode: "onSubmit",
    defaultValues: {
      ...equipmentData,
    },
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState();
  const [confirmMessage, setConfirmMessage] = useState();

  const { reset, control, watch, formState, handleSubmit, setValue } =
    methodsProfessional;
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
    const qualificationYear = new Date(data?.qualificationYear).getFullYear();
    dispatch(
      setEquipmentDetails({
        ...equipmentData,
        universityName: data?.universityName,
        qualificationYear: qualificationYear,
        registrationNo: data.registrationNo,
        stateMedicalCouncil: data?.stateMedicalCouncil,
        experience: data?.experience,
        hospitalName: data?.hospitalName,
        hospitalVintage: data?.hospitalVintage,
        businessStatus: data?.businessStatus,
        degreeCertificateFile: data?.degreeCertificateFile,
      })
    );
    onClickNext();
  };
  const onSubmitLoanDetailsHandler = (data) => {
    dispatch(
      setEquipmentDetails({
        ...equipmentData,
        loanAmount: data.loanAmount,
        performaInvoiceFile: data.performaInvoiceFile,
      })
    );
    onClickNext();
  };
  const onSubmitFinancialDocumentsHandler = (data) => {
    if (equipmentData) {
      let tempForm = {
        profileType: eligibilityData?.profileType,
        highestQualification: eligibilityData?.highestQualification,
        annualIncome: eligibilityData?.annualIncome,
        entityId: userID?.state?.userId,
        experience: equipmentData?.experience,
        universityName: equipmentData?.universityName,
        qualificationYear: equipmentData?.qualificationYear,
        registrationNo: equipmentData?.registrationNo,
        stateMedicalCouncil: equipmentData?.stateMedicalCouncil,
        hospitalName: equipmentData?.hospitalName,
        hospitalVintage: equipmentData?.hospitalVintage,
        loanAmount: equipmentData?.loanAmount,
        businessStatus: equipmentData?.businessStatus,
        degreeCertificateFile: equipmentData?.degreeCertificateFile,
        performaInvoiceFile: equipmentData?.performaInvoiceFile,
        addressProof: data?.addressProof,
        bankStmtFile: data?.bankStmtFile,
        itrFile: data?.itrFile,
        ownershipProofFile: data?.ownershipProofFile,
      };

      dispatch(applyEquipmentFinance(tempForm)).then((res) => {
        if (res.error) {
          if (res.error.message === "Rejected") {
            setShowConfirm(true);
            setConfirmTitle("Sorry");
            setConfirmMessage("Not Acceptable, try to next time");
          }
        }
        // if (!res.error) {
        //   console.log("res", res.error);
        // }
      });
    }
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
  const onBackConfirm = () => {
    if (activeStep === 2) {
      setShowConfirm(false);
      router.push({ pathname: "/home" });
    }
  };
  return (
    <>
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
      <ConfirmAlert
        show={showConfirm}
        title={confirmTitle}
        body={confirmMessage}
        buttonConfirmText="Ok"
        buttonCancelText="Cancel"
        onClose={() => setShowConfirm(false)}
        onConfirm={onBackConfirm}
      />
    </>
  );
};

EquipmentFinance.getLayout = getLayout;
export default EquipmentFinance;
