import React, { useCallback, useContext, useState } from "react";
// import { useNavigate, useLocation } from "react-router";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BreadCrumb from "../components/ui/BreadCrumb";
import DocumentForm from "../components/onboarding/DocumentForm";
import HeroGrid from "../components/onboarding/HeroGrid";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import InfoAlert from "../components/ui/InfoAlert";

import { DocumentSchema } from "../utils/validation";
const img = require("../assets/backgrounds/background_onbording.png");

const DocumentScreen = () => {
  // const navigate = useNavigate();
  // const { state } = useLocation();
  const router = useRouter();
  const { query } = router;

  const [file, setFile] = useState();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isChecked, setisChecked] = useState(false);
  const [checkedError, setcheckError] = useState(false);

  const { uploadDoc } = useContext(APIContext);

  const nextHandler = ({ mobile, sessionId }) => {
    // navigate("/otp", {
    //   state: { mobile, sessionId, requestId: state?.requestId },
    // });
    router.push({
      pathname: "/otp",
      query: { mobile, sessionId, requestId: query?.requestId },
    });
  };

  const methods = useForm({
    resolver: yupResolver(DocumentSchema),
    mode: "onSubmit",
    defaultValues: {
      docType: "PAN",
    },
  });

  const uploadMutation = useMutation((data) => uploadDoc(data), {
    onSuccess: (data) => {
      const userData = data?.data;
      nextHandler(userData);
    },
    onError: (error) => {
      setError(true);
      setErrorMessage(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data) => {
    if (!isChecked) {
      setcheckError(true);
    } else {
      setcheckError(false);
      uploadMutation.mutate({
        requestId: query?.requestId,
        docType: data?.docType,
        docNumber: data?.docNumber,
        docFile: data?.docImage,
      });
    }
  };

  const onError = (error) => {
    if (!isChecked) {
      setcheckError(true);
    } else {
      setcheckError(false);
    }
  };

  const onAgreeHandler = useCallback(() => {
    setisChecked((prev) => !prev);
    if (!isChecked) {
      setcheckError(false);
    } else {
      setcheckError(true);
    }
  }, [isChecked, checkedError]);

  return (
    // <ThemeProvider theme={theme}>
    <HeroGrid img={img}>
      <BreadCrumb items={["Account", "Complete Setup"]} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <DocumentForm
            sx={{ mt: 2, mb: 2 }}
            onFileSelect={setFile}
            isAgree={isChecked}
            onAgreeChecked={onAgreeHandler}
            isCheckedcheckedError={checkedError}
          />
        </form>
      </FormProvider>
      {uploadMutation.isLoading && <ProgressIndicator />}
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

export default DocumentScreen;
