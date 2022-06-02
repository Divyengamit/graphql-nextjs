import React, { useCallback, useContext, useState } from "react";
// import Router, { withRouter, useRouter } from "next/router";
// import { Router } from "react-router";

import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";

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
  // const navigate = useNavigate();
  const router = useRouter();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { registerUser } = useContext(APIContext);

  const cancelHandler = () => {
    router.push("/");
  };

  const nextHandler = ({ requestId }) => {
    console.log("nextHandler requestId ", requestId);
    // router.push("/password", { query: { requestId: requestId } });
    // Router.push({ pathname: "/password", query: { requestId: requestId } });
    router.push({
      pathname: "/password",
      query: { requestId },
    });
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
      console.log("Error Here ", error);
      setErrorMessage(error?.response?.data?.message || error?.message);
      setError(true);
    },
  });

  const onSubmitHandler = useCallback((data) => {
    console.log("onSubmitHandler data", data);
    registerUserMutation.mutate(data);
  });

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};
export default SignupScreen;
// export default withRouter(SignupScreen);
