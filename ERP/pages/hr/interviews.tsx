import { useState, useEffect, useMemo, useReducer } from "react";
import type { ReactElement } from "react";
import UserDashboardLayout from "@layouts/userdashboard";
import NextLink from "next/link";
import axios, { toast, ToastContainer_box } from "@utils/defaultImports";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Autocomplete,
  Button,
  Breadcrumbs,
  DialogContent,
  Box,
  TextField,
  MenuItem,
  Drawer,
} from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
  TabContext,
  TabList,
  TabPanel,
} from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fDateTimeSuffix } from "@utils/formatTime";
// components
import Page from "@components/Page";
import { fDate } from "@utils/formatTime";
import styles from "@styles/Users.module.css";
import clsx from "clsx";
import {
  GridColumns,
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
  GridValueSetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Label from "@components/Label";
import { colorStatusPriority } from "@utils/pillColor";

//----------------------
const interviewAppointmentInitialState = {
  id: null,
  title: "",
  name: "",
  phone: "",
  location: "",
  email: "",
  status: "",
  interview_status: "",
  response: "",
  description: "",
  start: new Date(),
  end: new Date(),
  kind: "kind#interview",
};

const columns: GridColDef[] = [
  {
    field: "id",
    hide: true,
    hideable: false,
  },
  { field: "title", headerName: "Title", width: 250 },
  { field: "description", headerName: "Comment", width: 200 },
  {
    field: "start",
    headerName: "Start Date",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.start && fDateTimeSuffix(new Date(params.row.start)),
  },
  {
    field: "end",
    headerName: "End Date",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.end && fDateTimeSuffix(new Date(params.row.end)),
  },
  { field: "status", headerName: "Status" },
  { field: "interview_status", headerName: "Interview Status" },
  { field: "name", headerName: "Name" },
  { field: "phone", headerName: "Phone" },
  { field: "location", headerName: "Location" },
  { field: "response", headerName: "Comment" },
  // {
  //   field: "action",
  //   headerName: "Action",
  //   type: "actions",
  //   width: 220,
  // renderCell: renderAction,
  // },
];

export default function Interviews() {
  const [rowData, setRowData] = useState([]);
  const [formData, setFormData] = useState();
  const [updateCounter, setUpdateCounter] = useState(0);
  const [anchor, setanchor] = useState(false);
  const [selectId, setselectId] = useState(0);
  const [interviewAppointmentInput, setInterviewAppointmentInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    interviewAppointmentInitialState
  );

  const handleResetEvents = () => {
    setInterviewAppointmentInput(interviewAppointmentInitialState);
  };

  const handleEventDelete = (event: any) => {
    event.preventDefault();
    let data = { ...interviewAppointmentInput };

    if (data.id == null) {
      return;
    }

    axios
      .delete(`/users/events/${"END1111"}/${data.id}`)
      .then((res: any) => {
        setanchor(false);
        toast.success("Successful", { theme: "colored" });
        setUpdateCounter(updateCounter + 1);
      })
      .catch((error: any) => {
        console.error("Appointment Delete ", error);
        toast.error("Internal Server Error", { theme: "colored" });
      });
  };

  const handleInterviewAppointmentInput = (event: any) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setInterviewAppointmentInput({ [name]: newValue });
  };

  const handleInterviewAppointmentCreate = (event: any) => {
    event.preventDefault();
    let data = { ...interviewAppointmentInput };
    if (interviewAppointmentInput.id == null) {
      axios
        .post(`users/events/interview/${"END1111"}`, data)
        .then((res: any) => {
          setanchor(false);
          toast.success("Successful", {
            theme: "colored",
          });
          setUpdateCounter(updateCounter + 1);
        })
        .catch((error: any) => {
          toast.error("Something Went Wrong", {
            theme: "colored",
          });
        });
    }

    if (interviewAppointmentInput.id != null) {
      axios
        .put(
          `/users/events/interview/${"END1111"}/${
            interviewAppointmentInput.id
          }`,
          data
        )
        .then((res: any) => {
          // setanchor(false);
          toast.success("Successful", {
            theme: "colored",
          });
          setUpdateCounter(updateCounter + 1);
        })
        .catch((error: any) => {
          toast.error("Something Went Wrong", {
            theme: "colored",
          });
        });
    }
  };

  const getUserInterviews = () => {
    axios
      .get(`/users/events/interview/${"END1111"}`)
      .then(function (response: any) {
        if (response.status === 200) {
          // console.info("res - ", response);
          setRowData(response.data);
        }
      })
      .catch(function (error: any) {});
  };

  useEffect(() => {
    getUserInterviews();
  }, [updateCounter]);

  // useMemo(() => {
  //   const editDate = rowData.filter(
  //     (rowData: any) => rowData.id == editId || 0
  //   );
  //   if (editDate[0]) setFormData(editDate[0]);
  // }, [editId]);

  // function renderAction(params: GridRenderCellParams) {
  //   if (params.row.status === "completed") {
  //     return (
  //       <Stack direction="row" spacing={2}>
  //         <Button
  //           variant="contained"
  //           color="secondary"
  //           id={params.id}
  //           onClick={() => {
  //             setanchor(true);
  //             setEditId(params.id);
  //           }}
  //         >
  //           View
  //         </Button>

  //         <Button
  //           variant="contained"
  //           color="secondary"
  //           id={params.id}
  //           disabled={true}
  //         >
  //           Completed
  //         </Button>
  //       </Stack>
  //     );
  //   }
  //   return (
  //     <Stack direction="row" spacing={2}>
  //       <Button
  //         variant="contained"
  //         color="secondary"
  //         id={params.id}
  //         onClick={() => {
  //           setanchor(true);
  //           setEditId(params.id);
  //         }}
  //       >
  //         View
  //       </Button>
  //       <Button
  //         variant="contained"
  //         color="secondary"
  //         id={params.id}
  //         onClick={() => {
  //           updateData(event);
  //         }}
  //       >
  //         Complete
  //       </Button>
  //     </Stack>
  //   );
  // }

  return (
    <Page title="Interviews | E & D 360">
      <Container>
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
              Interview
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink href="/hr">Dashboard</NextLink>
              <Typography color="text.primary">Interview</Typography>
            </Breadcrumbs>
          </Stack>
          <Stack
            direction="column"
            alignItems="end"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              onClick={() => {
                handleResetEvents();
                setanchor(true);
              }}
            >
              New Interview
            </Button>
          </Stack>
        </Stack>
        <Card
          sx={{
            height: 650,
            width: 1,
          }}
        >
          <DataGrid
            rows={rowData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Card>
        <Drawer anchor="right" open={anchor} onClose={() => setanchor(false)}>
          <Box sx={{ width: 450 }}>
            <Container>
              <form
                onSubmit={handleInterviewAppointmentCreate}
                autoComplete="off"
              >
                <TextField
                  autoFocus
                  margin="normal"
                  name="title"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.title}
                  required
                />
                <TextField
                  autoFocus
                  margin="normal"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.description}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  name="response"
                  label="Comments"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.response}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.name}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  name="phone"
                  label="Phone"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.phone}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  name="email"
                  label="Email"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.email}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  name="location"
                  label="Location"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.location}
                />
                <Autocomplete
                  disablePortal
                  onInputChange={(event, newInputValue) => {
                    setInterviewAppointmentInput({ status: newInputValue });
                  }}
                  value={interviewAppointmentInput.status}
                  options={["Confirmed", "Not Confirmed", "Declined", "Absent"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status"
                      margin="normal"
                      name="status"
                      fullWidth
                    />
                  )}
                />
                <TextField
                  autoFocus
                  margin="normal"
                  name="interview_status"
                  label="interview Status"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={handleInterviewAppointmentInput}
                  value={interviewAppointmentInput.interview_status}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    label="Start Time"
                    name="start"
                    minDate={new Date()}
                    value={interviewAppointmentInput.start}
                    onChange={(newValue: Date | null) => {
                      setInterviewAppointmentInput({ start: newValue });
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        helperText={null}
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                  <MobileDateTimePicker
                    label="End Time"
                    minDate={new Date()}
                    name="end"
                    value={interviewAppointmentInput.end}
                    onChange={(newValue: Date | null) => {
                      setInterviewAppointmentInput({ end: newValue });
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        helperText={null}
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>

                {interviewAppointmentInput.id !== null && (
                  <Button onClick={handleEventDelete}>Delete</Button>
                )}
                <Button
                  onClick={() => {
                    setanchor(false);
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </form>
            </Container>
          </Box>
        </Drawer>
      </Container>
    </Page>
  );
}

Interviews.getLayout = (page: ReactElement) => (
  <UserDashboardLayout>{page}</UserDashboardLayout>
);
