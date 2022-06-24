import { fetchDashboardDetail } from "@/store/dashboardSlice";
import { getUserID } from "@/utils/EncryptDecrypt";
import { HOME } from "@/utils/paths";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import Home from "pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTabBar from "../admin/AdminTabbar";
import MainAppBar from "../navigation/MainAppBar";
import TabBar from "../navigation/TabBar";
import FlexBox from "../ui/FlexBox";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const UserID = getUserID();
  const { role } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (UserID) {
      dispatch(fetchDashboardDetail(UserID));
    }
  }, [dispatch, UserID]);

  const userData = useSelector(({ dashboard }) => dashboard.data);
  const handleDashboardClick = () => {
    router.push({
      pathname: HOME,
    });
  };
  if (!userData) return null;

  return (
    <FlexBox sx={{ minHeight: "100vh" }}>
      <MainAppBar userData={userData} />

      <Container maxWidth="xl" className="custom-container">
        {role.toUpperCase() === "CUSTOMER" && (
          <TabBar
            userData={userData}
            // showDashboard={showDashboard}
            onDashboardClick={handleDashboardClick}
            // onTransactionClick={handleTransactionsClick}
            // onApplyClick={handleApplyClick}
            showDashboard={true}
            onTransactionClick={() => {}}
            onApplyClick={() => {}}
          />
        )}
        {role.toUpperCase() === "SUPERADMIN" && <AdminTabBar />}
        {children}
      </Container>
    </FlexBox>
  );
};
export default Layout;
