import React, { useCallback, useContext, useState } from "react";
// import Router, { withRouter, useRouter } from "next/router";
// import { Router } from "react-router";

import { useRouter } from "next/router";
import { Decryption, Encryption } from "../utils/EncryptDecrypt";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";
import { NextPageContext, GetServerSideProps } from "next";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BreadCrumb from "../components/ui/BreadCrumb";
import SignupForm from "../components/onboarding/SignupForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import { SignUpSchema } from "../utils/validation";
const img = require("../assets/backgrounds/background_onbording.png");

const SignupScreen = () => {
  console.log(
    "process.env.REACT_APP_ENC_KEY ",
    process.env.NEXT_PUBLIC_PUBLIC_KEY
  );
  // const navigate = useNavigate();
  const router = useRouter();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { registerUser } = useContext(APIContext);

  const cancelHandler = () => {
    router.push("/");
  };

  const nextHandler = ({ requestId }) => {
    // router.push("/password", { state: { requestId: requestId } });

    // router.push(
    //   { pathname: "/password", query: { requestId: requestId } },
    //   "/password"
    // );
    router.push({ pathname: "/password" });
    localStorage.setItem(
      process.env.REACT_APP_ENC_KEY,
      Encryption({
        state: {
          requestId,
        },
      })
    );

    // router.push({
    //   pathname: "/password",
    //   query: { requestId },
    //   as: "/password",
    // });
  };

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: "onSubmit",
  });

  const registerUserMutation = useMutation((data) => registerUser(data), {
    onSuccess: (data) => {
      // methods.reset(methods.getValues());
      nextHandler(data?.data);
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message || error?.message);
      setError(true);
    },
  });

  const onSubmitHandler = useCallback((data) => {
    registerUserMutation.mutate(data);
  });

  return (
    // <ThemeProvider theme={theme}>
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Customer Registration"]} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <SignupForm
            sx={{ mt: 2, mb: 2 }}
            onCancel={cancelHandler}
            onNext={nextHandler}
          />
        </form>
      </FormProvider>
      {registerUserMutation.isLoading && <ProgressIndicator />}
      <InfoAlert
        show={showError}
        title="Error"
        body={errorMessage}
        onClose={() => setError(false)}
      />
    </HeroGrid>
    // </ThemeProvider>
  );
};
export default SignupScreen;
// export default withRouter(SignupScreen);
