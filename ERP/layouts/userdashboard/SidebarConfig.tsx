// component
import Iconify from "@components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} sx={{ width: 22, height: 22 }} />
);

const sidebarConfig = [
  {
    title: "Dashboard",
    path: "/user",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "User",
    path: "/user/users",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Tasks",
    path: "/user/tasks",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Attendance",
    path: "/user/attendance",
    icon: getIcon("eva:list-outline"),
  },
  {
    title: "Calendar",
    path: "/user/calendar",
    icon: getIcon("eva:calendar-outline"),
  },
  {
    title: "Exit Management",
    path: "/user/exit",
    icon: getIcon("eva:file-text-fill"),
  },

  {
    title: "Status E-Management",
    path: "/user/exit/status",
    icon: getIcon("eva:file-text-fill"),
  },
];

export default sidebarConfig;
