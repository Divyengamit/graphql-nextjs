import { fetchDashboardDetail } from "@/store/dashboardSlice";
import { getUserID } from "@/utils/EncryptDecrypt";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterMain from "../navigation/FooterMain";
import MainAppBar from "../navigation/MainAppBar";
import FlexBox from "../ui/FlexBox";

const SiteLayout = ({ children }) => {
  const dispatch = useDispatch();
  const UserID = getUserID();

  useEffect(() => {
    if (UserID) {
      dispatch(fetchDashboardDetail(UserID));
    }
  }, [UserID]);

  const userData = useSelector(({ dashboard }) => dashboard.data);
  if (!userData) return null;

  return (
    <FlexBox sx={{ minHeight: "100vh" }}>
      <MainAppBar userData={userData} />
      <Container maxWidth="xl" className="custom-container">
        {children}
      </Container>
      <FooterMain />
    </FlexBox>
  );
};

export const getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default SiteLayout;
