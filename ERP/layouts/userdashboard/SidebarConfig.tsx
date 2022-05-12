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

  {
    title: "Exist Management",
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
