import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import NextLink from "next/link";
// material
import {
  Card,
  Stack,
  Box,
  Tab,
  Tabs,
  Avatar,
  TextField,
  Container,
  Typography,
  Grid,
  Breadcrumbs,
} from "@mui/material";
// components
import Page from "@components/Page";
import Label from "@components/Label";
import Scrollbar from "@components/Scrollbar";
import Iconify from "@components/Iconify";
import SearchNotFound from "@components/SearchNotFound";
import {
  UserChangePassword,
  UserProfileEducation,
  UserProfileEmergencyContact,
  UserProfilePreviousEmployment,
  UserProfileGeneral,
  UserProfileBankDetails,
} from "@sections/dashboard/user";
// ----------------------------------------------------------------------
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page title="User | E&amps;D 360">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Stack
            direction="column"
            alignItems="start"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Users
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink color="inherit" href="/dashboard">
                Dashboard
              </NextLink>
              <Typography color="text.primary">Profile</Typography>
            </Breadcrumbs>
          </Stack>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="basic tabs example"
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Personal" {...a11yProps(1)} />
            <Tab label="Emergency Contact" {...a11yProps(2)} />
            <Tab label="Bank Details" {...a11yProps(3)} />
            <Tab label="Education" {...a11yProps(4)} />
            <Tab label="Previous Employement" {...a11yProps(5)} />
            <Tab label="Change Password" {...a11yProps(10)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserProfileGeneral />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Personal Info
        </TabPanel>

        <TabPanel value={value} index={3}>
          <UserProfileBankDetails />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <UserProfileEducation />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <UserProfilePreviousEmployment />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <UserChangePassword />
        </TabPanel>
        <Card></Card>
      </Container>
    </Page>
  );
}
