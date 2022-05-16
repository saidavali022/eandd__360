import React from "react";
import UserDashboardLayout from "@layouts/userdashboard";
import type { ReactElement } from "react";
const latelogin = () => {
  return <div>hi</div>;
};

export default latelogin;
latelogin.getLayout = (page: ReactElement) => (
  <UserDashboardLayout>{page}</UserDashboardLayout>
);
