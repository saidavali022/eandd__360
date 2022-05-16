// component
import Iconify from "@components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} sx={{ width: 22, height: 22 }} />
);

const sidebarConfig = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "User",
    path: "/admin/users",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Task",
    path: "/admin/tasks",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Attendance",
    path: "/admin/attendance",
    icon: getIcon("eva:list-outline"),
  },
  {
    title: "Calendar",
    path: "/admin/calendar",
    icon: getIcon("eva:calendar-outline"),
  },
  {
    title: "Exit Management",
    path: "/admin/exits",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Login",
    path: "/login",
    icon: getIcon("eva:lock-fill"),
  },
  {
    title: "Register",
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
