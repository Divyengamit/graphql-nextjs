import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth";
import axios from "axios";
import style from "../../styles/Redirect.module.css";

const Redirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (router.query.token) {
      const { token } = router.query;
      if (!token) return router.push("/");
      const fetchData = async () => {
        let { data: tokenVerification } = await axios({
          method: "POST",
          url: `https://ppi-test.canopi.in/canopi-payments/registration/v1/verify-redirect-token`,
          data: {
            access_token: token,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!tokenVerification) return router.push("/");
        //   get access token
        let { data } = await axios({
          method: "POST",
          url: `https://ppi-test.canopi.in/canopi-payments/registration/v1/authenticate-redirect`,
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
          router.push("/home");
        }
      };
      fetchData().catch((error) => {
        router.push("/");
      });
    }
  }, [router.query.token]);

  return (
    <>
      <div className={style.loading}></div>
    </>
  );
};
export default Redirect;
