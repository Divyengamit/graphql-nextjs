import React, { useContext, useState } from "react";
// import { useNavigate, useLocation } from "react-router";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";

import BreadCrumb from "../components/ui/BreadCrumb";
import ProfileForm from "../components/onboarding/ProfileForm";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import HeroGrid from "../components/onboarding/HeroGrid";

import { ProfileSchema } from "../utils/validation";
const img = require("../assets/backgrounds/background_onbording.png");

const CreateProfileScreen = () => {
  // const navigate = useNavigate();
  const router = useRouter();
  const { query } = router;
  const { registerUserInfo } = useContext(APIContext);
  // const { state } = useLocation();

  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const nextHandler = () => {
    // router.push("/document", { state: { requestId: state?.requestId } });
    router.push({
      pathname: "/document",
      query: { requestId: query?.requestId },
    });
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      gender: "male",
      addressType: "PERMANENT",
      state: "Maharashtra",
    },
  });

  const registerUserInfoMutation = useMutation(
    (data) => registerUserInfo(data),
    {
      onSuccess: (data) => {
        nextHandler();
      },
      onError: (error) => {
        setErrorMessage(error?.response?.data?.message || error?.message);
        setError(true);
      },
    }
  );

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
    registerUserInfoMutation.mutate({
      requestId: query?.requestId,
      nameOnCard: data?.cardName,
      address1: data?.addressLine,
      address2: data?.addressLine2,
      city: data?.city,
      pincode: data?.pincode,
      dob: data?.dob,
      gender: data?.gender == "male" ? "M" : "F",
      addressType: getAddressType(data?.addressType),
      state: data?.state,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroGrid img={img}>
        <BreadCrumb items={["Account", "Setup Profile"]} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ProfileForm sx={{ mt: 2, mb: 2 }} />
          </form>
        </FormProvider>
        {registerUserInfoMutation.isLoading && <ProgressIndicator />}
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
