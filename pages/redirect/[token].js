import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth";
import axios from "axios";
import style from "../../styles/Redirect.module.css";

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
        if (!tokenVerification) return router.push("/");
        if (tokenVerification.isVaild == false) {
          // add the data to the signup page
          tokenVerification.userData;
          dispatch(setRegisterData({}));
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
        router.push("/");
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
