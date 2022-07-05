import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Decryption, Encryption } from "../../utils/EncryptDecrypt";
import { getLocal, setLocal } from "../../utils/storage";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BreadCrumb from "../../components/ui/BreadCrumb";
import PasswordForm from "../../components/onboarding/company/PasswordForm";
import HeroGrid from "../../components/onboarding/HeroGrid";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import InfoAlert from "../../components/ui/InfoAlert";
import {
  createCompanyPasswordSchema,
  resetPasswordSchema,
} from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserPassword,
  resetPassword,
} from "../../store/Slice/registerSlice";
import { CREATE_COMPANY_PROFILE } from "@/utils/paths";
import { registerCompanyCredentials } from "@/store/Slice/companySignupSlice";
const img = require("@/assets/backgrounds/background_onbording.png");

const PasswordScreen = () => {
  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const companyInfo = useSelector(({ companyRegister }) => companyRegister);
  const router = useRouter();
  const dispatch = useDispatch();
  const registerState = useSelector(({ register }) => register);

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const cancelHandler = useCallback(() => {
    router.push(-2);
  });

  const nextHandler = () => {
    router.push({
      pathname: CREATE_COMPANY_PROFILE,
    });
    // setLocal(
    //   "tempData",
    //   Encryption(
    //     JSON.stringify({
    //       state: { ...payload },
    //     }),
    //     process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
    //   )
    // );
  };
  const onCloseInfo = () => {
    setError(false);
    setShowSuccess(false);
  };

  const methods = useForm({
    resolver: urlParamsData?.state?.requestType
      ? yupResolver(resetPasswordSchema)
      : yupResolver(createCompanyPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      emailAddress: companyInfo?.emailAddress || "",
    },
  });

  const handleCreatePassword = (data) => {
    const id = urlParamsData?.state?.payload?.response?.requestId;
    let tempForm = {
      requestId: id,
      emailAddress: data?.emailAddress,
      password: data?.password,
      passwordConfirm: data?.confirmPassword,
    };
    dispatch(registerCompanyCredentials(tempForm)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
      if (!res.error) {
        nextHandler();
      }
    });
  };
  const onResetPassword = (data) => {
    // dispatch(resetPassword(data)).then((res) => {
    //   if (res.error) {
    //     setError(true);
    //     setErrorMessage(res?.payload?.message || "Something went wrong!");
    //   }
    //   if (!res.error) {
    //     setShowSuccess(true);
    //     setSuccessMessage("Password Reset Success , Please Login ");
    //     setTimeout(() => {
    //       router.push("/");
    //     }, 2000);
    //   }
    // });
  };

  const onSubmit = async (data) => {
    if (urlParamsData?.state?.requestType === "RESET") {
      await methods.trigger("confirmPassword");
      const password = methods.getValues("password");
      const passwordConfirm = methods.getValues("confirmPassword");
      const fieldState = methods.getFieldState("confirmPassword");
      if (!fieldState.error) {
        await onResetPassword({
          emailAddress: urlParamsData?.state?.email,
          password: password,
          passwordConfirm: passwordConfirm,
        });
      }
    } else {
      await handleCreatePassword(data);
    }
  };

  return (
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Create Password"]} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <PasswordForm
            sx={{ mt: 2, mb: 2 }}
            onCancel={cancelHandler}
            requestType={urlParamsData?.state?.requestType}
          />
        </form>
      </FormProvider>
      {registerState.loading && <ProgressIndicator />}
      <InfoAlert
        show={showError || showSuccess}
        title={!showSuccess ? "Error" : "Success"}
        body={!showSuccess ? errorMessage : successMessage}
        onClose={() => onCloseInfo()}
      />
    </HeroGrid>
  );
};

export default PasswordScreen;