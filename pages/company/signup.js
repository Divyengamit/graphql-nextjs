import React, { useState } from "react";
import { useRouter } from "next/router";
import { Encryption } from "../../utils/EncryptDecrypt";
import { setLocal } from "../../utils/storage";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BreadCrumb from "../../components/ui/BreadCrumb";
import SignupForm from "../../components/onboarding/company/SignupForm";
import HeroGrid from "../../components/onboarding/HeroGrid";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import InfoAlert from "../../components/ui/InfoAlert";
import { CompanySignUpSchema, SignUpSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
const img = require("../../assets/backgrounds/background_onbording.png");
import { CREATE_COMPANY_PASSWORD } from "@/utils/paths.js";
import PrivacyDialog from "@/components/ui/Privacy";
import { registerCompanyInfo } from "@/store/Slice/companySignupSlice";

const SignupScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const registerState = useSelector(({ companyRegister }) => companyRegister);
  const companyInfo = useSelector(
    ({ companyRegister }) => companyRegister.companyInfo
  );

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isChecked, setIsChecked] = useState({
    agreement: false,
    // privacy: false,
  });
  const [checkedError, setCheckError] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
  const onClickPrivacy = () => setIsOpenPrivacy(true);
  const onClosePrivacy = () => setIsOpenPrivacy(false);

  const cancelHandler = () => {
    router.push("/");
  };

  const nextHandler = (payload) => {
    router.push({ pathname: CREATE_COMPANY_PASSWORD });
    setLocal(
      "tempData",
      Encryption(
        JSON.stringify({
          state: { ...payload },
        }),
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      )
    );
  };

  const onAgreeHandler = (name, value) => {
    let tempIsChecked = {
      ...isChecked,
      [name]: value,
    };
    setIsChecked(tempIsChecked);
    if (!tempIsChecked.companyAgreement) {
      setCheckError(true);
    } else {
      setCheckError(false);
    }
  };

  const methods = useForm({
    resolver: yupResolver(CompanySignUpSchema),
    mode: "onSubmit",
    defaultValues: {
      ...companyInfo,
    },
  });

  const onSubmitHandler = (data) => {
    if (!isChecked.companyAgreement) {
      setCheckError(true);
      return;
    }
    dispatch(
      registerCompanyInfo({
        ...data,
        termConditionConsent: isChecked.companyAgreement,
      })
    ).then((res) => {
      if (!res.error) {
        nextHandler({
          payload: { response: res?.payload, mobileNo: data.mobileNo },
        });
      }
      if (res?.error) {
        setErrorMessage(res?.payload?.message || "Something went wrong!");
        setError(true);
      }
    });
  };

  return (
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Company Registration"]} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <SignupForm
            sx={{ mt: 2, mb: 2 }}
            onCancel={cancelHandler}
            onNext={nextHandler}
            isChecked={isChecked}
            onAgreeHandler={onAgreeHandler}
            checkedError={checkedError}
            onClickPrivacy={onClickPrivacy}
          />
        </form>
      </FormProvider>
      {registerState?.loading && <ProgressIndicator />}
      <InfoAlert
        show={showError}
        title={"Error"}
        body={errorMessage}
        onClose={() => setError(false)}
      />
      {isOpenPrivacy && (
        <PrivacyDialog open={isOpenPrivacy} onClose={onClosePrivacy} />
      )}
    </HeroGrid>
  );
};
export default SignupScreen;
