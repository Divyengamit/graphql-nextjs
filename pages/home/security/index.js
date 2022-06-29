import { getLayout } from "@/components/layout/DashboardLayout";
import Security from "@/components/security/Security";

const SecurityPage = () => {
  return <Security />;
};

SecurityPage.getLayout = getLayout;

export default SecurityPage;
