import React, { useCallback, useContext, useState } from "react";
// import { useNavigate, useLocation } from "react-router";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { APIContext } from "../services/api-provider";
import { getLocal, setLocal } from "../utils/storage";
import { Decryption, Encryption } from "../utils/EncryptDecrypt";

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
  const routerParams = getLocal("tempData");
  const [urlParamsData, setUrlParamsData] = useState(
    JSON.parse(
      Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
    )
  );
  const router = useRouter();

  const [file, setFile] = useState();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isChecked, setisChecked] = useState(false);
  const [checkedError, setcheckError] = useState(false);

  const { uploadDoc } = useContext(APIContext);

  const nextHandler = ({ mobile, sessionId }) => {
    router.push({
      pathname: "/otp",
    });
    setLocal(
      "tempData",
      Encryption(
        JSON.stringify({
          state: {
            requestId: urlParamsData?.state?.requestId,
            sessionId: sessionId,
            mobile: mobile,
          },
        }),
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      )
    );
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
        requestId: urlParamsData?.state?.requestId,
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
  );
};

export default DocumentScreen;
