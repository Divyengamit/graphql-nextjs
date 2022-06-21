import FooterMain from "@/components/navigation/FooterMain";
import MainAppBar from "@/components/navigation/MainAppBar";
import FlexBox from "@/components/ui/FlexBox";
import { fetchDashboardDetail } from "@/store/dashboardSlice";
import { Decryption } from "@/utils/EncryptDecrypt";
import { getLocal } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";
import AdminTabBar from "@/components/admin/AdminTabbar";
import Myprofile from "@/components/profile/Myprofile";

const MyProfile = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );

  useEffect(() => {
    if (userID?.state?.userId) {
      dispatch(fetchDashboardDetail(userID?.state?.userId)).then((res) => {
        if (!res.error) {
          setData(res.payload);
        }
      });
    }
  }, [userID?.state?.userId]);

  return (
    <FlexBox sx={{ minHeight: "100vh" }}>
      <MainAppBar userData={data} />
      <Container maxWidth="xl" className="custom-container">
        <AdminTabBar />
        <Myprofile userData={data} />
      </Container>
      <FooterMain />
    </FlexBox>
  );
};
export default MyProfile;
