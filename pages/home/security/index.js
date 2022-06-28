import FooterMain from "@/components/navigation/FooterMain";
import MainAppBar from "@/components/navigation/MainAppBar";
import TabBar from "@/components/navigation/TabBar";
import Security from "@/components/security/Security";
import FlexBox from "@/components/ui/FlexBox";
import { fetchDashboardDetail } from "@/store/dashboardSlice";
import { Decryption } from "@/utils/EncryptDecrypt";
import { ACTIVITY, HOME, TRANSACTIONS } from "@/utils/paths";
import { getLocal } from "@/utils/storage";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SecurityPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const userId = getLocal("userId");
  const userID = JSON.parse(
    Decryption(userId, process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    if (userID?.state?.userId) {
      dispatch(fetchDashboardDetail(userID?.state?.userId)).then((res) => {
        if (!res.error) {
          setData(res.payload);
        }
      });
    }
  }, [userID?.state?.userId]);

  const [currentTab, setCurrentTab] = useState(HOME);
  const handleTransactionsClick = () => {
    setCurrentTab(TRANSACTIONS);
    router.push({
      pathname: HOME,
    });
  };

  const handleDashboardClick = () => {
    setCurrentTab(HOME);
    if (pathname !== HOME) {
      router.push({
        pathname: HOME,
      });
    }
  };

  const handleActivityClick = () => {
    setCurrentTab(ACTIVITY);
    router.push({
      pathname: HOME,
    });
  };
  return (
    <>
      <FlexBox sx={{ minHeight: "100vh" }}>
        <MainAppBar userData={data} />

        <Container maxWidth="xl" className="custom-container">
          <TabBar
            userData={data}
            onApplyClick={() => {}}
            currentTab={currentTab}
            onDashboardClick={handleDashboardClick}
            onTransactionClick={handleTransactionsClick}
            onActivityClick={handleActivityClick}
          />
          <Security />
        </Container>
        <FooterMain />
      </FlexBox>
    </>
  );
};
export default SecurityPage;
