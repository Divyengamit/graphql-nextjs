import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/loginSlice";
import axios from "axios";
import style from "../../styles/Redirect.module.css";
import { setRegisterData } from "../../store/Slice/registerSlice";
import { setLocal } from "../../utils/storage";
import { Encryption } from "@/utils/EncryptDecrypt";
import { setCompanyRegisterData } from "@/store/Slice/companySignupSlice";

export default function Redirect() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      if (!token) return router.push("/login");
      const fetchData = async () => {
        let { data: tokenVerification } = await axios({
          method: "POST",
          url: process.env.NEXT_PUBLIC_VERIFY_REDIRECT_TOKEN_URL,
          data: {
            access_token: token,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!tokenVerification) return router.push("/login");
        if (tokenVerification.isValid == false) {
          // add the data to the signup page
          dispatch(
            setRegisterData({
              firstName: tokenVerification.userData.firstName,
              lastName: tokenVerification.userData.lastName,
              mobileNo: tokenVerification.userData.mobileNo,
              middleName: tokenVerification.userData.middleName,
              companyName: tokenVerification.userData.companyName,
              emailAddress: tokenVerification.userData.emailAddress,
              dob: tokenVerification.userData.dob,
            })
          );
          dispatch(
            setCompanyRegisterData({
              firstName: tokenVerification.userData.firstName,
              lastName: tokenVerification.userData.lastName,
              mobileNo: tokenVerification.userData.mobileNo,
              companyName: tokenVerification.userData.companyName,
              emailAddress: tokenVerification.userData.emailAddress,
              address1: tokenVerification.userData.address1,
              address2: tokenVerification.userData.address2,
              city: tokenVerification.userData.city,
              state: tokenVerification.userData.state,
              pincode: tokenVerification.userData.pincode,
            })
          );

          return router.push("/login");
        }
        //   get access token
        let { data } = await axios({
          method: "POST",
          url: process.env.NEXT_PUBLIC_AUTHENTICATE_REDIRECT,
          data: {
            tenantId: tokenVerification.tenantId,
            tenant_secret_key: tokenVerification.tenant_secret_key,
            entityId: tokenVerification.entityId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (data.access_token) {
          setLocal("access_token", data.access_token);
          setLocal(
            "userId",
            Encryption(
              JSON.stringify({
                state: {
                  userId: tokenVerification?.entityId,
                },
              }),
              process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
            )
          );
          dispatch(
            setUser({
              role: data?.role,
              token: data?.access_token,
              refreshToken: data?.expires_in,
            })
          );
          return router.push({ pathname: "/home" });
        }
      };
      fetchData().catch(() => {
        return router.push("/login");
      });
    }
  }, [router.isReady]);

  return (
    <>
      <container>
        <div className={style.loading}></div>
      </container>
    </>
  );
}
