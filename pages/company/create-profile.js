import React, { useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import { getLocal } from "../../utils/storage";
import { Decryption } from "../../utils/EncryptDecrypt";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BreadCrumb from "../../components/ui/BreadCrumb";
import ProfileForm from "../../components/onboarding/company/ProfileForm";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import InfoAlert from "../../components/ui/InfoAlert";
import HeroGrid from "../../components/onboarding/HeroGrid";

import { CompanyProfileSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { registerUserInfo } from "../../store/Slice/registerSlice";
import { CREATE_COMPANY_OTP } from "@/utils/paths";
import { addCompanyAddress } from "@/store/Slice/companySignupSlice";
const img = require("@/assets/backgrounds/background_onbording.png");

const CreateProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const routerParams = getLocal("tempData");
  const registerState = useSelector(({ register }) => register);
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const companyInfo = useSelector(({ companyRegister }) => companyRegister);

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const nextHandler = () => {
    router.push({ pathname: CREATE_COMPANY_OTP });
  };

  const methods = useForm({
    resolver: yupResolver(CompanyProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      address1: companyInfo?.address1 || "",
      address2: companyInfo?.address2 || "",
      city: companyInfo?.city || "",
      state: companyInfo?.state || "Maharashtra",
      pincode: companyInfo?.pincode || "",
    },
  });

  // const getAddressType = (type) => {
  //   switch (type) {
  //     case "PERMANENT":
  //       return "PERMANENT_ADDRESS";
  //     case "BUSINESS":
  //       return "BUSINESS_ADDRESS";
  //     default:
  //       return "DELIVERY_ADDRESS";
  //   }
  // };

  const onSubmit = (data) => {
    const id = urlParamsData?.state?.payload?.response?.requestId;
    let tempForm = {
      requestId: id,
      address1: data?.address1,
      address2: data?.address2,
      city: data?.city,
      pincode: data?.pincode,
      state: data?.state,
    };
    dispatch(addCompanyAddress(tempForm)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.message || "Something went wrong!");
      }
      if (!res.error) {
        // console.log("addCompanyAddress res", res);
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
