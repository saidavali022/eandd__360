// component
import Iconify from "@components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} sx={{ width: 22, height: 22 }} />
);

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/user",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/user/users",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "task",
    path: "/user/task",
    icon: getIcon("eva:people-fill"),
  },
  // {
  //   title: "Attendance",
  //   path: "/dashboard/attendance",
  //   icon: getIcon("eva:people-fill"),
  // },
];

export default sidebarConfig;
