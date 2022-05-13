import { useState } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { useRouter } from "next/router";
import ListSubheader from "@mui/material/ListSubheader";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, List, Collapse } from "@mui/material";
import Iconify from "./Iconify";

// NavItem.propTypes = {
//   item: PropTypes.object,
//   active: PropTypes.func,
// };
interface IItem {
  title: string;
  path: string;
  icon: string;
  info: string;
  children: [IItem];
}
// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

function NavItem({ item, active }: { item: IItem; active: Function }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const [openn, setOpenn] = useState(true);

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: { title: string; path: string }) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <NextLink href={path} key={title} passHref>
                  <ListItemStyle
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                </NextLink>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ListItemStyle
        sx={{
          ...(isActiveRoot && activeRootStyle),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText disableTypography primary={title} />
        {info && info}
      </ListItemStyle>
    </NextLink>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }: any) {
  const { pathname } = useRouter();

  const [openMenu, setopenMenu] = useState(false);
  const [openSubMenu, setopenSubMenu] = useState(false);

  const [selectedIndex, setselectedIndex] = useState(0);

  const handleClick = () => {
    setopenMenu(!openMenu);
  };

  const openSubMenuClick = (index) => {
    setselectedIndex(index);
  };

  const match = (path: string) => pathname == path;

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item: any) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
      <ListItemButton
        selected={openMenu}
        onClick={() => {
          handleClick();
        }}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Letter Generation" />
        {openMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NextLink href="/user/letter_generation/applyleave?type=leave">
            <ListItemButton
              selected={1 === selectedIndex}
              onClick={() => {
                openSubMenuClick(1);
              }}
              sx={{ pl: 4 }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Leaves" />
            </ListItemButton>
          </NextLink>
          <NextLink href="/user/letter_generation/applyleave?type=latelogin">
            <ListItemButton
              selected={2 === selectedIndex}
              onClick={() => openSubMenuClick(2)}
              sx={{ pl: 4 }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Late Login" />
            </ListItemButton>
          </NextLink>
          <NextLink href="/user/letter_generation/applyleave?type=earlylogout">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Early Logout" />
            </ListItemButton>
          </NextLink>

          <NextLink href="/user/letter_generation/comadvsug?type=complaints">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Complaints" />
            </ListItemButton>
          </NextLink>

          <NextLink href="/user/letter_generation/comadvsug?type=advices_suggestions">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Advices/Suggestions" />
            </ListItemButton>
          </NextLink>
        </List>
      </Collapse>
    </Box>
  );
}
