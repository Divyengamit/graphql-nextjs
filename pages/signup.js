import React, { useState } from "react";
import { useRouter } from "next/router";
import { Encryption } from "../utils/EncryptDecrypt";
import { setLocal } from "../utils/storage";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BreadCrumb from "../components/ui/BreadCrumb";
import SignupForm from "../components/onboarding/SignupForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import { SignUpSchema } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
const img = require("../assets/backgrounds/background_onbording.png");
import { CREATE_PASSWORD } from "@/utils/paths.js";
import PrivacyDialog from "@/components/ui/Privacy";
import { CUSTOMER_REGISTRATION_STEP1 } from "@/graphql/register";
import { useMutation } from "@apollo/client";

const SignupScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const registerState = useSelector(({ register }) => register);
  const userInfo = useSelector(({ register }) => register.userInfo);

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isChecked, setIsChecked] = useState({
    agreement: false,
    privacy: false,
  });
  const [checkedError, setCheckError] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
  const onClickPrivacy = () => setIsOpenPrivacy(true);
  const onClosePrivacy = () => setIsOpenPrivacy(false);

  const cancelHandler = () => {
    router.push("/");
  };

  const nextHandler = (payload) => {
    router.push({ pathname: CREATE_PASSWORD });
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
    if (!tempIsChecked.agreement || !tempIsChecked.privacy) {
      setCheckError(true);
    } else {
      setCheckError(false);
    }
  };

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: "onSubmit",
    defaultValues: {
      ...userInfo,
    },
  });

  const [registerUserQL] = useMutation(CUSTOMER_REGISTRATION_STEP1);

  const onSubmitHandler = (data) => {
    if (!isChecked.agreement || !isChecked.privacy) {
      setCheckError(true);
      return;
    }
    registerUserQL({
      variables: {
        ...data,
        termConditionConsent: isChecked.agreement,
      },
    })
      .then((res) => {
        const resData = res?.data?.createUserStepBasicInfo || null;
        if (resData && resData?.status === 200) {
          nextHandler(resData);
        }
        if (res?.error) {
          setErrorMessage(res?.payload?.message || "Something went wrong!");
          setError(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    // dispatch(
    //   registerUser({ ...data, termConditionConsent: isChecked.agreement })
    // ).then((res) => {
    //   if (!res.error) {
    //     nextHandler(res?.payload?.data);
    //   }
    //   if (res?.error) {
    //     setErrorMessage(res?.payload?.message || "Something went wrong!");
    //     setError(true);
    //   }
    // });
  };

  return (
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Customer Registration"]} />
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
