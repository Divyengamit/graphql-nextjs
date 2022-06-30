import Myprofile from "@/components/profile/Myprofile";
import { getLayout } from "@/components/layout/DashboardLayout";

const MyProfile = () => {
  return <Myprofile />;
};

MyProfile.getLayout = getLayout;

export default MyProfile;
