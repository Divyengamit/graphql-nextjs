import { getLayout } from "@/components/layout/DashboardLayout";
import ActivityComponent from "@/components/activity/Activity";

const Activity = () => {
  return <ActivityComponent />;
};

Activity.getLayout = getLayout;

export default Activity;
