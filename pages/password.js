import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Decryption } from "../utils/EncryptDecrypt";
import { getLocal } from "../utils/storage";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BreadCrumb from "../components/ui/BreadCrumb";
import PasswordForm from "../components/onboarding/PasswordForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import { createPasswordSchema, resetPasswordSchema } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserPassword,
  resetPassword,
} from "../store/Slice/registerSlice";
const img = require("../assets/backgrounds/background_onbording.png");

const PasswordScreen = () => {
  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  console.log("urlParamsData", urlParamsData);
  const router = useRouter();
  const dispatch = useDispatch();
  const registerState = useSelector(({ register }) => register);
  // const pwdState = useSelector(({ register }) => register.createPassword);
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const cancelHandler = useCallback(() => {
    router.push(-2);
  });

  const nextHandler = () => {
    router.push({
      pathname: "/create-profile",
    });
  };
  const onCloseInfo = () => {
    setError(false);
    setShowSuccess(false);
  };

  const methods = useForm({
    resolver: urlParamsData?.state?.requestType
      ? yupResolver(resetPasswordSchema)
      : yupResolver(createPasswordSchema),
    mode: "onSubmit",
  });

  const handleCreatePassword = (data) => {
    let tempForm = {
      requestId: urlParamsData?.state?.requestId,
      emailAddress: data?.email,
      password: data?.password,
      passwordConfirm: data?.confirmPassword,
    };
    console.log("handleCreatePassword", tempForm);
    dispatch(createUserPassword(tempForm)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        nextHandler();
      }
    });
  };
  const onResetPassword = (data) => {
    dispatch(resetPassword(data)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        setShowSuccess(true);
        setSuccessMessage("Password Reset Success , Please Login ");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    });
  };

  // const resetPasswordMutation = useMutation((data) => resetPassword(data), {
  //   onSuccess: (data) => {
  //     setShowSuccess(true);
  //     setSuccessMessage("Password Reset Success , Please Login ");
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 2000);
  //   },
  //   onError: (error) => {
  //     setError(true);
  //     setErrorMessage(error?.response?.data?.message || error?.message);
  //   },
  // });

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
        // resetPasswordMutation.mutate({
        //   emailAddress: urlParamsData?.state?.email,
        //   password: password,
        //   passwordConfirm: passwordConfirm,
        // });
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
