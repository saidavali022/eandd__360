import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import NextLink from "next/link";
import DashboardLayout from "@layouts/dashboard";
// require("dotenv").config();
// material
import { Stack, Button, Container, Typography } from "@mui/material";
// components
import Page from "@components/Page";
import Iconify from "@components/Iconify";
import axios from "../defaultImports/defaultImports";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 200 },
  { field: "firstname", headerName: "First name", minWidth: 200 },
  { field: "lastname", headerName: "Last name", minWidth: 200 },
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
    field: "zipcode",
    minWidth: 200,
    headerName: "ZIpCode",
  },
  {
    field: "sudoName",
    minWidth: 200,
    headerName: "Sudo Name",
  },
  {
    field: "Blood_Group",
    minWidth: 200,
    headerName: "Blood Group",
  },
  {
    field: "Marital_Status",
    minWidth: 200,
    headerName: "Marital Status",
  },
  {
    field: "Department",
    minWidth: 200,
    headerName: "Department",
  },
  {
    field: "Designation",
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
      url: "/user/",
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
          <Typography variant="h4" gutterBottom>
            Users {process.env.DB_HOST}
          </Typography>
          <NextLink href="./users/create">
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          </NextLink>
        </Stack>
      </Container>

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </Page>
  );
}
User.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
