import React, { useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { getLocal } from "../utils/storage";
import { Decryption } from "../utils/EncryptDecrypt";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BreadCrumb from "../components/ui/BreadCrumb";
import ProfileForm from "../components/onboarding/ProfileForm";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import HeroGrid from "../components/onboarding/HeroGrid";

import { ProfileSchema } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { registerUserInfo } from "../store/Slice/registerSlice";
import { DOCUMENT } from "@/utils/paths";
const img = require("../assets/backgrounds/background_onbording.png");

const CreateProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const routerParams = getLocal("tempData");
  const registerState = useSelector(({ register }) => register);
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const nextHandler = () => {
    router.push({ pathname: DOCUMENT });
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      gender: "male",
      addressType: "PERMANENT",
      state: "Maharashtra",
      cardName: urlParamsData?.state?.nameOnCard
        ? urlParamsData?.state?.nameOnCard
        : "",
    },
  });

  const getAddressType = (type) => {
    switch (type) {
      case "PERMANENT":
        return "PERMANENT_ADDRESS";
      case "BUSINESS":
        return "BUSINESS_ADDRESS";
      default:
        return "DELIVERY_ADDRESS";
    }
  };

  const onSubmit = (data) => {
    let tempForm = {
      requestId: urlParamsData?.state?.requestId,
      nameOnCard: data?.cardName,
      address1: data?.addressLine,
      address2: data?.addressLine2,
      city: data?.city,
      pincode: data?.pincode,
      // dob: data?.dob,
      gender: data?.gender == "male" ? "M" : "F",
      addressType: getAddressType(data?.addressType),
      state: data?.state,
    };
    dispatch(registerUserInfo(tempForm)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        nextHandler();
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroGrid img={img}>
        <BreadCrumb items={["Account", "Setup Profile"]} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ProfileForm sx={{ mt: 2, mb: 2 }} methods={methods} />
          </form>
        </FormProvider>
        {registerState.loading && <ProgressIndicator />}
        <InfoAlert
          show={showError}
          title="Error"
          body={errorMessage}
          onClose={() => setError(false)}
        />
      </HeroGrid>
    </ThemeProvider>
  );
};

export default CreateProfileScreen;
