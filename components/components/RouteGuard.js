import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLocal, removeLocal } from "../../utils/storage";
import { decode } from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth/loginSlice";
import { HOME, MYPROFILE } from "@/utils/paths";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { role } = useSelector(({ auth }) => auth);
  const [authorized, setAuthorized] = useState(false);

  function isAuthenticated() {
    const token = getLocal("access_token");
    try {
      const { exp } = decode(token);
      console.log("exp", exp);
      if (Date.now() >= exp * 1000) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (router.isReady) {
      // on initial load - run auth check
      authCheck(router.asPath);

      // on route change start - hide page content by setting authorized to false
      const hideContent = () => setAuthorized(false);
      router.events.on("routeChangeStart", hideContent);

      // on route change complete - run auth check
      router.events.on("routeChangeComplete", authCheck);

      // unsubscribe from events in useEffect return function
      return () => {
        router.events.off("routeChangeStart", hideContent);
        router.events.off("routeChangeComplete", authCheck);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      "/login",
      "/signup",
      "/password",
      "/create-profile",
      "/document",
      "/otp",
    ];
    const path = url.split("?")[0];
    if (role?.toLowerCase() !== "customer" && path === MYPROFILE) {
      return router.push({
        pathname: HOME,
      });
    }

    if (path.includes("redirect") && !publicPaths.includes(path)) {
      setAuthorized(true);
      return;
    }

    if (!isAuthenticated() && !publicPaths.includes(path)) {
      setAuthorized(false);
      removeLocal("access_token");
      removeLocal("userId");
      removeLocal("tempData");
      dispatch(logout());

      return router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
      return;
    }
  }

  return authorized && children;
}
