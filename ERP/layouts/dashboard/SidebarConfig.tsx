// component
import Iconify from "@components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} sx={{ width: 22, height: 22 }} />
);

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/admin",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/admin/users",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "task",
    path: "/admin/tasks",
    icon: getIcon("eva:people-fill"),
  },
  // {
  //   title: "Attendance",
  //   path: "/dashboard/attendance",
  //   icon: getIcon("eva:people-fill"),
  // },
  {
    title: "Exist Management",
    path: "/admin/exits",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "login",
    path: "/login",
    icon: getIcon("eva:lock-fill"),
  },
  {
    title: "register",
    path: "/register",
    icon: getIcon("eva:person-add-fill"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];

export default sidebarConfig;
