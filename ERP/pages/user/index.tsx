// material
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// components
import Page from "@components/Page";
import NextHead from "next/head";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "@sections/dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [availabilityStatus, setAvailabilityStatus] = useState();
  const handleAvailabilityChange = (event: SelectChangeEvent) => {
    setAvailabilityStatus(event.target.value);
  };
  console.log("session- ", session);
  const loading = status === "loading";
  // const [content, setContent] = useState();
  useEffect(() => {
    if (!session) {
      // signOut({ redirect: false, callbackUrl: "http://localhost:3000/" });
      // router.push("/");
    }
    //   const fetchData = async () => {
    //     const res = await fetch("/api/examples/protected");
    //     const json = await res.json();
    //     if (json.content) {
    //       setContent(json.content);
    //     }
    //   };
    //   fetchData();
  }, [loading]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;
  // If no session exists, display access denied message

  return (
    <>
      <NextHead>
        <title>Dashboard</title>
      </NextHead>
      <Box>
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            {" "}
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="availability-status">Status</InputLabel>
              <Select
                labelId="availability-status"
                id="availability-status-select"
                value={availabilityStatus}
                label="Status"
                onChange={handleAvailabilityChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Available</MenuItem>
                <MenuItem value={2}>Break</MenuItem>
                <MenuItem value={3}>Salah</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppTasks />
            </Grid>
          </Grid> */}
        </Container>
      </Box>
    </>
  );
}
