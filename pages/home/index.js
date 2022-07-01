import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../components/dashboard/Dashboard";
import { getLayout } from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";

const HomeScreen = () => {
  const userData = useSelector(({ dashboard }) => dashboard.data);
  const role = useSelector(({ auth }) => auth?.role);

  return (
    <>
      {role.toLowerCase() === "superadmin" && (
        <AdminDashboard userData={userData} />
      )}
      {role.toLowerCase() === "customer" && <Dashboard userData={userData} />}
    </>
  );
};

HomeScreen.getLayout = getLayout;

export default HomeScreen;
