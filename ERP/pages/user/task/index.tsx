import { useState, useEffect, useMemo } from "react";
import UserDashboardLayout from "@layouts/userdashboard";
import NextLink from "next/link";
import axios, {
  toast,
  ToastContainer_box,
} from "../../defaultImports/defaultImports";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
// components
import Page from "@components/Page";
import { fDate } from "@utils/formatTime";
import styles from "../../../styles/Users.module.css";
import Drawer from "@mui/material/Drawer";

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
export default function Tasks() {
  const [rowData, setrowData] = useState([]);
  const [formData, setformData] = useState();
  const [editId, setEditId] = useState();
  const [anchor, setanchor] = useState(false);
  const globalState = useSelector((state) => state.globalState);
  const [selectId, setselectId] = useState(0);
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "start_date", headerName: "Start Date", width: 250 },
    { field: "end_date", headerName: "End Date", width: 250 },
    { field: "createdAt", headerName: "createdAt", width: 250 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      width: 220,
      renderCell: renderAction,
    },
  ];

  const getTaskList = () => {
    axios({
      method: "get",
      url: `${"/tasks/" + globalState.Employee_id + "/"}`,
    })
      .then(function (response: any) {
        if (response.status === 200) {
          setrowData(response.data.data);
        }
      })
      .catch(function (error: any) {});
  };

  useEffect(() => {
    getTaskList();
  }, []);

  useMemo(() => {
    const editDate = rowData.filter(
      (rowData: any) => rowData.id == editId || 0
    );
    if (editDate[0]) setformData(editDate[0]);
  }, [editId]);

  const updateData = async (event) => {
    await axios({
      method: "put",
      url: `${"/tasks/status/" + event.target.id}`,
      data: {
        status: "completed",
      },
    })
      .then((response: any) => {
        if (response.status == 200) {
          toast.success("success", {
            theme: "colored",
          });
          getTaskList();
        }
      })
      .catch(function (error: any) {});
  };

  function renderAction(params: GridRenderCellParams) {
    if (params.row.status === "completed") {
      return (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            id={params.id}
            onClick={() => {
              setanchor(true);
              setEditId(params.id);
            }}
          >
            View
          </Button>

          <Button
            variant="contained"
            color="secondary"
            id={params.id}
            disabled={true}
          >
            Completed
          </Button>
        </Stack>
      );
    }
    return (
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="secondary"
          id={params.id}
          onClick={() => {
            setanchor(true);
            setEditId(params.id);
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="secondary"
          id={params.id}
          onClick={() => {
            updateData(event);
          }}
        >
          Complete
        </Button>
      </Stack>
    );
  }

  //   const [page, setPage] = useState(0);
  //   const [order, setOrder] = useState("asc");
  //   const [selected, setSelected] = useState([]);
  //   const [orderBy, setOrderBy] = useState("date");
  //   const [filterName, setFilterName] = useState("");
  //   const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <Page title="Tasks | E & D 360">
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
          <NextLink href="/dashboard">Dashboard</NextLink>
          <Typography color="text.primary">Tasks</Typography>
        </Breadcrumbs>
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
          checkboxSelection
        />
      </Card>
      <Drawer anchor="right" open={anchor} onClose={() => setanchor(false)}>
        <Box sx={{ width: 450 }}>
          <Container>
            <form>
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
                value={formData?.title}
              />
              <TextField
                required
                label="Description"
                name="description"
                className={styles.taskInputField}
                multiline
                rows={3}
                value={formData?.description}
              />

              <NextLink href={formData?.attachment}>
                <a
                  target="_blank"
                  style={{ color: "green", fontWeight: "bold", padding: "5px" }}
                >
                  View Attachment
                </a>
              </NextLink>

              <TextField
                required
                label="Select Team"
                name="team"
                className={styles.taskInputField}
                value={formData?.team}
              />

              <TextField
                required
                label="Priority"
                name="priority"
                className={styles.taskInputField}
                value={formData?.priority}
              />

              <TextField
                required
                label="Select Employee"
                name="employee_id"
                className={styles.taskInputField}
                value={formData?.employee_id}
              />
              <TextField
                required
                label="Start Date"
                name="start_date"
                className={styles.taskInputField}
                value={formData?.start_date}
              />

              <TextField
                required
                label="End Date"
                name="end_date"
                className={styles.taskInputField}
                value={formData?.end_date}
              />
            </form>
          </Container>
        </Box>
      </Drawer>
      {ToastContainer_box}
    </Page>
  );
}

Tasks.getLayout = (page) => <UserDashboardLayout>{page}</UserDashboardLayout>;
