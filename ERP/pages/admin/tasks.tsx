import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import styles from "@styles/Users.module.css";
import Drawer from "@mui/material/Drawer";
import Iconify from "@components/Iconify";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "@layouts/dashboard";
import axios, { toast, ToastContainer_box } from "@utils/defaultImports";
import "react-toastify/dist/ReactToastify.css";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

// material
import {
  Stack,
  Button,
  Container,
  Typography,
  Breadcrumbs,
  Box,
  TextField,
  MenuItem,
  Menu,
} from "@mui/material";
// components
import Page from "@components/Page";
import { useMemo } from "react";
import NextLink from "next/link";
//-----------------------

export default function Task() {
  const [editId, setEditId] = useState();
  const [rowData, setRowData] = useState([]);
  const [anchor, setAnchor] = useState(false);
  const [InputDate, setInputDate] = useState("text");
  const [optionEmp, setOptionEmp] = useState("");
  const [priorityTeam, setPriorityTeam] = useState("");
  const [departments, setDepartments] = useState();
  const changeOptionEmp = (event: any) => {
    setOptionEmp(event.target.value);
  };

  const changePriorityTeam = (event: any) => {
    setPriorityTeam(event.target.value);
  };

  const [optionTeam, setOptionTeam] = useState("");
  const changeOptionTeam = (event: any) => {
    setOptionTeam(event.target.value);
  };
  const [formData, setFormData] = useState({});

  const getFormData = (event: any) => {
    // setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name == "file") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const submitFormData = (event: any) => {
    event.preventDefault();
    const formBindData = new FormData();
    formBindData.append("title", formData.title);
    formBindData.append("description", formData.description);
    formBindData.append("file", formData.file);
    formBindData.append("attachment", formData.attachment);
    formBindData.append("team", formData.team);
    formBindData.append("priority", formData.priority);
    formBindData.append("employee_id", formData.employee_id);
    formBindData.append("start_date", formData.start_date);
    formBindData.append("end_date", formData.end_date);
    const id = formData.id || 0;
    axios({
      method: "post",
      url: `${"/tasks/" + id}`,
      data: formBindData,
    })
      .then(function (response: any) {
        event.target.reset();
        if (response.status === 200) {
          getTasklist();
          toast.success("success", {
            theme: "colored",
          });
        }
      })
      .catch(function (error: any) {
        toast.error("error");
      });
  };

  const getTasklist = () => {
    axios({
      method: "get",
      url: "/tasks/",
    })
      .then(function (response: any) {
        if (response.status === 200) {
          setRowData(response.data);
        }
      })
      .catch(function (error: any) {});
  };

  useEffect(() => {
    getTasklist();
  }, []);

  const deleteTask = (event: Event) => {
    axios({
      method: "delete",
      url: `${"/tasks/" + event.target.id}`,
    }).then(function (response: any) {
      if (response.status === 200) {
        getTasklist();
        toast.success("success", {
          theme: "colored",
        });
      }
    });
  };
  useMemo(() => {
    const editDate = rowData.filter(
      (rowData: any) => rowData.id == editId || 0
    );
    if (editDate[0]) setFormData(editDate[0]);
  }, [editId]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "team", headerName: "Team", width: 100, editable: true },
    { field: "employee_id", headerName: "Employee id", width: 200 },
    { field: "priority", headerName: "priority", width: 100 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
    { field: "start_date", headerName: "Start Date", width: 250 },
    { field: "end_date", headerName: "End Date", width: 250 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 220,
      renderCell: renderAction,
    },
  ];

  // console.log(store.getState());

  // const todo = useSelector((state) => state.changeNumber);
  // const dispatch = useDispatch();

  function renderAction(params: GridRenderCellParams) {
    return (
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:edit-outline" />}
          id={params.id}
          onClick={() => {
            setAnchor(true);
            setEditId(params.id);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          id={params.id}
          onClick={deleteTask}
          startIcon={<Iconify icon="eva:trash-outline" />}
        >
          Delete
        </Button>
      </Stack>
    );
  }

  return (
    <Page title="Tasks | E & D 360">
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
              Tasks
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink color="inherit" href="/admin">
                Dashboard
              </NextLink>
              <Typography color="text.primary">Tasks</Typography>
            </Breadcrumbs>
          </Stack>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              setAnchor(true);
              setFormData();
              setEditId(null);
            }}
          >
            Add Task
          </Button>
        </Stack>

        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rowData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>

        <Drawer anchor="right" open={anchor} onClose={() => setAnchor(false)}>
          <Box sx={{ width: 450 }}>
            <Container>
              <form onSubmit={submitFormData}>
                <Typography variant="h4" sx={{ mt: 4 }}>
                  Add Task
                </Typography>

                <TextField name="id" type="hidden" value={formData?.id} />
                <TextField
                  name="attachment"
                  type="hidden"
                  value={formData?.attachment}
                />

                <TextField
                  required
                  label="Title"
                  name="title"
                  className={styles.taskInputField}
                  onChange={getFormData}
                  value={formData?.title}
                />
                <TextField
                  required
                  label="Priority"
                  name="priority"
                  className={styles.taskInputField}
                  value={formData?.priority}
                  select
                  onChange={(event) => {
                    getFormData(event);
                    changePriorityTeam(event);
                  }}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
                <TextField
                  required
                  label="Description"
                  name="description"
                  className={styles.taskInputField}
                  multiline
                  rows={3}
                  value={formData?.description}
                  onChange={getFormData}
                />
                <TextField
                  type="file"
                  className={styles.taskInputField}
                  onChange={getFormData}
                  name="file"
                />
                <TextField
                  required
                  label="Select Team"
                  name="team"
                  className={styles.taskInputField}
                  select
                  onChange={(event) => {
                    getFormOata(event);
                    changeOptionTeam(event);
                    O;
                  }}
                  value={formData?.team}
                >
                  <MenuItem value="SD">SD</MenuItem>
                  <MenuItem value="LG">LG</MenuItem>
                </TextField>

                <TextField
                  required
                  label="Select Employee"
                  name="employee_id"
                  className={styles.taskInputField}
                  select
                  value={formData?.employee_id}
                  onChange={(event) => {
                    getFormData(event);
                    changeOptionEmp(event);
                  }}
                >
                  <MenuItem value="123">shaik</MenuItem>
                  <MenuItem value="1234">saif</MenuItem>
                </TextField>
                <TextField
                  required
                  label="Start Date"
                  name="start_date"
                  type={InputDate}
                  onChange={getFormData}
                  className={styles.taskInputField}
                  onClick={(e) => {
                    setInputDate("date");
                  }}
                  onBlur={() => {
                    setInputDate("text");
                  }}
                  value={formData?.start_date}
                />

                <TextField
                  required
                  label="End Date"
                  name="end_date"
                  type={InputDate}
                  onChange={getFormData}
                  className={styles.taskInputField}
                  onFocus={(e) => {
                    setInputDate("date");
                  }}
                  onBlur={() => {
                    setInputDate("text");
                  }}
                  value={formData?.end_date}
                />

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={3}
                >
                  <Button type="submit" variant="contained">
                    Add Task
                  </Button>
                  <Button type="reset" variant="contained" color="secondary">
                    Reset
                  </Button>
                </Stack>
              </form>
            </Container>
          </Box>
        </Drawer>
        {ToastContainer_box}
      </Container>
    </Page>
  );
}
Task.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
