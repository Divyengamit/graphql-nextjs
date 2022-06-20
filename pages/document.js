import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
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
import { useDispatch, useSelector } from "react-redux";
import { uploadDoc } from "../store/Slice/registerSlice";
const img = require("../assets/backgrounds/background_onbording.png");

const DocumentScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const registerState = useSelector(({ register }) => register);
  const routerParams = getLocal("tempData");
  const urlParamsData = JSON.parse(
    Decryption(routerParams, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  const [file, setFile] = useState();
  const [showError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [checkedError, setCheckError] = useState(false);

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

  const onSubmit = async (data) => {
    const tempForm = {
      requestId: urlParamsData?.state?.requestId,
      docType: data?.docType,
      docNumber: data?.docNumber,
      docFile: data?.docImage,
    };
    dispatch(uploadDoc(tempForm)).then((res) => {
      if (res.error) {
        setError(true);
        setErrorMessage(res?.payload?.data?.message || res?.error?.message);
      }
      if (!res.error) {
        nextHandler(res?.payload);
      }
    });
  };

  const onError = () => {
    if (!isChecked) {
      setCheckError(true);
    } else {
      setCheckError(false);
    }
  };

  const onAgreeHandler = useCallback(() => {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setCheckError(false);
    } else {
      setCheckError(true);
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
      {registerState?.loading && <ProgressIndicator />}
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
