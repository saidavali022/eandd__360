import { filter } from "lodash";
import { sentenceCase } from "change-case";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { differenceInMinutes } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import UserDashboardLayout from "@layouts/userdashboard";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "@utils/defaultImports";
import {
  fDate,
  fTime,
  fToNow,
  fformatRelative,
  fTimeDistanceInMinutes,
  fdifferenceInMinutes,
  fDistanceInHrsAndMinutes,
  fMinutesToWords,
  fSubMinutes,
  fAddHours,
} from "@utils/formatTime";
import NextLink from "next/link";
import { getSession, useSession } from "next-auth/react";
import { IBreak } from "@utils/interfaces/common";
// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
// components
import Page from "@components/Page";
import Label from "@components/Label";
import { colorStatusPriority, renderBreakPills } from "@utils/pillColor";

let total_work_hours;

const user = {
  shift: {
    duration: 9,
    units: "hour",
  },
};

function getSum(total: number, num: number) {
  return total + Math.floor(num);
}

function getTotalBreakTime(b: IBreak[]) {
  let breaks_minutes = b.map((b: IBreak) =>
    fdifferenceInMinutes(b.break_start, b.break_end)
  );
  const total_break_time = breaks_minutes.reduce(getSum, 0);
  return Math.abs(total_break_time);
}

const columns: GridColDef[] = [
  // {
  //   field: "id",
  //   hide: true,
  //   hideable: false,
  // },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    width: 100,
    hideable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.log_in && new Date(params.row.log_in),
    // valueGetter: (params: GridValueGetterParams) => {
    //   return fDate(params.row.log_in);
    // },
  },
  // {
  //   field: "shift_time",
  //   headerName: "Shift",
  //   valueGetter: (params: GridValueGetterParams) => {
  //     return "02:00 PM";
  //   },
  // },
  {
    field: "log_in",
    headerName: "Log In",
    width: 90,
    valueGetter: (params: GridValueGetterParams) => {
      return fTime(params.row.log_in);
    },
  },
  {
    field: "breaks",
    headerName: "Breaks",
    minWidth: 150,
    type: "string",
    flex: 1,
    renderCell: (params: GridRenderCellParams) =>
      renderBreakPills(params.row?.breaks),
  },
  {
    field: "log_out",
    headerName: "Log Out",
    width: 90,
    valueGetter: (params: GridValueGetterParams) => {
      return fTime(params.row.log_out);
    },
  },
  {
    field: "over_time",
    headerName: "Over Time",
    minWidth: 50,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      let designation = "LG";
      const employee_shift_hours = 9;
      let shift_end = fAddHours(params.row.log_in, employee_shift_hours);

      if (params.row.log_out == null) {
        return "-";
      }

      let over_time_minutes = Math.abs(
        fdifferenceInMinutes(shift_end, params.row.log_out)
      );

      if (designation === "SD" && over_time_minutes > 30) {
        return fMinutesToWords(over_time_minutes);
      } else if (["LG", "CS"].includes(designation) && over_time_minutes > 60) {
        return fMinutesToWords(over_time_minutes);
      } else {
        return "-";
      }
    },
  },
  {
    field: "total_break",
    headerName: "Total Break",
    minWidth: 130,
    valueGetter: (params: GridValueGetterParams) => {
      return fMinutesToWords(getTotalBreakTime(params.row.breaks));
    },
  },
  {
    field: "total_available_time",
    headerName: "Total Available Time",
    minWidth: 150,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      return fDistanceInHrsAndMinutes(params.row.log_out, params.row.log_in);
    },
  },
  {
    field: "total_work_hours",
    headerName: "Total Work Hours",
    minWidth: 150,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      return fDistanceInHrsAndMinutes(
        fSubMinutes(params.row.log_out, getTotalBreakTime(params.row.breaks)),
        params.row.log_in
      );
    },
  },
];

const defaultRows = [
  {
    id: "e69d9e5d-1aca-55ab-918f-faf1991b0090",
    log_in: "2022-04-12T02:30:45.738Z",
    log_out: "2022-04-12T12:50:45.738Z",
    employee_id: "END1111",
    breaks: [
      {
        break_start: "2022-04-12T02:30:00.000Z",
        break_end: "2022-04-12T02:45:45.738Z",
      },
      {
        break_start: "2022-04-12T05:00:00.000Z",
        break_end: "2022-04-12T05:45:45.738Z",
      },
    ],
  },
  {
    id: "e69d9e5d-1aca-55ab-918f-faf1991b0091",
    log_in: "2022-04-13T02:30:45.738Z",
    log_out: "2022-04-13T12:50:45.738Z",
    employee_id: "END1111",
    breaks: [
      {
        break_start: "2022-04-13T02:30:00.000Z",
        break_end: "2022-04-13T02:45:45.738Z",
      },
      {
        break_start: "2022-04-13T05:00:00.000Z",
        break_end: "2022-04-13T05:50:45.738Z",
      },
    ],
  },
];

export default function Attendance() {
  const globalState = useSelector((state) => state.globalState);
  const [calDate, setCalDate] = useState<Date | null>(new Date());
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/attendance/${globalState.Employee_id}`, {
        params: {
          date: calDate,
        },
      })
      .then((res: any) => {
        console.info("api response -", res);
        setRows(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [calDate]);

  const handleCalDateChange = (newValue: Date | null) => {
    setCalDate(newValue);
  };
  return (
    <Page title="Attendance | E & D 360">
      <Container maxWidth="false">
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="space-between"
          mb={5}
        >
          {" "}
          <Stack
            direction="column"
            alignItems="start"
            justifyContent="space-between"
          >
            <Typography variant="h4" gutterBottom>
              Attendance
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink href="/dashboard">Dashboard</NextLink>
              <Typography color="text.primary">Attendance</Typography>
            </Breadcrumbs>
          </Stack>
          <Stack
            direction="column"
            alignItems="end"
            justifyContent="space-between"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["month", "year"]}
                label="Year and Month"
                maxDate={new Date()}
                value={calDate}
                onChange={handleCalDateChange}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>

        <Card
          sx={{
            height: 350,
            width: 1,
          }}
        >
          <DataGrid
            // getRowId={(row) => row.internalId}
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            hideFooter={true}
            disableColumnMenu
          />
        </Card>
      </Container>
    </Page>
  );
}
Attendance.getLayout = (page: ReactElement) => (
  <UserDashboardLayout>{page}</UserDashboardLayout>
);
