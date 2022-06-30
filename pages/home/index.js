import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../components/dashboard/Dashboard";
import { getLayout } from "@/components/layout/DashboardLayout";

const HomeScreen = () => {
  const userData = useSelector(({ dashboard }) => dashboard.data);

  return <Dashboard userData={userData} />;
};

HomeScreen.getLayout = getLayout;

export default HomeScreen;
