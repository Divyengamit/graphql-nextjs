import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth";
import axios from "axios";
import style from "../../styles/Redirect.module.css";
import { setRegisterData } from "../../store/Slice/registerSlice";

export default function Redirect() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      if (!token) return router.push("/");
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

        console.log("tokenVerification", tokenVerification);
        if (!tokenVerification) return router.push("/signup");
        if (tokenVerification.isValid == false) {
          // add the data to the signup page
          dispatch(
            setRegisterData({
              firstName: tokenVerification.userData.fullName,
              mobileNo: tokenVerification.userData.mobileNo,
              dob: tokenVerification.userData.dob,
            })
          );
          return router.push("/signup");
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
          dispatch(
            setUser({
              user: tokenVerification?.entityId,
              token: data?.access_token,
              refreshToken: data?.expires_in,
            })
          );
          router.push({ pathname: "/home" });
        }
      };
      fetchData().catch((err) => {
        console.log(err);
        // router.push("/signup");
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
