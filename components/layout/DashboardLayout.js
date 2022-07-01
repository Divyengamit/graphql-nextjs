import { useEffect } from "react";
// import { useRouter } from "next/router";
import {
  fetchAdminDashboardDetails,
  fetchDashboardDetail,
} from "@/store/dashboardSlice";
import { getUserID } from "@/utils/EncryptDecrypt";
// import { HOME } from "@/utils/paths";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import AdminTabBar from "../admin/AdminTabbar";
import MainAppBar from "../navigation/MainAppBar";
import TabBar from "../navigation/TabBar";
import FlexBox from "../ui/FlexBox";
import FooterMain from "../navigation/FooterMain";

const DashboardLayout = ({ children }) => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const UserID = getUserID();
  const { role } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (UserID) {
      if (role.toLowerCase() === "customer") {
        dispatch(fetchDashboardDetail(UserID)); // user/CUSTOMER
      }
      if (role.toLowerCase() === "superadmin") {
        dispatch(fetchAdminDashboardDetails(UserID)); // ADMIN
      }
    }
  }, [UserID]);

  const userData = useSelector(({ dashboard }) => dashboard.data);

  if (!userData) return null;
  if (!role) return null;

  return (
    <FlexBox sx={{ minHeight: "100vh" }}>
      <MainAppBar userData={userData} />

      <Container maxWidth="xl" className="custom-container">
        {role?.toUpperCase() === "CUSTOMER" && <TabBar userData={userData} />}
        {role?.toUpperCase() === "SUPERADMIN" && <AdminTabBar />}
        {children}
      </Container>
      <FooterMain />
    </FlexBox>
  );
};

export const getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardLayout;
