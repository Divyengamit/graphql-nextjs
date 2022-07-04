import React from "react";
import Users from "@/components/admin/Users";
import { getLayout } from "@/components/layout/DashboardLayout";

const AdminUsers = () => {
  return <Users />;
};

AdminUsers.getLayout = getLayout;

export default AdminUsers;
