import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import NextLink from "next/link";
import DashboardLayout from "@layouts/dashboard";
// require("dotenv").config();
// material
import {
  Stack,
  Button,
  Container,
  Typography,
  Breadcrumbs,
} from "@mui/material";
// components
import Page from "@components/Page";
import Iconify from "@components/Iconify";
import axios from "@utils/defaultImports";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 200 },
  { field: "first_name", headerName: "First name", minWidth: 200 },
  { field: "last_name", headerName: "Last name", minWidth: 200 },
  {
    field: "email",
    headerName: "Email",
    minWidth: 300,
  },
  {
    field: "phone",
    minWidth: 200,
    headerName: "Phone",
  },
  {
    field: "dob",
    minWidth: 200,
    headerName: "DOB",
  },
  {
    field: "gender",
    minWidth: 200,
    headerName: "Gender",
  },
  {
    field: "country",
    minWidth: 200,
    headerName: "Country",
  },
  {
    field: "city",
    minWidth: 200,
    headerName: "City",
  },
  {
    field: "zip_code",
    minWidth: 200,
    headerName: "Zip Code",
  },
  {
    field: "sudo_name",
    minWidth: 200,
    headerName: "sudo Name",
  },
  {
    field: "blood_group",
    minWidth: 200,
    headerName: "Blood Group",
  },
  {
    field: "marital_status",
    minWidth: 200,
    headerName: "Marital Status",
  },
  {
    field: "department",
    minWidth: 200,
    headerName: "Department",
  },
  {
    field: "designation",
    minWidth: 200,
    headerName: "Designation",
  },
  {
    field: "doj",
    minWidth: 200,
    headerName: "DOJ",
  },
  {
    field: "employee_id",
    minWidth: 200,
    headerName: "Employee Id",
  },
  {
    field: "password",
    minWidth: 200,
    headerName: "Password",
  },
];

export default function User() {
  const [rows, setrows] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/users/",
    }).then(function (response: any) {
      if (response.status === 200) {
        console.log(response.data);
        setrows(response.data);
      }
    });
  }, []);

  return (
    <Page title="User | E&D 360">
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
              <NextLink color="inherit" href="/admin">
                Dashboard
              </NextLink>
              <Typography color="text.primary">Users</Typography>
            </Breadcrumbs>
          </Stack>
          <NextLink href="./users/create">
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          </NextLink>
        </Stack>

        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
      </Container>
    </Page>
  );
}
User.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
